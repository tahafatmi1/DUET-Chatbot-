import { motion } from 'motion/react';
import { Building2, Zap, Cpu, Cog, FlaskConical, Fuel, Code2, ShieldCheck } from 'lucide-react';

const programs = [
  [Building2, 'Civil Engineering', 'BE'], [Zap, 'Electrical Engineering', 'BE'], [Cpu, 'Electronic Engineering', 'BE'],
  [Cog, 'Mechanical Engineering', 'BE'], [FlaskConical, 'Chemical Engineering', 'BE'], [Fuel, 'Petroleum & Gas', 'BE'],
  [Code2, 'Software Engineering', 'BS'], [ShieldCheck, 'Information Security', 'BS'],
];

export default function Programs() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="font-display text-3xl font-bold md:text-4xl">Popular programs</h2>
      <p className="mt-2 text-slate-300">A sample of what is on offer. Ask the assistant for the full current list.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programs.map(([Icon, name, deg], i) => (
          <motion.div key={name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }} whileHover={{ y: -6 }}
            className="glass rounded-2xl p-5 hover:border-gold-400/60">
            <Icon className="text-gold-400" />
            <div className="mt-4 font-semibold">{name}</div>
            <div className="mt-1 text-xs tracking-widest text-slate-400">{deg} PROGRAM</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
