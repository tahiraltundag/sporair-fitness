"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const enter = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] as const },
});

export function Hero() {
  return (
    <section className="relative h-screen min-h-[680px] flex flex-col overflow-hidden bg-[#0a0a0a]">

      {/* ── Full-bleed athlete photo ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85"
          alt="Elite athlete training"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark overlay — left heavy for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/75 to-[#0a0a0a]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        {/* Subtle yellow tint on right edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 70% at 85% 40%, rgba(250,204,21,0.06) 0%, transparent 60%)",
          }}
        />
        {/* Off-White diagonal stripe — right half only */}
        <div
          className="absolute top-0 right-0 w-[50vw] h-full opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-48deg, transparent 0px, transparent 40px, rgba(255,255,255,0.015) 40px, rgba(255,255,255,0.015) 41px)",
          }}
        />
      </div>

      {/* ── Yellow ticker ── */}
      <div className="relative z-20 bg-[#facc15] overflow-hidden py-[9px] mt-16">
        <div className="flex animate-marquee whitespace-nowrap select-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[#0a0a0a] text-[11px] tracking-[0.35em] uppercase mx-6"
            >
              SporAirFitness &nbsp;/&nbsp; ELITE PERFORMANCE STUDIO &nbsp;/&nbsp; TRAIN LIKE YOU MEAN IT
            </span>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-7xl mx-auto w-full px-6 pb-16 md:pb-20">

        <motion.div {...enter(0.1)} className="flex items-center gap-3 mb-5">
          <div className="w-8 h-px bg-[#facc15]" />
          <span className="font-body text-[#facc15] text-[10px] tracking-[0.45em] uppercase">
            "Premium Fitness Studio"
          </span>
        </motion.div>

        <motion.h1
          {...enter(0.22)}
          className="font-display uppercase leading-[0.88] tracking-tight text-white"
          style={{ fontSize: "clamp(4.5rem, 12vw, 11.5rem)" }}
        >
          TRAIN LIKE
          <br />
          YOU MEAN
          <br />
          <span className="text-[#facc15]">IT.</span>
        </motion.h1>

        <motion.p
          {...enter(0.38)}
          className="font-body text-white/55 text-base md:text-lg max-w-[38ch] leading-relaxed mt-6"
        >
          Science-backed programming. World-class coaches.
          Ruthless accountability. No membership compromise.
        </motion.p>

        <motion.div
          {...enter(0.5)}
          className="flex flex-wrap items-center gap-4 mt-9"
        >
          <a
            href="#cta"
            className="group flex items-center gap-3 bg-[#facc15] text-[#0a0a0a] font-display text-sm tracking-[0.18em] uppercase px-8 py-[15px] hover:bg-[#fafaf5] transition-colors duration-150"
          >
            Book Intro Session
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
          </a>
          <a
            href="#schedule"
            className="font-body text-[11px] tracking-[0.2em] uppercase text-white/55 hover:text-white border border-white/20 hover:border-white/50 px-7 py-[14px] transition-all duration-150"
          >
            View Classes
          </a>
        </motion.div>

        <motion.div
          {...enter(0.62)}
          className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/[0.1]"
        >
          {[
            ["500+", "Members trained"],
            ["12",   "Expert coaches"],
            ["8 yr", "In business"],
            ["#1",   "Rated studio"],
          ].map(([v, l]) => (
            <div key={l} className="flex items-baseline gap-2">
              <span className="font-display text-[1.4rem] text-white tracking-wide">{v}</span>
              <span className="font-body text-[10px] text-white/40 uppercase tracking-widest">{l}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Side scroll label */}
      <motion.div
        {...enter(0.9)}
        className="absolute bottom-20 right-6 md:right-10 z-10 hidden md:flex flex-col items-center gap-2"
        aria-hidden
      >
        <div
          className="font-body text-[9px] text-white/25 tracking-[0.35em] uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          "SCROLL TO EXPLORE"
        </div>
        <div className="w-px h-16 bg-white/10" />
      </motion.div>
    </section>
  );
}
