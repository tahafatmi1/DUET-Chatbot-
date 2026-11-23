import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bot, Send, User, RotateCcw, Sparkles, BookOpen } from 'lucide-react';

const WELCOME = {
  role: 'assistant',
  source: 'welcome',
  content: "Assalam-o-Alaikum! I am the DUET Admission Assistant. Ask me about programs, minimum marks, CPN, how to apply, fees or scholarships, in English or Roman Urdu.",
};

function Typing() {
  return (
    <div className="flex gap-1 px-1 py-2" role="status" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="size-2 rounded-full bg-brand" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
      ))}
    </div>
  );
}

function SourceTag({ source }) {
  if (source === 'welcome' || !source) return null;
  const ai = source !== 'knowledge-base';
  return (
    <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-muted">
      {ai ? <Sparkles size={11} /> : <BookOpen size={11} />}
      {ai ? 'AI answer (verify on the portal)' : 'From the DUET knowledge base'}
    </span>
  );
}

export default function ChatWindow() {
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quick, setQuick] = useState([]);
  const logRef = useRef(null);
  const messagesRef = useRef(messages);
  const loadingRef = useRef(false);
  messagesRef.current = messages;

  useEffect(() => {
    fetch('/api/config').then((r) => r.json()).then((c) => setQuick(c.quickQuestions)).catch(() => {});
  }, []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = useCallback(async (text) => {
    const content = String(text ?? '').trim();
    if (!content || loadingRef.current) return;
    const next = [...messagesRef.current, { role: 'user', content }];
    setMessages(next);
    setInput('');
    loadingRef.current = true;
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.filter((m) => m.source !== 'welcome').map(({ role, content: c }) => ({ role, content: c })) }),
      });
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.reply || data.error || 'Sorry, something went wrong.', source: data.source }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'I cannot reach the server right now. Please try again in a moment.', source: 'error' }]);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const onAsk = (e) => { if (e.detail) send(e.detail); };
    window.addEventListener('duet:ask', onAsk);
    return () => window.removeEventListener('duet:ask', onAsk);
  }, [send]);

  return (
    <div id="chat" className="flex h-[34rem] max-h-[80vh] min-w-0 flex-col overflow-hidden rounded-3xl border border-line bg-surface text-ink shadow-2xl shadow-black/30">
      <div className="flex items-center justify-between border-b border-line bg-surface-2 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-brand text-[#0e1b3d]"><Bot size={20} /></span>
          <div>
            <div className="font-semibold leading-tight">DUET Admission Assistant</div>
            <div className="flex items-center gap-1.5 text-xs text-ok"><span className="size-1.5 rounded-full bg-ok" /> Online · English &amp; Roman Urdu</div>
          </div>
        </div>
        <button type="button" onClick={() => setMessages([WELCOME])} className="rounded-full p-2 text-muted hover:bg-line/60" aria-label="Restart chat">
          <RotateCcw size={18} />
        </button>
      </div>

      <div ref={logRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" role="log" aria-live="polite" aria-label="Conversation">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <span className={`grid size-8 shrink-0 place-items-center rounded-full ${m.role === 'user' ? 'bg-ink text-canvas' : 'bg-brand text-[#0e1b3d]'}`}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </span>
              <div className={`flex max-w-[82%] flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-line ${m.role === 'user' ? 'rounded-tr-md bg-brand text-[#0e1b3d]' : 'rounded-tl-md bg-surface-2'}`}>
                  {m.content}
                </div>
                {m.role === 'assistant' && <SourceTag source={m.source} />}
              </div>
            </motion.div>
          ))}
          {loading && <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-11"><Typing /></motion.div>}
        </AnimatePresence>
      </div>

      {messages.length <= 1 && (
        <div className="flex gap-2 overflow-x-auto px-5 pb-3 [scrollbar-width:none]">
          {quick.map((q) => (
            <button key={q} type="button" onClick={() => send(q)} className="shrink-0 rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm hover:border-brand hover:text-brand">{q}</button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line p-4">
        <input value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder="Type your question..." aria-label="Your question"
          className="min-w-0 flex-1 rounded-full border border-line bg-canvas px-5 py-3 outline-none placeholder:text-muted focus:border-brand" />
        <button type="submit" disabled={loading || !input.trim()} aria-label="Send"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-[#0e1b3d] transition hover:brightness-105 disabled:opacity-40">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
