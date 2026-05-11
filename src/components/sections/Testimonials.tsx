"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/BlurFade";

const TESTIMONIALS = [
  {
    quote:
      "I've been to 11 gyms in 10 years. SporAirFitness is the first place where I didn't quit after 6 weeks. The programming is different. The coaches are different. I'm different.",
    name:    "David M.",
    title:   "Member, 14 months",
    photo:   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80",
    stats:   [
      { value: "14 mo",  label: "Unbroken streak" },
      { value: "340+",   label: "Classes" },
      { value: "-19 kg", label: "Lost" },
    ],
    featured: true,
  },
  {
    quote:
      "The coaches here don't let you make excuses. Three months in, I deadlifted my own bodyweight for the first time in my life.",
    name:    "Sarah K.",
    title:   "Member, 9 months",
    photo:   "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80",
    stats:   [
      { value: "75 kg",  label: "First deadlift PR" },
      { value: "8 wks",  label: "Time to PR" },
    ],
    featured: false,
  },
  {
    quote:
      "As a surgeon I need precision and longevity. SporAirFitness gave me both. I've added 15 years of active training life.",
    name:    "Dr. Priya N.",
    title:   "Member, 2 years",
    photo:   "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80",
    stats:   [
      { value: "Zero",  label: "Injuries" },
      { value: "+40%",  label: "Mobility gain" },
    ],
    featured: false,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#27272a] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.06]" />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Header */}
        <BlurFade>
          <div className="flex items-center gap-4 mb-14">
            <div className="w-10 h-px bg-[#facc15]" />
            <span className="font-body text-[#facc15] text-[10px] tracking-[0.4em] uppercase">
              "Member Results"
            </span>
          </div>
        </BlurFade>

        {/* Asymmetric editorial grid */}
        <div className="grid md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] gap-px bg-white/[0.05]">

          {/* ── Large featured testimonial ── */}
          <BlurFade delay={0.1}>
            <div className="bg-[#27272a] p-8 md:p-12 lg:p-16 flex flex-col justify-between group hover:-translate-y-px transition-transform duration-200 relative overflow-hidden">
              {/* Giant quote mark */}
              <div
                className="absolute -top-6 -left-2 font-display text-[14rem] leading-none text-[#facc15]/[0.07] select-none pointer-events-none"
                aria-hidden
              >
                "
              </div>

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-7">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <polygon
                        points="7,1 8.8,5.2 13.3,5.4 10,8.3 11.1,12.8 7,10.3 2.9,12.8 4,8.3 0.7,5.4 5.2,5.2"
                        fill="#facc15"
                      />
                    </svg>
                  ))}
                </div>

                <blockquote className="font-display text-2xl md:text-3xl lg:text-[2rem] text-white leading-snug tracking-wide uppercase mb-8">
                  "{TESTIMONIALS[0].quote}"
                </blockquote>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8 border-t border-white/[0.07] pt-7">
                  {TESTIMONIALS[0].stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-2xl text-[#facc15] tracking-wide">{s.value}</div>
                      <div className="font-body text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Author with real photo */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 shrink-0 overflow-hidden">
                    <Image
                      src={TESTIMONIALS[0].photo}
                      alt={TESTIMONIALS[0].name}
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <div className="font-body text-sm text-white font-medium">{TESTIMONIALS[0].name}</div>
                    <div className="font-body text-[10px] text-white/35 uppercase tracking-[0.15em]">
                      {TESTIMONIALS[0].title}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-6 right-8 font-body text-[10px] text-white/10 tracking-[0.3em] uppercase">
                01 / Member
              </div>
            </div>
          </BlurFade>

          {/* ── Two stacked smaller testimonials ── */}
          <div className="flex flex-col gap-px">
            {TESTIMONIALS.slice(1).map((t, i) => (
              <BlurFade key={t.name} delay={0.18 + i * 0.1}>
                <div className="bg-[#0a0a0a] p-7 md:p-8 flex flex-col justify-between group hover:-translate-y-px transition-transform duration-200 relative overflow-hidden h-full">
                  <div
                    className="absolute -top-3 -left-1 font-display text-7xl leading-none text-[#facc15]/[0.08] select-none pointer-events-none"
                    aria-hidden
                  >
                    "
                  </div>

                  <div className="relative z-10 flex-1">
                    <blockquote className="font-body text-sm md:text-base text-white/65 leading-relaxed italic mb-6">
                      "{t.quote}"
                    </blockquote>

                    <div className="flex gap-5 mb-6">
                      {t.stats.map((s) => (
                        <div key={s.label}>
                          <div className="font-display text-lg text-[#facc15]">{s.value}</div>
                          <div className="font-body text-[9px] text-white/25 uppercase tracking-widest">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Author with real photo */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                    <div className="relative w-9 h-9 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={t.photo}
                        alt={t.name}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                    <div>
                      <div className="font-body text-xs text-white">{t.name}</div>
                      <div className="font-body text-[9px] text-white/30 uppercase tracking-wider">{t.title}</div>
                    </div>
                    <div className="ml-auto font-body text-[9px] text-white/10 tracking-[0.3em] uppercase">
                      0{i + 2} / Member
                    </div>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <BlurFade delay={0.4}>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
            <p className="font-body text-white/30 text-sm max-w-sm">
              Over 500 transformations and counting. Every one started with a free intro session.
            </p>
            <a
              href="#cta"
              className="font-display text-sm tracking-[0.18em] uppercase text-[#facc15] hover:text-white border border-[#facc15]/30 hover:border-white/30 px-6 py-3 transition-all duration-150 whitespace-nowrap"
            >
              Read All Stories →
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
