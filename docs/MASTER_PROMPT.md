# Master Prompt: DUET University Admission Chatbot

Copy everything below into Claude Code (or any coding assistant) to rebuild or extend this project.

---

**Role:** You are a senior full-stack engineer and UI designer.

**Goal:** Build a web-based AI chatbot for the domain **University Admission** for **Dawood University of Engineering and Technology (DUET), Karachi**. It must answer questions about admission criteria, academic programs, application procedure, deadlines and fee structures (course CLO-3: develop a web application using modern technologies).

**Users:** Pakistani high-school and intermediate students and their parents. They write English or Roman Urdu, mostly on phones.

**Tech stack**
- Frontend: React + Vite + Tailwind CSS v4, `motion` (Framer Motion successor) for animation, `lucide-react` icons. Use 21st.dev-style polished components (glass cards, animated hero, scroll-reveal sections).
- Backend: Node.js + Express. Endpoints: `GET /api/health`, `GET /api/config`, `POST /api/chat`.
- AI: retrieval over a JSON knowledge base (`server/knowledge.json`), then Claude API (`claude-haiku-5-5`) with the retrieved context in the system prompt. If `ANTHROPIC_API_KEY` is missing or the API fails, fall back to a rule-based keyword answer so the demo never breaks.

**Features**
1. Hero section with animated stat cards and call-to-action.
2. Chat window: welcome message, quick-question chips, typing indicator, auto-scroll, restart button, keyboard and screen-reader friendly (`role="log"`, labels).
3. Popular programs grid, 5-step admission timeline, indicative merit-aggregate calculator (label it as indicative).
4. Footer disclaimer: student demo, not an official university service; verify on admissions.duet.edu.pk.

**Behaviour rules for the bot**
- Answer only admission topics; politely refuse everything else.
- Never invent dates, fees or merit numbers; send the student to the official portal when unsure.
- Never ask for or accept passwords, OTPs, card details or CNIC images.
- Short, friendly answers with steps or bullets; reply in the student's language.

**Quality bar**
- Mobile-first, responsive, WCAG AA contrast, respects `prefers-reduced-motion`.
- Input validation: max message length, last 10 messages only, 50 KB body limit.
- Unit tests for retrieval and safety rules (`node --test`).
- README with run steps, `.env.example`, no secrets committed.

**Deliverables:** working project, tests passing, production build, README, and a project report using the university template (Abstract, Introduction, Literature Review, Methodology, Implementation and Testing, Conclusion, References).

**Process:** plan first, build the backend and tests, then the UI, run it in a browser, fix issues, then write the report.
