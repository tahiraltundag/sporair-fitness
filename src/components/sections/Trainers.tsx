"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/BlurFade";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const TRAINERS = [
  {
    id:       "marcus",
    name:     "Marcus Thorn",
    role:     "Head Strength Coach",
    initials: "MT",
    photo:    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&h=800&q=80",
    specialties: ["Powerlifting", "Olympic Lifting", "Sports Performance"],
    certs:    ["NSCA-CSCS", "USAW Level 2", "Precision Nutrition L1"],
    bio:      "Former national powerlifting champion. 12 years coaching elite athletes. Marcus's programming philosophy: master fundamentals until they become instinct, then break every record you thought was fixed.",
    stats:    [["12 yr", "Coaching"], ["340+", "Clients"], ["1,200+", "PRs Set"]],
    avail:    "Mon · Wed · Fri · Sat",
  },
  {
    id:       "sofia",
    name:     "Sofia Keller",
    role:     "Olympic Weightlifting Coach",
    initials: "SK",
    photo:    "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&h=800&q=80",
    specialties: ["Olympic Lifting", "Sprint & Power", "Biomechanics"],
    certs:    ["USAW Level 3", "NSCA-CPT", "FMS Certified"],
    bio:      "8 years competing internationally. Sofia's technical eye is unmatched — her athletes consistently hit PRs within the first 6 weeks. Known for breaking down the snatch and clean & jerk into teachable precision.",
    stats:    [["27", "Int'l Comps"], ["180+", "Athletes"], ["6 wks", "Avg PR"]],
    avail:    "Tue · Wed · Thu · Sat",
  },
  {
    id:       "jake",
    name:     "Jake Morrow",
    role:     "Athletic Conditioning Lead",
    initials: "JM",
    photo:    "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&h=800&q=80",
    specialties: ["HIIT", "Metabolic Conditioning", "Speed & Agility"],
    certs:    ["NSCA-CSCS", "CrossFit Level 2", "EXOS Specialist"],
    bio:      "Built his reputation training professional NFL and NBA athletes. Jake's conditioning circuits are notoriously brutal — and notoriously effective. His dropout rate is 2%. The other 98% are transformed.",
    stats:    [["60+", "Pro Athletes"], ["+31%", "VO₂ Max"], ["2%", "Dropout Rate"]],
    avail:    "Mon · Tue · Thu · Fri",
  },
  {
    id:       "aria",
    name:     "Aria Lowe",
    role:     "Recovery & Mobility Director",
    initials: "AL",
    photo:    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&h=800&q=80",
    specialties: ["Mobility", "Yoga & Breathwork", "Injury Rehab"],
    certs:    ["200hr RYT", "FRC Mobility Specialist", "NASM-PES"],
    bio:      "The quiet force behind every high-performer's longevity. Aria's evidence-based approach has helped 90+ athletes bounce back from injury faster than expected — and stay healthy years longer than they thought possible.",
    stats:    [["90+", "Rehabs"], ["+45%", "Mobility"], ["+8 yr", "Longevity"]],
    avail:    "Mon · Tue · Thu · Sun",
  },
];

export function Trainers() {
  const [active, setActive] = useState<string | null>(null);
  const trainer = TRAINERS.find((t) => t.id === active);

  return (
    <section id="trainers" className="bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.06]" />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        {/* Header */}
        <BlurFade>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-[#facc15]" />
                <span className="font-body text-[#facc15] text-[10px] tracking-[0.4em] uppercase">
                  "Our Coaches"
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tight">
                ELITE<br />TRAINERS.
              </h2>
            </div>
            <p className="font-body text-white/35 text-sm max-w-xs leading-relaxed">
              Not influencers. Not weekend-certified. Every ATLAS coach is a career
              specialist with elite-level results to prove it.
            </p>
          </div>
        </BlurFade>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]">
          {TRAINERS.map((t, i) => (
            <BlurFade key={t.id} delay={i * 0.09}>
              <button
                onClick={() => setActive(active === t.id ? null : t.id)}
                className={cn(
                  "w-full text-left bg-[#0a0a0a] group cursor-pointer relative overflow-hidden transition-colors duration-200",
                  active === t.id ? "bg-[#27272a]" : "hover:bg-[#111111]",
                )}
              >
                {/* Photo — grayscale by default, color on hover */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#111111]">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top transition-all duration-500 grayscale group-hover:grayscale-0"
                  />

                  {/* Dark overlay — lightens on hover */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/50 group-hover:bg-[#0a0a0a]/20 transition-colors duration-500" />

                  {/* Active close indicator */}
                  {active === t.id && (
                    <div className="absolute top-3 right-3 z-10 w-6 h-6 bg-[#facc15] flex items-center justify-center">
                      <X size={12} className="text-black" />
                    </div>
                  )}

                  {/* Yellow bottom bar */}
                  <div className="absolute bottom-0 inset-x-0 h-0 bg-[#facc15] group-hover:h-[3px] transition-all duration-300" />
                </div>

                {/* Info */}
                <div className="p-5 md:p-6">
                  <div className="font-display text-lg md:text-xl text-white tracking-wide group-hover:text-[#facc15] transition-colors duration-150 mb-1">
                    {t.name}
                  </div>
                  <div className="font-body text-[10px] text-white/35 uppercase tracking-[0.18em] mb-4">
                    {t.role}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {t.specialties.slice(0, 2).map((s) => (
                      <span
                        key={s}
                        className="font-body text-[9px] text-white/25 uppercase tracking-wider border border-white/[0.08] px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 font-body text-[10px] text-white/25 uppercase tracking-widest group-hover:text-[#facc15]/70 transition-colors duration-150">
                    {active === t.id ? "Close ↑" : "Profile ↓"}
                  </div>
                </div>
              </button>
            </BlurFade>
          ))}
        </div>

        {/* Expanded bio drawer */}
        <AnimatePresence>
          {trainer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.25, 0.4, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-[#27272a] border-t-2 border-[#facc15] p-8 md:p-12 grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                  <div className="font-body text-[10px] text-[#facc15] uppercase tracking-[0.35em] mb-3">
                    "{trainer.role}"
                  </div>
                  <h3 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-6 uppercase">
                    {trainer.name}
                  </h3>
                  <p className="font-body text-white/55 leading-relaxed text-sm md:text-base mb-8">
                    {trainer.bio}
                  </p>
                  <div>
                    <div className="font-body text-[9px] text-white/25 uppercase tracking-[0.3em] mb-3">
                      Certifications
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trainer.certs.map((c) => (
                        <span key={c} className="font-body text-xs text-white/50 border border-white/10 px-3 py-1">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 gap-4">
                    {trainer.stats.map(([v, l]) => (
                      <div key={l} className="border-l-2 border-[#facc15] pl-4">
                        <div className="font-display text-2xl text-[#facc15]">{v}</div>
                        <div className="font-body text-[10px] text-white/35 uppercase tracking-widest">{l}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-body text-[9px] text-white/25 uppercase tracking-[0.3em] mb-2">
                      Availability
                    </div>
                    <div className="font-body text-sm text-white/50">{trainer.avail}</div>
                  </div>
                  <button className="w-full bg-[#facc15] text-[#0a0a0a] font-display text-sm tracking-[0.18em] uppercase py-4 hover:bg-[#fafaf5] transition-colors duration-150">
                    Book With {trainer.name.split(" ")[0]}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
