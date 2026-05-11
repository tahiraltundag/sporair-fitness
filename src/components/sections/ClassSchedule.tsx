"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/BlurFade";
import { cn } from "@/lib/utils";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;
type Day = typeof DAYS[number];

type ClassItem = {
  time: string;
  name: string;
  trainer: string;
  trainerInitials: string;
  intensity: "Low" | "Mid" | "High" | "Max";
  spots: number;
};

const SCHEDULE: Record<Day, ClassItem[]> = {
  MON: [
    { time: "06:00", name: "Strength Foundation", trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "Mid",  spots: 4 },
    { time: "07:30", name: "Olympic Lifting",      trainer: "Sofia Keller", trainerInitials: "SK", intensity: "High", spots: 2 },
    { time: "09:00", name: "Mobility Flow",        trainer: "Aria Lowe",   trainerInitials: "AL", intensity: "Low",  spots: 8 },
    { time: "12:00", name: "Power HIIT",            trainer: "Jake Morrow", trainerInitials: "JM", intensity: "Max",  spots: 0 },
    { time: "18:00", name: "Barbell Club",          trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "High", spots: 3 },
    { time: "19:30", name: "Athletic Conditioning", trainer: "Jake Morrow", trainerInitials: "JM", intensity: "Max",  spots: 5 },
  ],
  TUE: [
    { time: "06:00", name: "Power HIIT",            trainer: "Jake Morrow",  trainerInitials: "JM", intensity: "Max",  spots: 5 },
    { time: "07:30", name: "Strength Foundation",   trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "Mid",  spots: 3 },
    { time: "09:00", name: "Yoga & Breathwork",     trainer: "Aria Lowe",   trainerInitials: "AL", intensity: "Low",  spots: 10 },
    { time: "18:00", name: "Sprint & Power",        trainer: "Sofia Keller", trainerInitials: "SK", intensity: "High", spots: 2 },
    { time: "19:30", name: "Mobility Flow",         trainer: "Aria Lowe",   trainerInitials: "AL", intensity: "Low",  spots: 7 },
  ],
  WED: [
    { time: "06:00", name: "Olympic Lifting",       trainer: "Sofia Keller", trainerInitials: "SK", intensity: "High", spots: 1 },
    { time: "08:00", name: "Athletic Conditioning", trainer: "Jake Morrow",  trainerInitials: "JM", intensity: "Max",  spots: 0 },
    { time: "12:00", name: "Strength Foundation",   trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "Mid",  spots: 6 },
    { time: "18:00", name: "Power HIIT",            trainer: "Jake Morrow",  trainerInitials: "JM", intensity: "Max",  spots: 4 },
    { time: "19:30", name: "Barbell Club",          trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "High", spots: 5 },
  ],
  THU: [
    { time: "06:00", name: "Mobility Flow",  trainer: "Aria Lowe",   trainerInitials: "AL", intensity: "Low",  spots: 9 },
    { time: "07:30", name: "Power HIIT",     trainer: "Jake Morrow",  trainerInitials: "JM", intensity: "Max",  spots: 3 },
    { time: "18:00", name: "Olympic Lifting",trainer: "Sofia Keller", trainerInitials: "SK", intensity: "High", spots: 2 },
    { time: "19:30", name: "Sprint & Power", trainer: "Sofia Keller", trainerInitials: "SK", intensity: "High", spots: 7 },
  ],
  FRI: [
    { time: "06:00", name: "Barbell Club",          trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "High", spots: 4 },
    { time: "08:00", name: "Athletic Conditioning", trainer: "Jake Morrow",  trainerInitials: "JM", intensity: "Max",  spots: 0 },
    { time: "12:00", name: "Yoga & Breathwork",     trainer: "Aria Lowe",   trainerInitials: "AL", intensity: "Low",  spots: 8 },
    { time: "18:00", name: "Strength Foundation",   trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "Mid",  spots: 5 },
    { time: "19:30", name: "Power HIIT",            trainer: "Jake Morrow",  trainerInitials: "JM", intensity: "Max",  spots: 2 },
  ],
  SAT: [
    { time: "08:00", name: "Weekend Warriors",  trainer: "Sofia Keller", trainerInitials: "SK", intensity: "Max",  spots: 3 },
    { time: "10:00", name: "Olympic Lifting",   trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "High", spots: 5 },
    { time: "11:30", name: "Mobility Flow",     trainer: "Aria Lowe",   trainerInitials: "AL", intensity: "Low",  spots: 10 },
    { time: "14:00", name: "Power HIIT",        trainer: "Jake Morrow",  trainerInitials: "JM", intensity: "Max",  spots: 0 },
  ],
  SUN: [
    { time: "09:00", name: "Recovery & Mobility", trainer: "Aria Lowe",   trainerInitials: "AL", intensity: "Low", spots: 12 },
    { time: "10:30", name: "Strength Foundation", trainer: "Marcus Thorn", trainerInitials: "MT", intensity: "Mid", spots: 7 },
    { time: "12:00", name: "Open Gym",            trainer: "Any Coach",    trainerInitials: "AC", intensity: "Mid", spots: 15 },
  ],
};

