"use client";

import { BlurFade } from "@/components/ui/BlurFade";
import { NumberTicker } from "@/components/ui/NumberTicker";

const STATS = [
  { value: 500,  suffix: "+", label: "Members Trained",  sub: "Active & alumni" },
  { value: 12,   suffix: "",  label: "Expert Coaches",   sub: "NSCA & CSCS certified" },
  { value: 94,   suffix: "%", label: "Retention Rate",   sub: "After 90-day trial" },
  { value: 8,    suffix: "",  label: "Years in Business", sub: "Est. 2017, New York" },
];

export function Stats() {
  return (
    <section id="stats" className="bg-[#27272a] relative overflow-hidden">
      {/* Thin rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-[#facc15]/20" />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        {/* Section label */}
        <BlurFade>
          <div className="flex items-center gap-4 mb-14">
            <div className="w-10 h-px bg-[#facc15]" />
            <span className="font-body text-[#facc15] text-[10px] tracking-[0.4em] uppercase">
              "By The Numbers"
            </span>
          </div>
        </BlurFade>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/[0.07]">
          {STATS.map((s, i) => (
            <BlurFade key={s.label} delay={i * 0.1}>
              <div className="px-6 md:px-10 py-8 md:py-0 group hover:-translate-y-px transition-transform duration-200 cursor-default">
                {/* Number */}
                <div className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-none text-white mb-2">
                  <NumberTicker value={s.value} suffix={s.suffix} />
                </div>
                {/* Label */}
                <div className="font-body text-xs text-white font-semibold uppercase tracking-[0.14em] mb-1">
                  {s.label}
                </div>
                {/* Sub */}
                <div className="font-body text-[11px] text-white/35">
                  {s.sub}
                </div>
                {/* Yellow underline reveal */}
                <div className="mt-4 w-0 h-px bg-[#facc15] group-hover:w-10 transition-all duration-300" />
              </div>
            </BlurFade>
          ))}
        </div>

        {/* Pull-quote */}
        <BlurFade delay={0.45}>
          <blockquote className="mt-16 pt-12 border-t border-white/[0.07] max-w-2xl">
            <p className="font-display text-2xl md:text-4xl text-white/75 leading-tight uppercase tracking-wide">
              "IN 12 WEEKS I LOST 22KG AND{" "}
              <span className="text-[#facc15]">DISCOVERED MY LIMIT WAS A LIE."</span>
            </p>
            <footer className="mt-5 flex items-center gap-3">
              <div className="w-9 h-9 bg-[#facc15]/15 border border-[#facc15]/30 flex items-center justify-center shrink-0">
                <span className="font-display text-[#facc15] text-xs">JR</span>
              </div>
              <div>
                <cite className="font-body text-xs text-white not-italic">James R.</cite>
                <div className="font-body text-[10px] text-white/35 mt-0.5">
                  Member since 2023 · Strength & Conditioning
                </div>
              </div>
            </footer>
          </blockquote>
        </BlurFade>
      </div>
    </section>
  );
}
