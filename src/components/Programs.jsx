import { motion } from 'motion/react';
import { Building2, Zap, Cpu, Cog, FlaskConical, Fuel, Code2, Layers } from 'lucide-react';

const programs = [
  [FlaskConical, 'Chemical Engineering', 'BE · 2nd-yr inter ≥ 60%'], [Cpu, 'Computer Systems Engineering', 'BE · 2nd-yr inter ≥ 60%'],
  [Zap, 'Electronic Engineering', 'BE · 2nd-yr inter ≥ 60%'], [Fuel, 'Petroleum & Gas Engineering', 'BE · 2nd-yr inter ≥ 60%'],
  [Cog, 'Industrial Engineering & Mgmt', 'BE · 2nd-yr inter ≥ 60%'], [Layers, 'Metallurgy & Materials', 'BE · 2nd-yr inter ≥ 60%'],
  [Building2, 'Architecture & Planning', 'B.Arch · 2nd-yr inter ≥ 50%'], [Code2, 'CS, AI & Cyber Security', 'BS · 2nd-yr inter ≥ 50%'],
];

export default function Programs() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="font-display text-3xl font-bold md:text-4xl">Popular programs</h2>
      <p className="mt-2 text-slate-300">A sample of what is on offer, with the minimum 2nd-year Intermediate percentage. The current list is on the admissions portal.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map(([Icon, name, deg], i) => (
          <motion.div key={name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }}
            className="glass rounded-2xl p-5 hover:border-gold-400/60">
            <Icon className="text-gold-400" />
            <div className="mt-4 font-semibold">{name}</div>
            <div className="mt-1 text-xs tracking-widest text-slate-400">{deg.toUpperCase()}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