const INTENSITY: Record<ClassItem["intensity"], { dot: string; label: string }> = {
  Low:  { dot: "bg-emerald-400", label: "text-emerald-400" },
  Mid:  { dot: "bg-sky-400",     label: "text-sky-400" },
  High: { dot: "bg-orange-400",  label: "text-orange-400" },
  Max:  { dot: "bg-[#facc15]",   label: "text-[#facc15]" },
};

function ClassRow({ cls }: { cls: ClassItem }) {
  const [hovered, setHovered] = useState(false);
  const cfg = INTENSITY[cls.intensity];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group grid grid-cols-[72px_1fr_auto] md:grid-cols-[80px_1fr_120px_100px_110px] gap-4 items-center bg-[#0a0a0a] hover:bg-[#27272a] transition-colors duration-200 px-6 py-5 border-b border-white/[0.05] relative overflow-hidden cursor-pointer"
    >
      {/* Hover left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#facc15] group-hover:w-[3px] transition-all duration-200" />

      {/* Time */}
      <div className="font-display text-lg text-[#facc15] tracking-widest">{cls.time}</div>

      {/* Name */}
      <div>
        <div className="font-display text-base md:text-lg text-white tracking-wide group-hover:text-[#facc15] transition-colors duration-150">
          {cls.name}
        </div>

        {/* Trainer photo reveal on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.18, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex items-center gap-2 mt-1.5"
            >
              <div className="w-6 h-6 bg-[#facc15]/15 border border-[#facc15]/30 flex items-center justify-center shrink-0">
                <span className="font-display text-[8px] text-[#facc15]">{cls.trainerInitials}</span>
              </div>
              <span className="font-body text-[11px] text-white/50">{cls.trainer}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {!hovered && (
          <div className="font-body text-xs text-white/30 mt-0.5">{cls.trainer}</div>
        )}
      </div>

      {/* Duration — hidden mobile */}
      <div className="hidden md:block font-body text-xs text-white/30 uppercase tracking-widest">
        60 min
      </div>

      {/* Intensity — hidden mobile */}
      <div className="hidden md:flex items-center gap-2">
        <div className={cn("w-2 h-2", cfg.dot)} />
        <span className={cn("font-body text-[11px] uppercase tracking-widest", cfg.label)}>
          {cls.intensity}
        </span>
      </div>

      {/* Spots */}
      <div className="text-right">
        {cls.spots === 0 ? (
          <span className="font-body text-[11px] text-white/20 uppercase tracking-widest">Full</span>
        ) : (
          <span className="font-body text-[11px] text-white/40">{cls.spots} left</span>
        )}
      </div>
    </div>
  );
}

export function ClassSchedule() {
  const [day, setDay] = useState<Day>("MON");

  return (
    <section id="schedule" className="bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.06]" />

      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        {/* Header */}
        <BlurFade>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-px bg-[#facc15]" />
                <span className="font-body text-[#facc15] text-[10px] tracking-[0.4em] uppercase">
                  "Weekly Schedule"
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tight">
                CLASS<br />SCHEDULE
              </h2>
            </div>
            <p className="font-body text-white/35 text-sm max-w-xs leading-relaxed">
              40+ classes per week spanning strength, conditioning, mobility, and Olympic lifting.
            </p>
          </div>
        </BlurFade>

        {/* Day tabs — sticky */}
        <div className="sticky top-[64px] z-20 bg-[#0a0a0a] border-b border-white/[0.06] pb-0 mb-0">
          <div className="flex gap-px overflow-x-auto scrollbar-hide">
            {DAYS.map((d) => (
              <button
                key={d}
                onClick={() => setDay(d)}
                className={cn(
                  "flex-shrink-0 font-display text-[13px] tracking-[0.18em] uppercase px-6 py-4 transition-all duration-150",
                  day === d
                    ? "bg-[#facc15] text-[#0a0a0a]"
                    : "text-white/35 hover:text-white hover:bg-white/[0.04]",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Class list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Column headers */}
            <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_110px] gap-4 px-6 py-3 border-b border-white/[0.05]">
              {["Time", "Class", "Duration", "Level", "Availability"].map((h) => (
                <div key={h} className="font-body text-[9px] text-white/20 uppercase tracking-[0.25em]">
                  {h}
                </div>
              ))}
            </div>

            {SCHEDULE[day].map((cls, i) => (
              <ClassRow key={i} cls={cls} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Intensity legend */}
        <BlurFade delay={0.3}>
          <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-white/[0.05]">
            {(Object.entries(INTENSITY) as [ClassItem["intensity"], typeof INTENSITY[ClassItem["intensity"]]][]).map(([k, v]) => (
              <div key={k} className="flex items-center gap-2">
                <div className={cn("w-2 h-2", v.dot)} />
                <span className="font-body text-[10px] text-white/30 uppercase tracking-widest">{k}</span>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
