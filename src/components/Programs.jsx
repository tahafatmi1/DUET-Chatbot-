import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Building2, Zap, Cpu, Cog, FlaskConical, Fuel, Code2, Layers, Leaf, Radio, ShieldCheck, Brain, Database, MessageCircle } from 'lucide-react';
import { askAssistant } from '../ask.js';

const MIN = { BE: '60%', 'B.Arch': '50%', BS: '50%' };

const programs = [
  [FlaskConical, 'Chemical Engineering', 'BE'],
  [Cpu, 'Computer Systems Engineering', 'BE'],
  [Zap, 'Electronic Engineering', 'BE'],
  [Fuel, 'Petroleum & Gas Engineering', 'BE'],
  [Cog, 'Industrial Engineering & Management', 'BE'],
  [Layers, 'Metallurgy & Materials Engineering', 'BE'],
  [Leaf, 'Energy & Environment Engineering', 'BE'],
  [Radio, 'Telecommunication Engineering', 'BE'],
  [Building2, 'Architecture & Planning', 'B.Arch'],
  [Code2, 'Computer Science', 'BS'],
  [Brain, 'Artificial Intelligence', 'BS'],
  [ShieldCheck, 'Cyber Security', 'BS'],
  [Database, 'Data Science', 'BS'],
];
const tabs = ['All', 'BE', 'B.Arch', 'BS'];

export default function Programs() {
  const [tab, setTab] = useState('All');
  const shown = programs.filter(([, , deg]) => tab === 'All' || deg === tab);

  return (
    <section id="programs" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <p className="text-sm font-semibold tracking-widest text-brand">PROGRAMS</p>
      <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Find your degree</h2>
      <p className="mt-3 max-w-2xl text-muted">
        Programs reported for DUET, with the minimum 2nd-year Intermediate marks. The list open in your session can differ, so confirm on the admissions portal.
      </p>

      <div role="tablist" aria-label="Filter by degree" className="mt-8 inline-flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1">
        {tabs.map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
            className={`relative rounded-full px-5 py-2 text-sm font-semibold transition ${tab === t ? 'text-[#0e1b3d]' : 'text-muted hover:text-ink'}`}>
            {tab === t && <motion.span layoutId="tab-pill" className="absolute inset-0 -z-0 rounded-full bg-brand" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map(([Icon, name, deg]) => (
            <motion.li key={name} layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.25 }}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-5 transition hover:-translate-y-1 hover:border-brand hover:shadow-lg">
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand"><Icon size={22} /></span>
                <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-muted">{deg}</span>
              </div>
              <h3 className="mt-4 font-semibold leading-snug">{name}</h3>
              <p className="mt-1 text-sm text-muted">2nd-year Intermediate: at least {MIN[deg]}</p>
              <button type="button" onClick={() => askAssistant(`What are the minimum marks required for ${name}?`)}
                className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand hover:underline">
                <MessageCircle size={14} /> Ask about this
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
