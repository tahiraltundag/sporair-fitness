const COLS = [
  {
    title: "Studio",
    links: ["Classes", "Trainers", "Pricing", "Schedule", "Facilities"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press", "Partners"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Accessibility", "Cookie Policy"],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "TikTok",    href: "#" },
  { label: "YouTube",   href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display text-2xl tracking-[0.12em] text-white">SporAirFitness</span>
              <span className="w-[6px] h-[6px] bg-[#facc15] rotate-45 shrink-0" aria-hidden />
            </div>
            <p className="font-body text-[11px] text-white/25 leading-relaxed max-w-[16ch]">
              Elite performance studio. Built for those who refuse ordinary.
            </p>
            {/* Address */}
            <div className="mt-5 font-body text-[10px] text-white/20 leading-relaxed">
              123 Performance Ave<br />
              New York, NY 10001<br />
              <span className="text-[#facc15]/60">(212) 555-0100</span>
            </div>
          </div>

          {/* Link cols */}
          {COLS.map((col) => (
            <div key={col.title}>
              <div className="font-body text-[9px] text-white/25 uppercase tracking-[0.32em] mb-5">
                {col.title}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-[12px] text-white/35 hover:text-white transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
          <div className="font-body text-[10px] text-white/20 tracking-[0.1em]">
            © 2026 SporAirFitness, Inc. All rights reserved.
          </div>

          {/* Socials — subtle */}
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="font-body text-[10px] text-white/20 hover:text-white/50 uppercase tracking-[0.2em] transition-colors duration-150"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
