import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'motion/react';
import { Cpu, ShieldCheck, ShieldAlert, Zap } from 'lucide-react';

const clamp = (v) => Math.min(100, Math.max(0, Number(v) || 0));
const WEIGHTS = { matric: 0.1, inter: 0.3, test: 0.6 };
const MIN_INTER = { BE: 60, BS: 50 };
const RADIUS = 92;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function Slider({ id, label, weight, value, onChange }) {
  const pct = clamp(value);
  return (
    <div className="rounded-2xl border border-cyan-300/15 bg-navy-900/70 p-4">
      <div className="flex items-center justify-between text-sm">
        <label htmlFor={id} className="font-medium">{label}</label>
        <span className="rounded-full bg-cyan-300/10 px-2 py-0.5 font-mono text-xs text-cyan-200">weight {weight}</span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <input
          id={id}
          type="range"
          min="0"
          max="100"
          value={pct}
          onChange={(e) => onChange(e.target.value)}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-300"
          style={{ background: `linear-gradient(90deg, #67e8f9 ${pct}%, rgb(255 255 255 / 0.1) ${pct}%)` }}
        />
        <input
          aria-label={`${label} value`}
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-20 rounded-lg border border-white/10 bg-navy-950 px-2 py-1 text-center font-mono outline-none focus:border-cyan-300"
        />
      </div>
    </div>
  );
}

function Gauge({ score }) {
  const progress = useMotionValue(0);
  const shown = useTransform(progress, (v) => v.toFixed(2));
  const dash = useTransform(progress, (v) => CIRCUMFERENCE * (1 - v / 100));

  useEffect(() => {
    const controls = animate(progress, score, { duration: 1.1, ease: 'easeOut' });
    return () => controls.stop();
  }, [score, progress]);

  return (
    <div className="relative grid size-64 place-items-center">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-dashed border-cyan-300/30"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute inset-3 rounded-full border border-gold-400/25"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 36, ease: 'linear' }}
      />
      <svg viewBox="0 0 220 220" className="absolute inset-0 -rotate-90" role="img" aria-label={`Estimated CPN ${score.toFixed(2)} percent`}>
        <defs>
          <linearGradient id="cpnGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#f2c14e" />
          </linearGradient>
        </defs>
        <circle cx="110" cy="110" r={RADIUS} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="12" />
        <motion.circle
          cx="110" cy="110" r={RADIUS} fill="none" stroke="url(#cpnGrad)" strokeWidth="12" strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE} style={{ strokeDashoffset: dash, filter: 'drop-shadow(0 0 8px rgb(103 232 249 / 0.7))' }}
        />
      </svg>
      <div className="text-center">
        <div className="font-mono text-xs tracking-[0.3em] text-cyan-200/80">CPN</div>
        <motion.div className="font-display text-5xl font-bold text-white tabular-nums">{shown}</motion.div>
        <div className="font-mono text-xs text-slate-400">out of 100</div>
      </div>
    </div>
  );
}

export default function CpnEstimator() {
  const [v, setV] = useState({ matric: 80, inter: 75, test: 70 });
  const [degree, setDegree] = useState('BE');
  const set = (key) => (value) => setV((s) => ({ ...s, [key]: value }));

  const score = clamp(v.matric) * WEIGHTS.matric + clamp(v.inter) * WEIGHTS.inter + clamp(v.test) * WEIGHTS.test;
  const eligible = clamp(v.inter) >= MIN_INTER[degree];

  return (
    <section id="cpn" className="mx-auto max-w-6xl px-5 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-navy-900/80 p-6 shadow-[0_0_80px_-20px_rgb(103_232_249/0.35)] md:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgb(103 232 249 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(103 232 249 / 0.12) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(circle at 70% 40%, black, transparent 70%)',
          }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent"
          animate={{ y: ['-20%', '420%'] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 font-mono text-xs tracking-widest text-cyan-200">
              <Cpu size={14} /> CPN ESTIMATOR
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Estimate your merit score</h2>
            <p className="mt-2 text-slate-300">
              Composite Percentage Number = 10% Matric + 30% Intermediate + 60% Entry Test. Indicative only: confirm the official formula on the admissions portal.
            </p>

            <div role="group" aria-label="Degree type" className="mt-5 inline-flex rounded-full border border-white/10 bg-navy-950 p-1">
              {['BE', 'BS'].map((d) => (
                <button key={d} type="button" onClick={() => setDegree(d)} aria-pressed={degree === d}
                  className={`rounded-full px-5 py-1.5 text-sm font-semibold transition ${degree === d ? 'bg-cyan-300 text-navy-950' : 'text-slate-300 hover:text-white'}`}>
                  {d === 'BE' ? 'BE (Engineering)' : 'BS (Science)'}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <Slider id="matric" label="Matric %" weight="10%" value={v.matric} onChange={set('matric')} />
              <Slider id="inter" label="Intermediate %" weight="30%" value={v.inter} onChange={set('inter')} />
              <Slider id="test" label="Entry test %" weight="60%" value={v.test} onChange={set('test')} />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6">
            <Gauge score={score} />
            <motion.div
              key={`${degree}-${eligible}`}
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              role="status"
              className={`flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 text-sm ${eligible ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-100' : 'border-rose-400/40 bg-rose-400/10 text-rose-100'}`}
            >
              {eligible ? <ShieldCheck className="mt-0.5 shrink-0" size={18} /> : <ShieldAlert className="mt-0.5 shrink-0" size={18} />}
              <span>
                {eligible
                  ? `Intermediate ${clamp(v.inter)}% meets the ${MIN_INTER[degree]}% minimum for ${degree} programs.`
                  : `${degree} programs need at least ${MIN_INTER[degree]}% in Intermediate. You are ${(MIN_INTER[degree] - clamp(v.inter)).toFixed(0)}% short.`}
              </span>
            </motion.div>
            <p className="flex items-center gap-2 text-center text-xs text-slate-400">
              <Zap size={14} className="text-gold-400" /> Most programs reportedly closed around 50% to 62% CPN in 2025 (third-party estimate).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
