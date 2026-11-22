import { motion } from 'motion/react';
import { GraduationCap, Sparkles, ArrowDown } from 'lucide-react';

const stats = [['1962', 'Founded'], ['60% / 50%', 'Min. 2nd-year Inter: BE / BS'], ['10·30·60', 'CPN weights (Matric·Inter·Test)'], ['24/7', 'Admission help']];

export default function Hero() {
  return (
    <header className="mx-auto max-w-6xl px-5 pt-8 pb-16 md:pt-12">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="grid size-9 place-items-center rounded-xl bg-gold-400 text-navy-950"><GraduationCap size={20} /></span>
          DUET Admissions
        </div>
        <a href="#chat" className="rounded-full border border-white/15 px-4 py-2 text-sm hover:bg-white/10">Ask the assistant</a>
      </nav>

      <div className="mt-16 grid items-center gap-10 md:mt-24 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-gold-400">
            <Sparkles size={14} /> AI-powered admission assistant
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-5 font-display text-4xl leading-tight font-bold md:text-6xl">
            Your path to <span className="text-gold-400">Dawood University</span>, answered instantly.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="mt-5 max-w-xl text-lg text-slate-300">
            Programs, eligibility, deadlines, fees and scholarships. Ask in English or Roman Urdu and get clear steps in seconds.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mt-8 flex gap-3">
            <a href="#chat" className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-6 py-3 font-semibold text-navy-950 transition hover:bg-gold-500">
              Start chatting <ArrowDown size={16} />
            </a>
            <a href="#process" className="rounded-full border border-white/15 px-6 py-3 hover:bg-white/10">How to apply</a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4">
          {stats.map(([n, l], i) => (
            <motion.div key={l} whileHover={{ y: -4 }} animate={{ y: [0, -6, 0] }}
              transition={{ y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' } }}
              className="glass rounded-2xl p-5">
              <div className="font-display text-3xl font-bold text-gold-400">{n}</div>
              <div className="mt-1 text-sm text-slate-300">{l}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
