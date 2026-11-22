import { motion } from 'motion/react';

const steps = [
  ['Register', 'Create your account on the admissions portal.'],
  ['Apply', 'Fill the form and choose your program preferences.'],
  ['Pay & upload', 'Upload documents and pay the application fee by challan.'],
  ['Entry test', 'Download your roll number slip and appear in the test.'],
  ['Merit & enrol', 'Check the merit list and complete enrolment on time.'],
];

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-20">
      <h2 className="font-display text-3xl font-bold md:text-4xl">Admission in 5 steps</h2>
      <ol className="mt-10 grid gap-4 md:grid-cols-5">
        {steps.map(([t, d], i) => (
          <motion.li key={t} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }} className="glass relative rounded-2xl p-5">
            <span className="grid size-8 place-items-center rounded-full bg-gold-400 text-sm font-bold text-navy-950">{i + 1}</span>
            <div className="mt-3 font-semibold">{t}</div>
            <p className="mt-1 text-sm text-slate-300">{d}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
