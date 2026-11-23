import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { askAssistant } from '../ask.js';

/** Shows a floating "Ask AI" button once the main chat has scrolled out of view. */
export default function FloatingAsk() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const chat = document.getElementById('chat');
    if (!chat || !('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting && window.scrollY > 200), { threshold: 0 });
    observer.observe(chat);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          onClick={() => askAssistant()}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-semibold text-[#0e1b3d] shadow-xl shadow-black/30 hover:brightness-105"
        >
          <MessageCircle size={18} /> Ask AI
        </motion.button>
      )}
    </AnimatePresence>
  );
}
