import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { knowledge, retrieve, ruleBasedReply, quickReply, confidentKnowledgeReply, buildSystemPrompt } from './engine.js';

const app = express();
const PORT = process.env.PORT || 3001;
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5';

app.use(cors());
app.use(express.json({ limit: '50kb' }));

const XAI_MODEL = process.env.XAI_MODEL || 'grok-3-mini';

/** Which optional LLM is configured: 'grok' (xAI), 'claude', or null. */
function llmProvider() {
  if (process.env.XAI_API_KEY) return 'grok';
  if (process.env.ANTHROPIC_API_KEY) return 'claude';
  return null;
}

async function askGrok(messages, contextEntries) {
  const res = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.XAI_API_KEY}` },
    body: JSON.stringify({
      model: XAI_MODEL,
      max_tokens: 500,
      messages: [{ role: 'system', content: buildSystemPrompt(contextEntries) }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`xAI API ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim();
}

function askLlm(messages, contextEntries) {
  return llmProvider() === 'grok' ? askGrok(messages, contextEntries) : askClaude(messages, contextEntries);
}

async function askClaude(messages, contextEntries) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
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

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (existsSync(dist)) {
  app.use(express.static(dist));
  app.use((_req, res) => res.sendFile(join(dist, 'index.html')));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(PORT, () => console.log(`DUET chatbot API on http://localhost:${PORT}`));
}

export default app;
