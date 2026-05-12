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
    role:     "Baş Kuvvet Antrenörü",
    initials: "MT",
    photo:    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&h=800&q=80",
    specialties: ["Powerlifting", "Olimpik Kaldırış", "Spor Performansı"],
    certs:    ["NSCA-CSCS", "USAW Level 2", "Precision Nutrition L1"],
    bio:      "Eski ulusal powerlifting şampiyonu. 12 yıldır elit sporcuları çalıştırıyor. Marcus'un programlama felsefesi: temeller içgüdü haline gelene kadar ustalaş, sonra kırılamaz dediğin her rekoru kır.",
    stats:    [["12 yıl", "Koçluk"], ["340+", "Danışan"], ["1.200+", "Rekor"]],
    avail:    "Pzt · Çar · Cum · Cmt",
  },
  {
    id:       "sofia",
    name:     "Sofia Keller",
    role:     "Olimpik Kaldırış Antrenörü",
    initials: "SK",
    photo:    "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&h=800&q=80",
    specialties: ["Olimpik Kaldırış", "Sprint & Güç", "Biyomekanik"],
    certs:    ["USAW Level 3", "NSCA-CPT", "FMS Certified"],
    bio:      "8 yıl uluslararası düzeyde yarıştı. Sofia'nın teknik gözü eşsizdir — sporcuları ilk 6 hafta içinde düzenli olarak rekor kırar. Koparma ve silkme hareketlerini öğretilebilir hassasiyete indirgemesiyle tanınır.",
    stats:    [["27", "Uluslararası"], ["180+", "Sporcu"], ["6 hf", "Ort. PR"]],
    avail:    "Sal · Çar · Per · Cmt",
  },
  {
    id:       "jake",
    name:     "Jake Morrow",
    role:     "Atletik Kondisyon Şefi",
    initials: "JM",
    photo:    "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&h=800&q=80",
    specialties: ["HIIT", "Metabolik Kondisyon", "Hız & Çeviklik"],
    certs:    ["NSCA-CSCS", "CrossFit Level 2", "EXOS Specialist"],
    bio:      "Ününü profesyonel NFL ve NBA sporcularını çalıştırarak kazandı. Jake'in kondisyon devreleri acımasızlığıyla ünlüdür — ve etkisiyle de. Bırakma oranı %2. Diğer %98 tamamen dönüşür.",
    stats:    [["60+", "Pro Sporcu"], ["+%31", "VO₂ Max"], ["%2", "Bırakma"]],
    avail:    "Pzt · Sal · Per · Cum",
  },
  {
    id:       "aria",
    name:     "Aria Lowe",
    role:     "Toparlanma & Mobilite Direktörü",
    initials: "AL",
    photo:    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&h=800&q=80",
    specialties: ["Mobilite", "Yoga & Nefes", "Sakatlık Rehab"],
    certs:    ["200hr RYT", "FRC Mobility Specialist", "NASM-PES"],
    bio:      "Her yüksek performanslının uzun ömrünün arkasındaki sessiz güç. Aria'nın kanıta dayalı yaklaşımı, 90'dan fazla sporcunun sakatlıktan beklenenden hızlı dönmesine ve mümkün olduğunu düşündüklerinden yıllarca daha uzun süre sağlıklı kalmasına yardımcı oldu.",
    stats:    [["90+", "Rehab"], ["+%45", "Mobilite"], ["+8 yıl", "Uzun Ömür"]],
    avail:    "Pzt · Sal · Per · Paz",
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
                  "Eğitmen Kadromuz"
                </span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl text-white uppercase leading-[0.9] tracking-tight">
                ELİT<br />EĞİTMENLER.
              </h2>
            </div>
            <p className="font-body text-white/35 text-sm max-w-xs leading-relaxed">
              Influencer değil. Haftasonu sertifikalı değil. Her SporAirFitness eğitmeni, elit seviye
              sonuçlarla kanıtlanmış bir kariyer uzmanıdır.
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
                    {active === t.id ? "Kapat ↑" : "Profil ↓"}
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
                      Sertifikalar
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
                      Müsaitlik
                    </div>
                    <div className="font-body text-sm text-white/50">{trainer.avail}</div>
                  </div>
                  <button className="w-full bg-[#facc15] text-[#0a0a0a] font-display text-sm tracking-[0.18em] uppercase py-4 hover:bg-[#fafaf5] transition-colors duration-150">
                    {trainer.name.split(" ")[0]} ile Başla
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
