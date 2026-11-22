"""Generates the project documentation (.docx) following the university template."""
import os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Pt, Inches

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "DUET_Admission_Chatbot_Project_Documentation.docx")
FLOW = os.path.join(HERE, "flowchart.png")


def draw_flowchart():
    steps = [
        "Student opens web page",
        "Types a question or\ntaps a quick chip",
        "React UI sends POST /api/chat",
        "Express validates input\n(length, last 10 messages)",
        "Safety check\n(password / OTP / card?)",
        "Retrieve top matches from\nknowledge base (keywords)",
        "No match: LLM key set?",
        "Claude answers using\nretrieved context",
        "Rule-based answer\nfrom knowledge base",
        "Reply shown in chat window",
    ]
    fig, ax = plt.subplots(figsize=(6, 9))
    ax.set_xlim(0, 10); ax.set_ylim(0, 24); ax.axis("off")
    ys = [20.5, 18.4, 16.3, 14.2, 12.1, 10.0, 7.9, 5.6, 5.6, 1.6]
    for i, (s, y) in enumerate(zip(steps, ys)):
        x, w = 2.4, 5.2
        if i == 7: x, w = 0.4, 4.0
        if i == 8: x, w = 5.6, 4.0
        color = "#fdf0c9" if i == 6 else "#dfe8fb"
        ax.add_patch(FancyBboxPatch((x, y), w, 1.5, boxstyle="round,pad=0.05", fc=color, ec="#12214a", lw=1.3))
        ax.text(x + w / 2, y + 0.75, s, ha="center", va="center", fontsize=8.5)
    def arrow(x1, y1, x2, y2, label=None):
        ax.annotate("", xy=(x2, y2), xytext=(x1, y1), arrowprops=dict(arrowstyle="->", color="#12214a"))
        if label:
            ax.text((x1 + x2) / 2 + 0.2, (y1 + y2) / 2, label, fontsize=8, color="#12214a")
    for a, b in [(0, 1), (1, 2), (2, 3), (3, 4), (4, 5), (5, 6)]:
        arrow(5, ys[a], 5, ys[b] + 1.55)
    arrow(4, 7.9, 2.4, 7.15, "Yes")
    arrow(6, 7.9, 7.6, 7.15, "No / API error")
    arrow(2.4, 5.6, 4.5, 3.15)
    arrow(7.6, 5.6, 5.5, 3.15)
    ax.text(5, 23.2, "System flowchart", ha="center", fontsize=11, fontweight="bold")
    fig.savefig(FLOW, dpi=200, bbox_inches="tight")


def add_field(paragraph, instr):
    run = paragraph.add_run()
    for kind, text in (("begin", None), (None, instr), ("separate", None), (None, "Right-click and choose Update Field to build the table of contents."), ("end", None)):
        if kind:
            el = OxmlElement("w:fldChar"); el.set(qn("w:fldCharType"), kind)
        elif text == instr:
            el = OxmlElement("w:instrText"); el.set(qn("xml:space"), "preserve"); el.text = instr
        else:
            el = OxmlElement("w:t"); el.text = text
        run._r.append(el)


def footer(section):
    p = section.footer.paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.add_run("AI Web-Based Chatbot Project Documentation  |  Page ")
    add_field(p, "PAGE")


doc = Document()
st = doc.styles["Normal"]; st.font.name = "Calibri"; st.font.size = Pt(11)
for lvl, size in ((1, 16), (2, 13)):
    h = doc.styles[f"Heading {lvl}"]; h.font.name = "Calibri"; h.font.size = Pt(size)
footer(doc.sections[0])


def para(text, bold=False, align=None, size=None):
    p = doc.add_paragraph(); r = p.add_run(text); r.bold = bold
    if size: r.font.size = Pt(size)
    if align: p.alignment = align
    return p


def bullets(items):
    for t in items:
        doc.add_paragraph(t, style="List Bullet")


def table(rows, header, widths=None):
    t = doc.add_table(rows=1, cols=len(header)); t.style = "Light Grid Accent 1"
    for i, h in enumerate(header):
        t.rows[0].cells[i].text = h
    for r in rows:
        cells = t.add_row().cells
        for i, v in enumerate(r):
            cells[i].text = v
    doc.add_paragraph()


