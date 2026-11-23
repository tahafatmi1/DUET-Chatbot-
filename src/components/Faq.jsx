import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, MessageCircle } from 'lucide-react';
import { askAssistant } from '../ask.js';

const faqs = [
  ['What are the minimum marks?', 'You need at least 60% in your 2nd-year Intermediate (HSSC Part II) for BE programs and at least 50% for BS programs. This only makes you eligible; selection is by merit (CPN).'],
  ['How is merit (CPN) calculated?', 'Published guides give CPN = 10% Matric + 30% Intermediate + 60% Entry Test. Use the CPN estimator on this page and confirm the official formula on the portal.'],
  ['How do I apply?', 'Register on the admissions portal, fill the form, pay the fee by challan, send the printed form with documents and receipt to the Directorate of Admissions, then take the entry test.'],
  ['Which documents do I need?', 'Attested Matric and Intermediate mark sheets, CNIC or B-Form, domicile, photographs and fee receipt. Foreign or A-Level candidates also need an IBCC equivalence certificate.'],
  ['How much are the fees?', 'Reported merit-seat tuition is roughly Rs. 32,000 to 70,000 per semester depending on the program; self-finance seats are much higher. Fees change every year, so check the official fee page.'],
  ['Is hostel available?', 'Hostel places are very limited and many students arrange private housing. Please confirm with the Student Affairs office.'],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-24">
      <p className="text-sm font-semibold tracking-widest text-brand">FAQ</p>
      <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Quick answers</h2>
      <div className="mt-8 divide-y divide-line rounded-3xl border border-line bg-surface">
        {faqs.map(([q, a], i) => {
          const isOpen = open === i;
          return (
            <div key={q}>
              <h3>
                <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold">
                  {q}
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-soft text-brand"><Plus size={18} /></motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <p className="px-6 text-muted">{a}</p>
                    <button type="button" onClick={() => askAssistant(q)} className="mx-6 mb-5 mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
                      <MessageCircle size={14} /> Ask the assistant about this
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
