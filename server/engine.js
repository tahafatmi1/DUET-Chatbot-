import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
export const knowledge = JSON.parse(readFileSync(join(here, 'knowledge.json'), 'utf8'));

const STOP = new Set(['the', 'a', 'an', 'is', 'are', 'of', 'to', 'in', 'for', 'and', 'or', 'me', 'my', 'i', 'do', 'does', 'what', 'about', 'tell', 'can', 'you', 'it', 'at', 'on', 'hai', 'ka', 'ki', 'ke', 'mein', 'se', 'kya']);

export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter((t) => t && !STOP.has(t));
}

/** Score every knowledge entry against a query and return the ranked list. */
export function retrieve(query, limit = 3) {
  const tokens = tokenize(query);
  const lower = query.toLowerCase();
  const scored = knowledge.entries.map((entry) => {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (keyword.includes(' ') ? lower.includes(keyword) : tokens.includes(keyword)) {
        score += keyword.length > 4 ? 2 : 1;
      }
    }
    return { entry, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}

const GREETING = /^(hi|hello|hey|salam|assalam|aoa|good (morning|evening)|helo)\b/i;
const THANKS = /\b(thanks|thank you|shukriya|jazak)/i;
const SENSITIVE = /\b(password|pin|otp|card number|account number|cvv)\b/i;

export const FALLBACK =
  "I could not find that in my admission knowledge base. I can help with programs, eligibility, how to apply, documents, deadlines, fees, scholarships and contacts. For anything else please contact the admissions office via admissions.duet.edu.pk.";

/** Rule-based answer used when no LLM key is configured or the API fails. */
export function ruleBasedReply(message) {
  if (SENSITIVE.test(message)) {
    return 'Please never share passwords, PINs, OTPs or card details with anyone, including me. The admissions office will never ask for them in chat.';
  }
  if (THANKS.test(message)) return 'You are welcome! Ask me anything else about DUET admissions.';
  if (GREETING.test(message.trim()) && tokenize(message).length <= 2) {
    return "Assalam-o-Alaikum! I am the DUET Admission Assistant. Ask me about programs, eligibility, how to apply, fees, deadlines or scholarships.";
  }
  const hits = retrieve(message, 2);
  if (!hits.length) return FALLBACK;
  return hits.map((h) => h.answer).join('\n\n');
}

export function buildSystemPrompt(contextEntries) {
  const context = contextEntries.length
    ? contextEntries.map((e) => `## ${e.title}\n${e.answer}`).join('\n\n')
    : knowledge.entries.map((e) => `## ${e.title}\n${e.answer}`).join('\n\n');
  return `You are the Admission Assistant for ${knowledge.university}.
Answer only questions about university admission: programs, eligibility, application steps, documents, deadlines, fees, scholarships, facilities and contacts.
Rules:
- Use ONLY the knowledge below. If the answer is not there, say you are not sure and point to ${knowledge.portal}.
- Never invent dates, fee amounts or merit numbers. Tell the student to verify them on the official portal.
- Never ask for or accept passwords, CNIC photos, OTPs or payment details.
- Reply in the language the student writes in (English or Roman Urdu). Be short, friendly and use simple steps or bullets.

KNOWLEDGE:
${context}`;
}
