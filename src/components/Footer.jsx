import { GraduationCap, MapPin, Globe, Phone, ArrowUp } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a1226] text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5 font-display text-lg font-bold text-white">
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-[#0e1b3d]"><GraduationCap size={20} /></span> DUET Admissions
          </div>
          <p className="mt-4 max-w-sm text-sm">Student-built AI assistant for Dawood University of Engineering and Technology, Karachi. Not an official university service.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-semibold text-white">Explore</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {[['Programs', '#programs'], ['How to apply', '#process'], ['Campus', '#campus'], ['CPN estimator', '#cpn'], ['FAQ', '#faq']].map(([l, h]) => (
              <li key={h}><a href={h} className="hover:text-brand">{l}</a></li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-semibold text-white">Contact</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand" /> M.A. Jinnah Road, Karachi-74800</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-brand" /> +92 21 9923 1195/96 (public listing)</li>
            <li className="flex gap-2"><Globe size={16} className="mt-0.5 shrink-0 text-brand" />
              <span><a className="underline hover:text-brand" href="https://admissions.duet.edu.pk" target="_blank" rel="noreferrer">admissions.duet.edu.pk</a><br /><a className="underline hover:text-brand" href="https://www.duet.edu.pk" target="_blank" rel="noreferrer">www.duet.edu.pk</a></span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-white/60">
          <p>Always verify dates, fees and criteria on the official admissions portal. Web Technologies project, 23F CS.</p>
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-brand"><ArrowUp size={14} /> Back to top</a>
        </div>
      </div>
    </footer>
  );
}
