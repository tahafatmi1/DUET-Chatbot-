# DUET Admission Assistant

AI web chatbot for university admission at Dawood University of Engineering and Technology (Karachi).

## Run

```bash
npm install
npm run build
npm start
```

Open http://localhost:3001. For development with hot reload use `npm run dev` (UI on http://localhost:5173).

## Enable Claude (optional)

Copy `.env.example` to `.env` and set `ANTHROPIC_API_KEY`. Without it the bot answers from `server/knowledge.json`.

## Test

```bash
npm test
```

## Update the knowledge

Edit `server/knowledge.json`. Fee amounts, dates and merit figures are intentionally generic: replace them with the current prospectus values.

## Docs

`docs/MASTER_PROMPT.md` is the build prompt. The project report is `docs/DUET_Admission_Chatbot_Project_Documentation.docx`.
