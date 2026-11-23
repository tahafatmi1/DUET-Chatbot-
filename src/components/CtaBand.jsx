import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { campusPhotos, heroPhoto } from '../campusPhotos.js';
import { askAssistant } from '../ask.js';

/** Closing call-to-action over a campus photo (uses a different photo from the hero when available). */
export default function CtaBand() {
  const photo = campusPhotos.find((p) => p !== heroPhoto && p.src.includes('courtyard')) ?? campusPhotos.find((p) => p !== heroPhoto) ?? heroPhoto;
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-[#0a1226] text-white">
      <img src={photo.src} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover" style={{ objectPosition: photo.position }} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a1226]/92 to-[#0a1226]/55" />
      <div className="mx-auto max-w-6xl px-5 py-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl">
          <h2 id="cta-title" className="font-display text-3xl font-bold md:text-4xl">Still have a question about admission?</h2>
          <p className="mt-3 text-white/80">Ask the assistant about minimum marks, CPN, documents or fees. It answers from the DUET knowledge base first and points you to the official portal for dates and fees.</p>
          <button type="button" onClick={() => askAssistant()} className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-[#0e1b3d] transition hover:brightness-105">
            <MessageCircle size={18} /> Ask the AI assistant
          </button>
        </motion.div>
      </div>
    </section>
  );
}