# ---- Cover page ----
para("AI WEB-BASED CHATBOT", True, WD_ALIGN_PARAGRAPH.CENTER, 24)
para("PROJECT DOCUMENTATION", True, WD_ALIGN_PARAGRAPH.CENTER, 20)
doc.add_paragraph()
for label, value in [
    ("Project Title", "DUET Admission Assistant: An AI Web-Based Chatbot for Dawood University of Engineering and Technology"),
    ("Selected Domain", "University Admission"),
]:
    p = doc.add_paragraph(); p.add_run(f"{label}: ").bold = True; p.add_run(value)
doc.add_paragraph()
para("Submitted By:", True)
for label, value in [("Student Name(s)", "1. Syed Taha Fatmi   2. Kaifullah Khan"),
                     ("Roll Number(s)", "1. 23-CS-116   2. 23-CS-117"),
                     ("Class / Section", "23F CS (Batch 23F)")]:
    p = doc.add_paragraph(); p.add_run(f"{label}: ").bold = True; p.add_run(value)
doc.add_paragraph()
for label, value in [("Course Title", "Web Technologies"), ("Submitted To", "Miss Maryam"),
                     ("Department", "Computer Science"), ("Institution", "Dawood University of Engineering and Technology (DUET), Karachi"),
                     ("Submission Date", "23 November 2026")]:
    p = doc.add_paragraph(); p.add_run(f"{label}: ").bold = True; p.add_run(value)
doc.add_page_break()

# ---- TOC ----
para("TABLE OF CONTENTS", True, size=16)
add_field(doc.add_paragraph(), 'TOC \\o "1-2" \\h \\z \\u')
doc.add_page_break()

# ---- 1 Abstract ----
doc.add_heading("1. Abstract", 1)
para("Prospective students of Dawood University of Engineering and Technology (DUET), Karachi, repeatedly ask the same questions about programs, eligibility, application steps, deadlines and fees, and answers are spread across several web pages. This project presents DUET Admission Assistant, a web-based chatbot that answers these questions instantly in English or Roman Urdu. The system uses a React and Tailwind CSS front end with Motion animations, a Node.js and Express back end, a curated JSON knowledge base searched by a keyword-ranking retriever that answers first, and an optional large language model (Grok from xAI, or Claude) that is consulted only when the knowledge base has no confident answer. When no API key is configured or the API fails, the bot falls back to a polite message so the service stays available. Safety rules prevent the bot from inventing dates or fees and from accepting sensitive data. Automated tests and browser testing confirmed correct retrieval, safe handling of invalid input and a responsive interface. The project fulfils CLO-3: developing a web application using modern technologies.")

# ---- 2 Introduction ----
doc.add_heading("2. Introduction", 1)
doc.add_heading("Problem Statement", 2)
para("Admission information for DUET is published on multiple pages and in prospectus documents that change every session. Students, many of them first-generation applicants, struggle to find eligibility rules, document lists, fee details and deadlines quickly, and the admissions office receives many repetitive enquiries. There is a need for an always-available, easy-to-use assistant that gives accurate guidance and directs users to official sources for time-sensitive details.")
doc.add_heading("Project Objectives", 2)
bullets([
    "Design and develop a responsive web application with an embedded AI chatbot for university admission.",
    "Answer questions on programs, eligibility, application procedure, documents, deadlines, fees and scholarships.",
    "Support English and Roman Urdu queries.",
    "Integrate a large language model (Claude) with a retrieval step so answers are grounded in a curated knowledge base.",
    "Guarantee graceful degradation through a rule-based fallback when the AI service is unavailable.",
    "Protect users by refusing requests for sensitive data and by never fabricating dates or fee amounts.",
    "Test the system with automated unit tests and manual browser tests.",
])
doc.add_heading("Project Scope", 2)
para("In scope: a single-page web interface (hero, chat, programs, five-step process, merit estimator), a REST API, a knowledge base of twelve admission topics, optional LLM integration, unit tests and documentation. Out of scope: user accounts, live integration with the DUET admission database, online form submission, payments and voice input. The bot provides general guidance only; official notices on admissions.duet.edu.pk always take precedence.")

