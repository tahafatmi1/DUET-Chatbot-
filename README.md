# DUET Admission Assistant

AI web chatbot for university admission at Dawood University of Engineering and Technology (Karachi).

## Run

```bash
npm install
npm run build
npm start
```

Open http://localhost:3001. For development with hot reload use `npm run dev` (UI on http://localhost:5173).

## Answer priority and optional AI (default Gemini model: gemini-3.5-flash-lite; if you set GEMINI_MODEL, use a current model name)

1. Greetings and safety rules.
2. Our own knowledge base (`server/knowledge.json`) whenever it has a confident match.
3. Only if the knowledge base does not know the answer: an optional LLM: Gemini (`GEMINI_API_KEY`), Groq (`GROQ_API_KEY`), Grok (`XAI_API_KEY`) or Claude (`ANTHROPIC_API_KEY`), first key found in that order.
4. Otherwise a polite fallback pointing to the admissions office.

Copy `.env.example` to `.env` to add a key. With no key the bot works fully from the knowledge base.

## Test

```bash
npm test
```

## Update the knowledge

Edit `server/knowledge.json`. Fee amounts, dates and merit figures are intentionally generic: replace them with the current prospectus values.

## Docs

`docs/MASTER_PROMPT.md` is the build prompt. The project report is `docs/DUET_Admission_Chatbot_Project_Documentation.docx`.
