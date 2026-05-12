"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/BlurFade";
import { CheckCircle2, ArrowRight } from "lucide-react";

const PERKS = [
  "Baş antrenörle 90 dk ücretsiz tanışma dersi",
  "Tam tesis turu & kişiye özel program danışmanlığı",
  "Sıfır yükümlülük — kredi kartı gerekmez",
  "30 günlük sonuç garantisi ya da ikinci ay ücretsiz",
];

export function CTA() {
  const [form,      setForm]      = useState({ name: "", email: "", goal: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section id="cta" className="bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.06]" />

      {/* Ghost headline backdrop */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="font-display text-[22vw] leading-none tracking-tight uppercase text-white/[0.018]"
        >
          SporAirFitness
        </span>
      </div>

      {/* Yellow bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-[#facc15]" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <BlurFade>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-px bg-[#facc15]" />
                <span className="font-body text-[#facc15] text-[10px] tracking-[0.4em] uppercase">
                  "SporAirFitness'a Katıl"
                </span>
              </div>

              <h2
                className="font-display uppercase leading-[0.88] tracking-tight text-white mb-8"
                style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
              >
                BAŞLAMAYA
                <br />
                HAZIR
                <br />
                <span className="text-[#facc15]">MISIN?</span>
              </h2>

              <p className="font-body text-white/45 text-base leading-relaxed max-w-[40ch] mb-10">
                Çoğu insan yıllarını hak ettikleri spor salonunu düşünerek geçirir.
                SporAirFitness üyeleri sadece gelir. Tek bir ücretsiz ders. Hepsi bu.
              </p>

              <ul className="space-y-3 mb-10">
                {PERKS.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 size={14} className="text-[#facc15] mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-white/50">{p}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Trust row */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/[0.07]">
                {[["500+", "Üye"], ["★ 4.9", "Google"], ["8 yıl", "Tecrübe"]].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-display text-2xl text-white">{v}</div>
                    <div className="font-body text-[10px] text-white/30 uppercase tracking-widest">{l}</div>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* Right — form */}
          <BlurFade delay={0.15}>
            <div className="bg-[#111111] border border-white/[0.07] p-8 md:p-10 relative">
              {/* Corner detail */}
              <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 border-[#facc15]" aria-hidden />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <h3 className="font-display text-2xl md:text-3xl text-white tracking-[0.12em] uppercase mb-7">
                      Tanışma Dersi Ayırt
                    </h3>

                    {[
                      { key: "name",  label: "Ad Soyad",        type: "text",  placeholder: "Ahmet Yılmaz", id: "cta-name" },
                      { key: "email", label: "E-posta Adresi",  type: "email", placeholder: "ahmet@firma.com", id: "cta-email" },
                    ].map((f) => (
                      <div key={f.key}>
                        <label htmlFor={f.id} className="font-body text-[10px] text-white/40 uppercase tracking-[0.3em] block mb-2">
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          type={f.type}
                          required
                          value={form[f.key as "name" | "email"]}
                          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                          placeholder={f.placeholder}
                          className="w-full bg-[#1a1a1a] border border-white/[0.08] focus:border-[#facc15] outline-none px-4 py-3.5 font-body text-sm text-white placeholder-white/15 transition-colors duration-150"
                        />
                      </div>
                    ))}

                    <div>
                      <label htmlFor="cta-goal" className="font-body text-[10px] text-white/40 uppercase tracking-[0.3em] block mb-2">
                        Ana Hedef
                      </label>
                      <select
                        id="cta-goal"
                        required
                        value={form.goal}
                        onChange={(e) => setForm({ ...form, goal: e.target.value })}
                        className="w-full bg-[#1a1a1a] border border-white/[0.08] focus:border-[#facc15] outline-none px-4 py-3.5 font-body text-sm text-white transition-colors duration-150 appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Hedefinizi seçin</option>
                        <option value="strength">Kuvvet & Kas Geliştirme</option>
                        <option value="fatloss">Yağ Yakımı & Vücut Kompozisyonu</option>
                        <option value="performance">Atletik Performans</option>
                        <option value="mobility">Mobilite & Sakatlık Rehabilitasyonu</option>
                        <option value="endurance">Dayanıklılık & Kondisyon</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group w-full flex items-center justify-center gap-3 bg-[#facc15] text-[#0a0a0a] font-display text-sm tracking-[0.18em] uppercase py-5 mt-2 hover:bg-[#fafaf5] transition-colors duration-150 disabled:opacity-60"
                    >
                      {loading ? "Ayırtılıyor..." : "Ücretsiz Dersi Al"}
                      {!loading && (
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
                      )}
                    </button>

                    <p className="font-body text-[10px] text-white/35 text-center">
                      Kart gerekmez. Spam yok. İstediğiniz zaman çıkın.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                    className="py-14 text-center"
                  >
                    <div className="w-14 h-14 bg-[#facc15] flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={24} className="text-[#0a0a0a]" />
                    </div>
                    <h3 className="font-display text-4xl text-white tracking-[0.1em] uppercase mb-3">
                      Kaydın Alındı.
                    </h3>
                    <p className="font-body text-white/45 text-sm leading-relaxed max-w-[28ch] mx-auto">
                      Onay için <strong className="text-white">{form.email}</strong> adresinizi
                      kontrol edin. Stüdyoda görüşürüz.
                    </p>
                    <div className="mt-8 pt-8 border-t border-white/[0.07]">
                      <div className="font-body text-[9px] text-white/20 uppercase tracking-[0.3em] mb-2">
                        Yanınızda getirin
                      </div>
                      <p className="font-body text-sm text-white/40">
                        Spor kıyafetleri, su ve hırs. Gerisini biz hallederiz.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