# ---- 3 Literature Review ----
doc.add_heading("3. Literature Review", 1)
doc.add_heading("Existing Chatbots", 2)
para("Universities worldwide have deployed admission chatbots. Georgia State University's Pounce chatbot reduced summer melt by answering enrolment questions by text message. Commercial platforms such as Ivy.ai and Mainstay offer similar services to institutions. General assistants such as ChatGPT can answer admission questions, but they are not tied to one university's current rules and may produce outdated or invented details. Most Pakistani university websites currently rely on static pages, PDF prospectuses and social-media inboxes, without an interactive assistant.")
para("Technically, early chatbots were rule or pattern based (ELIZA, AIML), later systems used intent classifiers (Rasa, Dialogflow), and current systems combine large language models with retrieval-augmented generation (RAG) to ground answers in trusted documents.")
doc.add_heading("Proposed Chatbot", 2)
para("The proposed DUET Admission Assistant combines the reliability of a curated knowledge base with the fluency of an LLM. It is domain-restricted, bilingual, mobile-friendly and open-source in design, runs without any paid service in fallback mode, and clearly tells users when to verify information on the official portal.")
table([
    ["Static website / PDF", "Official, detailed", "Hard to search, no interaction"],
    ["Generic AI assistant", "Fluent, flexible", "Not DUET-specific, may hallucinate"],
    ["Rule-based bot only", "Predictable, free", "Rigid wording, limited language"],
    ["Proposed RAG bot", "Grounded, fluent, safe fallback", "Knowledge must be kept current"],
], ["Approach", "Strengths", "Limitations"])

# ---- 4 Methodology ----
doc.add_heading("4. Methodology", 1)
doc.add_heading("Technologies Used", 2)
table([
    ["React 19 + Vite", "Component-based user interface and fast build"],
    ["Tailwind CSS v4", "Utility-first responsive styling and theme tokens"],
    ["Motion (motion/react)", "Entrance, hover and typing-indicator animations"],
    ["lucide-react", "Icon set"],
    ["Node.js + Express 5", "REST API and static hosting of the build"],
    ["xAI Grok API / Anthropic Claude (optional)", "Answers for questions outside the knowledge base"],
    ["JSON knowledge base", "Curated admission facts with keywords"],
    ["node:test", "Automated unit tests"],
], ["Technology", "Purpose"])
doc.add_heading("Chatbot Development Process", 2)
bullets([
    "Requirement analysis: reviewed the project brief (University Admission domain) and the official DUET admissions portal.",
    "Knowledge design: grouped information into twelve topics, each with keywords and a verified-style answer that avoids unverified numbers.",
    "Retrieval: tokenise the question, drop stop-words, score entries by keyword matches (longer keywords weigh more) and return the top matches.",
    "Priority: answer from our own knowledge base when the match is confident; otherwise, if a key is configured, send the retrieved entries and strict rules to Grok (or Claude) as the system prompt; use the fallback if the call fails.",
    "Safety: block requests containing passwords, OTPs or card details; never invent dates or fees.",
    "Interface design: mobile-first dark navy and gold theme, accessible chat log, quick-question chips, reduced-motion support.",
    "Testing and iteration: unit tests, API tests with curl and manual browser tests.",
])
doc.add_heading("System Flowchart", 2)
draw_flowchart()
doc.add_picture(FLOW, width=Inches(4.2))
doc.paragraphs[-1].alignment = WD_ALIGN_PARAGRAPH.CENTER
para("Figure 1: Request flow of the DUET Admission Assistant", align=WD_ALIGN_PARAGRAPH.CENTER)

