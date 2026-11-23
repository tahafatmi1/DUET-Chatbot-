import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { GraduationCap, Menu, X, MessageCircle } from 'lucide-react';
import { askAssistant } from '../ask.js';

const links = [
  ['Programs', '#programs'],
  ['How to apply', '#process'],
  ['Campus', '#campus'],
  ['CPN estimator', '#cpn'],
  ['FAQ', '#faq'],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = scrolled || open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid ? 'border-b border-line bg-surface/90 text-ink backdrop-blur-xl' : 'text-white'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-[#0e1b3d]">Skip to content</a>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3" aria-label="Main">
        <a href="#top" className="flex items-center gap-2.5 font-display text-lg font-bold">
          <span className="grid size-9 place-items-center rounded-xl bg-brand text-[#0e1b3d]"><GraduationCap size={20} /></span>
          DUET Admissions
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${solid ? 'hover:bg-surface-2' : 'hover:bg-white/15'}`}>{label}</a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => askAssistant()} className="hidden items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-[#0e1b3d] transition hover:brightness-105 sm:inline-flex">
            <MessageCircle size={16} /> Ask AI
          </button>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'}
            className={`grid size-10 place-items-center rounded-full lg:hidden ${solid ? 'hover:bg-surface-2' : 'hover:bg-white/15'}`}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden lg:hidden">
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 pb-5">
              {links.map(([label, href]) => (
                <li key={href}><a href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium hover:bg-surface-2">{label}</a></li>
              ))}
              <li><button type="button" onClick={() => { setOpen(false); askAssistant(); }} className="mt-2 w-full rounded-xl bg-brand px-4 py-3 font-semibold text-[#0e1b3d]">Ask the AI assistant</button></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand" />
    </header>
  );
}
