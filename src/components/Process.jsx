import { motion } from 'motion/react';
import { UserPlus, FileText, Send, PenLine, Trophy } from 'lucide-react';

const steps = [
  [UserPlus, 'Register', 'Create your account on the admissions portal.'],
  [FileText, 'Apply', 'Fill the form and choose your program preferences.'],
  [Send, 'Pay & send', 'Pay the fee by challan, then send the form, documents and receipt.'],
  [PenLine, 'Entry test', 'Download your admit card and appear in the test.'],
  [Trophy, 'Merit & enrol', 'Check the merit list and complete enrolment on time.'],
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 bg-surface-2 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="text-sm font-semibold tracking-widest text-brand">HOW TO APPLY</p>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Admission in 5 steps</h2>
        <p className="mt-3 max-w-2xl text-muted">Follow the current notice on the portal for exact dates and fees.</p>

        <div className="relative mt-14">
          <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-6 hidden h-0.5 bg-line md:block">
            <motion.div className="h-full origin-left bg-brand" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: 'easeInOut' }} />
          </div>
          <ol className="grid gap-8 md:grid-cols-5 md:gap-4">
            {steps.map(([Icon, title, text], i) => (
              <motion.li key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 * i }}
                className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-brand text-[#0e1b3d] shadow-lg shadow-brand/30 ring-4 ring-surface-2">
                  <Icon size={22} />
                </span>
                <div>
                  <div className="text-xs font-semibold text-muted">STEP {i + 1}</div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
