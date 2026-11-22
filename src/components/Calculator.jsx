import { useState } from 'react';
import { motion } from 'motion/react';

const clamp = (v) => Math.min(100, Math.max(0, Number(v) || 0));

export default function Calculator() {
  const [v, setV] = useState({ matric: 80, inter: 75, test: 70 });
  const aggregate = (clamp(v.matric) * 0.1 + clamp(v.inter) * 0.4 + clamp(v.test) * 0.5).toFixed(2);
  const fields = [['matric', 'Matric %', '10%'], ['inter', 'Intermediate %', '40%'], ['test', 'Entry test %', '50%']];

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <div className="glass grid gap-8 rounded-3xl p-6 md:grid-cols-2 md:p-10">
        <div>
          <h2 className="font-display text-3xl font-bold">Merit aggregate estimator</h2>
          <p className="mt-2 text-slate-300">Indicative only. Weights (10/40/50) are a sample; the official formula is in the current prospectus.</p>
          <div className="mt-6 space-y-4">
            {fields.map(([k, label, w]) => (
              <label key={k} className="block text-sm">
                <span className="flex justify-between"><span>{label}</span><span className="text-slate-400">weight {w}</span></span>
                <input type="number" min="0" max="100" value={v[k]} onChange={(e) => setV({ ...v, [k]: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-navy-900 px-4 py-2 outline-none focus:border-gold-400" />
              </label>
            ))}
          </div>
        </div>
        <div className="grid place-items-center">
          <motion.div key={aggregate} initial={{ scale: 0.9, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <div className="text-sm tracking-widest text-slate-400">ESTIMATED AGGREGATE</div>
            <div className="font-display text-7xl font-bold text-gold-400">{aggregate}</div>
            <div className="mt-1 text-slate-400">out of 100</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