# ---- 5 Implementation and Testing ----
doc.add_heading("5. Implementation and Testing", 1)
doc.add_heading("Chatbot Implementation", 2)
para("The project has two parts. The server folder holds engine.js (tokeniser, retriever, safety rules, prompt builder), knowledge.json (admission topics and quick questions) and index.js (Express routes). The src folder holds the React application with components Hero, ChatWindow, Programs, Process, Calculator and Footer. The chat component keeps the conversation in state, posts the last messages to /api/chat, shows an animated typing indicator while waiting and auto-scrolls to the newest reply. The production build is served by Express, so one command (npm start) runs the whole system.")
table([
    ["GET /api/health", "Reports service status and mode (claude or knowledge-base)"],
    ["GET /api/config", "Returns university name and quick-question chips"],
    ["POST /api/chat", "Accepts messages, returns reply and source"],
], ["Endpoint", "Description"])
doc.add_heading("AI Model/API Integration", 2)
para("Our own answers have priority. The server first handles greetings and safety rules, then answers from the knowledge base whenever the keyword match is confident (score of at least 2). Only when no confident match exists and an API key is configured does it call an external LLM: Grok through the xAI chat-completions endpoint (XAI_API_KEY, model set by XAI_MODEL) or, alternatively, Claude through the Anthropic Messages API. The prompt contains the university name, strict behavioural rules and the retrieved knowledge entries; only the last ten messages, each truncated to 1,000 characters, are sent. If the call fails or no key exists, the bot returns the best weak match or a polite fallback that points to the admissions office. Keys are read from environment variables and never reach the browser.")
doc.add_heading("Screenshots", 2)
for img, cap in (("shot-home.jpg", "Figure 2: Landing page with animated hero and statistics"), ("shot-chat.jpg", "Figure 3: Chat window answering 'How do I apply?'")):
    doc.add_picture(os.path.join(HERE, img), width=Inches(5.2))
    doc.paragraphs[-1].alignment = WD_ALIGN_PARAGRAPH.CENTER
    para(cap, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_heading("Testing and Results", 2)
para("Automated unit tests (npm test) and manual tests were executed. All seven automated tests passed.")
table([
    ["T1", "'How do I apply?'", "Application-steps entry", "Pass"],
    ["T2", "'fee kitni hai' (Roman Urdu)", "Fee-structure entry", "Pass"],
    ["T3", "'What is the eligibility criteria?'", "Eligibility entry", "Pass"],
    ["T4", "'Which programs are offered?'", "Programs entry", "Pass"],
    ["T5", "'hello'", "Greeting message", "Pass"],
    ["T6", "'who won the cricket match'", "Out-of-scope fallback", "Pass"],
    ["T7", "'my otp is 1234'", "Refusal to handle sensitive data", "Pass"],
    ["T8", "POST /api/chat with empty messages", "HTTP 400 error", "Pass"],
    ["T9", "Browser: tap quick chip", "Typing indicator then answer displayed", "Pass"],
    ["T10", "Production build (vite build)", "Builds without errors", "Pass"],
], ["ID", "Input / action", "Expected result", "Status"])
para("Limitation observed: the keyword retriever depends on the keywords in the knowledge base, so unusual phrasing can reach the fallback message. LLM answers with a live API key were not benchmarked in this report.")

# ---- 6 Conclusion ----
doc.add_heading("6. Conclusion and Future Work", 1)
para("The DUET Admission Assistant meets its objectives: it provides instant, bilingual, domain-restricted answers through a modern, responsive web interface, integrates an LLM with a retrieval step, and stays functional offline through a rule-based fallback. It demonstrates the CLO-3 outcome of developing a web application with modern technologies.")
para("Future work:", True)
bullets([
    "Load official fee tables, deadlines and merit lists from the university and keep them updated each session.",
    "Replace keyword retrieval with embedding-based semantic search.",
    "Add Urdu script support and voice input.",
    "Persist chat history and add an admin dashboard showing frequent questions.",
    "Integrate with the admission portal for application-status lookup and publish on the official DUET website and WhatsApp.",
    "Add rate limiting and logging before public deployment.",
])

# ---- 7 References ----
doc.add_heading("7. Reference", 1)
bullets([
    "Dawood University of Engineering and Technology, Admissions Portal. https://admissions.duet.edu.pk",
    "Dawood University of Engineering and Technology. https://www.duet.edu.pk",
    "Anthropic, Messages API documentation. https://docs.anthropic.com",
    "React documentation. https://react.dev",
    "Motion for React documentation. https://motion.dev",
    "Tailwind CSS documentation. https://tailwindcss.com",
    "Express documentation. https://expressjs.com",
    "Lewis, P. et al. (2020). Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks. NeurIPS.",
    "Page, L. C. & Gehlbach, H. (2017). How an Artificially Intelligent Virtual Assistant Helps Students Navigate the Road to College. AERA Open.",
])

doc.save(OUT)
print("saved", OUT)
