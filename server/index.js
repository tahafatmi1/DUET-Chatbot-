import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { knowledge, retrieve, ruleBasedReply, quickReply, confidentKnowledgeReply, buildSystemPrompt } from './engine.js';

const app = express();
const PORT = process.env.PORT || 3001;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5';

// Render sits behind a proxy; trust one hop so rate limiting sees the real client IP.
app.set('trust proxy', 1);
app.use(helmet());
// No CORS: the page and the API share one origin, so other websites cannot call the API from a browser.
app.use(express.json({ limit: '50kb' }));
app.use(
  '/api/chat',
  rateLimit({
    windowMs: 60_000,
    limit: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many messages. Please wait a minute and try again.' },
  }),
);

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite';
const GROQ_MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';
const XAI_MODEL = process.env.XAI_MODEL || 'grok-3-mini';

/** Which optional LLM is configured, in priority order, or null. */
function llmProvider() {
  if (process.env.GEMINI_API_KEY) return 'gemini';
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.XAI_API_KEY) return 'grok';
  if (process.env.ANTHROPIC_API_KEY) return 'claude';
  return null;
}

async function askGemini(messages, contextEntries) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`, {
    method: 'POST',
    signal: AbortSignal.timeout(20_000),
    headers: { 'content-type': 'application/json', 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: buildSystemPrompt(contextEntries) }] },
      contents: messages.map((m) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      generationConfig: { maxOutputTokens: 500 },
    }),
  });
  if (!res.ok) throw new Error(`Gemini API ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim();
}

/** Groq and xAI both expose an OpenAI-compatible chat-completions endpoint. */
async function askOpenAiCompatible({ url, key, model, label }, messages, contextEntries) {
  const res = await fetch(url, {
    method: 'POST',
    signal: AbortSignal.timeout(20_000),
    headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
    body: JSON.stringify({
      model,
      max_tokens: 500,
      messages: [{ role: 'system', content: buildSystemPrompt(contextEntries) }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`${label} API ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim();
}

function askLlm(messages, contextEntries) {
  switch (llmProvider()) {
    case 'gemini':
      return askGemini(messages, contextEntries);
    case 'groq':
      return askOpenAiCompatible({ url: 'https://api.groq.com/openai/v1/chat/completions', key: process.env.GROQ_API_KEY, model: GROQ_MODEL, label: 'Groq' }, messages, contextEntries);
    case 'grok':
      return askOpenAiCompatible({ url: 'https://api.x.ai/v1/chat/completions', key: process.env.XAI_API_KEY, model: XAI_MODEL, label: 'xAI' }, messages, contextEntries);
    default:
      return askClaude(messages, contextEntries);
  }
}

async function askClaude(messages, contextEntries) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    signal: AbortSignal.timeout(20_000),
    headers: {
      'content-type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      system: buildSystemPrompt(contextEntries),
      messages,
    }),
  });
  if (!res.ok) throw new Error(`Anthropic API ${res.status}`);
  const data = await res.json();
  return data.content?.map((b) => b.text).join('').trim();
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, mode: llmProvider() ? `knowledge-base + ${llmProvider()}` : 'knowledge-base' });
});

app.get('/api/config', (_req, res) => {
  res.json({ university: knowledge.university, quickQuestions: knowledge.quickQuestions });
});

app.post('/api/chat', async (req, res) => {
  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];
  const messages = incoming
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
  const last = messages.filter((m) => m.role === 'user').at(-1);
  if (!last) return res.status(400).json({ error: 'A user message is required.' });

  // Priority 1: our own answers. Priority 2: an LLM, only for questions we do not know.
  let reply = quickReply(last.content) || confidentKnowledgeReply(last.content);
  let source = 'knowledge-base';
  if (!reply && llmProvider()) {
    try {
      reply = await askLlm(messages, retrieve(last.content, 3));
      source = llmProvider();
    } catch (err) {
      console.error('LLM failed, using fallback:', err.message);
    }
  }
  if (!reply) reply = ruleBasedReply(last.content);
  res.json({ reply, source });
});

app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.use((_req, res) => res.sendFile(join(dist, 'index.html')));
}

// Always answer errors (for example malformed JSON) as JSON, never as an HTML page.
app.use((err, _req, res, _next) => {
  const status = err.status && err.status < 500 ? err.status : 500;
  res.status(status).json({ error: status === 413 ? 'Message too large.' : status < 500 ? 'Bad request.' : 'Server error.' });
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => console.log(`DUET chatbot API on http://localhost:${PORT}`));
}

export default app;
