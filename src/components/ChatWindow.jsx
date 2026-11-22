import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, Send, User, RotateCcw } from 'lucide-react';

const WELCOME = { role: 'assistant', content: "Assalam-o-Alaikum! I am the DUET Admission Assistant. Ask me about programs, eligibility, how to apply, fees or scholarships." };

function Typing() {
  return (
    <div className="flex gap-1 px-1 py-2" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="size-2 rounded-full bg-gold-400" animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
      ))}
    </div>
  );
}

export default function ChatWindow() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quick, setQuick] = useState([]);
  const logRef = useRef(null);

  useEffect(() => {
    fetch('/api/config').then((r) => r.json()).then((c) => setQuick(c.quickQuestions)).catch(() => {});
  }, []);
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text) {
    const content = text.trim();
    if (!content || loading) return;
    const next = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m !== WELCOME) }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'I cannot reach the server right now. Please try again in a moment.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="chat" className="mx-auto max-w-3xl px-5 py-10">
      <div className="glass overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/10 bg-navy-800/60 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-gold-400 text-navy-950"><Bot size={20} /></span>
            <div>
              <div className="font-semibold">DUET Admission Assistant</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-400" /> Online</div>
            </div>
          </div>
          <button onClick={() => setMessages([WELCOME])} className="rounded-full p-2 text-slate-300 hover:bg-white/10" aria-label="Restart chat">
            <RotateCcw size={18} />
          </button>
        </div>

        <div ref={logRef} className="h-[28rem] space-y-4 overflow-y-auto px-5 py-5" role="log" aria-live="polite">
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <span className={`grid size-8 shrink-0 place-items-center rounded-full ${m.role === 'user' ? 'bg-navy-700' : 'bg-gold-400 text-navy-950'}`}>
                  {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </span>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-line ${m.role === 'user' ? 'bg-gold-400 text-navy-950' : 'bg-white/10 text-slate-100'}`}>
                  {m.content}
                </div>
              </motion.div>
            ))}
            {loading && <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-11"><Typing /></motion.div>}
          </AnimatePresence>
        </div>

        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {quick.map((q) => (
              <button key={q} onClick={() => send(q)} className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-slate-200 hover:border-gold-400 hover:text-gold-400">{q}</button>
            ))}
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-white/10 p-4">
          <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder="Type your question..."
            className="flex-1 rounded-full border border-white/10 bg-navy-900 px-5 py-3 outline-none focus:border-gold-400" aria-label="Your question" />
          <button type="submit" disabled={loading || !input.trim()} aria-label="Send"
            className="grid size-12 place-items-center rounded-full bg-gold-400 text-navy-950 transition hover:bg-gold-500 disabled:opacity-40">
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
