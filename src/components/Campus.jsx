import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Library, FlaskConical, Mic2, Bus, Home } from 'lucide-react';
import { galleryPhotos } from '../campusPhotos.js';

const facilities = [
  [Library, 'Libraries', 'Reading rooms and study space.'],
  [FlaskConical, 'Laboratories', 'Hands-on engineering labs.'],
  [Mic2, 'Auditorium', 'Seminars and events (reported capacity about 650).'],
  [Bus, 'Shuttle bus', 'Reported; routes and charges vary.'],
  [Home, 'Hostel', 'Very limited. Confirm with Student Affairs.'],
];

function Photo({ photo, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  return (
    <figure ref={ref} className={`relative overflow-hidden rounded-3xl ${className}`}>
      <motion.img src={photo.src} alt={photo.alt} loading="lazy" style={{ y, objectPosition: photo.position }} className="absolute inset-0 size-full scale-110 object-cover" />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-sm font-medium text-white">{photo.caption}</figcaption>
    </figure>
  );
}

export default function Campus() {
  const [main, ...rest] = galleryPhotos;
  return (
    <section id="campus" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
      <p className="text-sm font-semibold tracking-widest text-brand">CAMPUS LIFE</p>
      <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Study where engineers are made</h2>
      <p className="mt-3 max-w-2xl text-muted">A public-sector engineering university in the heart of Karachi, growing from a college founded in 1962.</p>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex min-w-0 flex-col gap-4">
          <Photo photo={main} className="aspect-[16/10]" />
          {rest.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {rest.map((p) => <Photo key={p.src} photo={p} className="aspect-[4/3]" />)}
            </div>
          )}
        </div>
        <ul className="grid min-w-0 content-start gap-3">
          {facilities.map(([Icon, title, text], i) => (
            <motion.li key={title} initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand"><Icon size={20} /></span>
              <div><div className="font-semibold">{title}</div><div className="text-sm text-muted">{text}</div></div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
