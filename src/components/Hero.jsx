import { motion } from 'motion/react';
import { ArrowDown, BadgeCheck, MapPin, Sparkles } from 'lucide-react';
import ChatWindow from './ChatWindow.jsx';
import { heroPhoto } from '../campusPhotos.js';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-[#0a1226] text-white">
      <motion.img
        src={heroPhoto.src}
        alt={heroPhoto.alt}
        fetchPriority="high"
        initial={{ scale: 1.14 }}
        animate={{ scale: 1 }}
        transition={{ duration: 14, ease: 'easeOut' }}
        className="absolute inset-0 -z-20 size-full object-cover"
        style={{ objectPosition: heroPhoto.position }}
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a1226]/92 via-[#0a1226]/65 to-[#0a1226]/10" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#0a1226]/80 to-transparent" />

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-5 pb-28 pt-28 lg:grid-cols-[1fr_460px] lg:pb-32 lg:pt-32">
        <motion.div variants={container} initial="hidden" animate="show" className="min-w-0">
          <motion.span variants={item} className="glass-dark inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-[#ffd9a8]">
            <Sparkles size={14} /> AI admission assistant for DUET Karachi
          </motion.span>
          <motion.h1 variants={item} className="mt-5 font-display text-4xl font-bold leading-[1.08] md:text-6xl">
            Your path to <span className="text-brand">Dawood University</span>, answered instantly.
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-xl text-lg text-white/80">
            Minimum marks, CPN merit, programs, documents and fees. Ask in English or Roman Urdu and get clear steps in seconds.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a href="#chat" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-[#0e1b3d] transition hover:brightness-105">
              Start chatting <ArrowDown size={16} />
            </a>
            <a href="#cpn" className="rounded-full border border-white/30 px-6 py-3 font-medium transition hover:bg-white/10">Estimate my CPN</a>
          </motion.div>
          <motion.ul variants={item} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/75">
            <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-brand" /> HEC recognised</li>
            <li className="flex items-center gap-2"><BadgeCheck size={16} className="text-brand" /> Since 1962</li>
            <li className="flex items-center gap-2"><MapPin size={16} className="text-brand" /> M.A. Jinnah Road, Karachi</li>
          </motion.ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} className="min-w-0">
          <ChatWindow />
        </motion.div>
      </div>
    </section>
  );
}
