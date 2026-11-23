import { motion } from 'motion/react';
import { GraduationCap, Percent, Calculator, Building } from 'lucide-react';

const facts = [
  [GraduationCap, '60% / 50%', 'Minimum 2nd-year Intermediate marks for BE / BS'],
  [Calculator, '10 · 30 · 60', 'CPN weights: Matric · Intermediate · Entry test'],
  [Percent, '4 / 5 years', 'BE and BS degrees / B.Arch duration'],
  [Building, '1962', 'Founded as Dawood College of Engineering & Technology'],
];

export default function Facts() {
  return (
    <section aria-label="Key facts" className="relative z-10 mx-auto -mt-14 max-w-6xl px-5">
      <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line shadow-xl shadow-black/10 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([Icon, value, label], i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            className="flex items-start gap-4 bg-surface p-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Icon size={22} /></span>
            <div>
              <div className="font-display text-2xl font-bold">{value}</div>
              <div className="mt-1 text-sm text-muted">{label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
