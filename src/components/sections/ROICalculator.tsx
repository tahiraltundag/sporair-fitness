"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlurFade } from "@/components/ui/BlurFade";
import { NumberTicker } from "@/components/ui/NumberTicker";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { ArrowRight } from "lucide-react";
import {
  type RoiInputs,
  DEFAULT_INPUTS,
  calculateRoi,
  isFormComplete,
  loadInputs,
  saveInputs,
} from "@/lib/roi";

/* ─── Helpers ───────────────────────────────────────────────────── */

function updateField<K extends keyof RoiInputs>(
  setInputs: React.Dispatch<React.SetStateAction<RoiInputs>>,
  key: K,
  value: RoiInputs[K],
) {
  setInputs((prev) => ({ ...prev, [key]: value }));
}

/* ─── Sub-components ────────────────────────────────────────────── */

function SectionLabel() {
  return (
    <div className="flex items-center gap-4 mb-5">
      <div className="w-10 h-px bg-[#facc15]" />
      <span className="font-body text-[#facc15] text-[10px] tracking-[0.4em] uppercase">
        &quot;Performance ROI&quot;
      </span>
    </div>
  );
}

function InputLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="font-body text-[9px] text-white/25 uppercase tracking-[0.3em] block mb-2">
      {children}
    </label>
  );
}

const baseInput =
  "w-full bg-[#1a1a1a] border border-white/[0.08] focus:border-[#facc15] outline-none px-4 py-3.5 font-body text-sm text-white placeholder-white/15 transition-colors duration-150";

/* ─── Main Component ────────────────────────────────────────────── */

export function ROICalculator() {
  const [inputs, setInputs] = useState<RoiInputs>(() => loadInputs());
  const [results, setResults] = useState<ReturnType<typeof calculateRoi> | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);

  // Real-time recalculation
  useEffect(() => {
    if (isFormComplete(inputs)) {
      setResults(calculateRoi(inputs));
      setHasCalculated(true);
    }
  }, [inputs]);

  // Debounced localStorage persistence (500ms)
  useEffect(() => {
    const id = setTimeout(() => saveInputs(inputs), 500);
    return () => clearTimeout(id);
  }, [inputs]);

  const r = results;

  return (
    <section id="roi" className="bg-[#27272a] relative overflow-hidden">
      {/* Top rule */}
      <div className="absolute top-0 inset-x-0 h-px bg-[#facc15]/20" />

      {/* Diagonal hatch texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent 0px, transparent 36px, rgba(250,204,21,0.018) 36px, rgba(250,204,21,0.018) 37px)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        {/* Section label */}
        <BlurFade>
          <SectionLabel />
        </BlurFade>

        {/* Headline */}
        <BlurFade delay={0.08}>
          <h2
            className="font-display uppercase leading-[0.88] tracking-tight text-white mb-4"
            style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)" }}
          >
            CALCULATE YOUR
            <br />
            <span className="text-[#facc15]">TRANSFORMATION</span>
          </h2>
        </BlurFade>

        <BlurFade delay={0.14}>
          <p className="font-body text-white/40 text-base max-w-lg leading-relaxed mb-16">
            Understand the real value of your investment. Time, health, productivity —
            quantified. Adjust the sliders below to see your personalised projection.
          </p>
        </BlurFade>

        {/* Content frame */}
        <BlurFade delay={0.2}>
          <div className="relative border border-white/10 border-dashed">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#facc15]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#facc15]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#facc15]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#facc15]" />

            <div className="p-6 md:p-10 lg:p-12">
              {/* ═══ FORM ZONE ═══ */}
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
                {/* Current weight */}
                <div>
                  <InputLabel>Current Weight (kg)</InputLabel>
                  <input
                    type="number"
                    min={40}
                    max={200}
                    value={inputs.currentWeight}
                    onChange={(e) =>
                      updateField(setInputs, "currentWeight", Number(e.target.value) || 40)
                    }
                    className={baseInput}
                    aria-label="Current weight in kilograms"
                  />
                </div>

                {/* Target weight */}
                <div>
                  <InputLabel>Target Weight (kg)</InputLabel>
                  <input
                    type="number"
                    min={40}
                    max={200}
                    value={inputs.targetWeight}
                    onChange={(e) =>
                      updateField(setInputs, "targetWeight", Number(e.target.value) || 40)
                    }
                    className={baseInput}
                    aria-label="Target weight in kilograms"
                  />
                </div>

                {/* Activity level — radio-style buttons */}
                <div className="sm:col-span-2">
                  <InputLabel>Current Activity Level</InputLabel>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {([
                      ["sedentary", "Sedentary", "Desk job, no exercise"],
                      ["light", "Light", "1–2 workouts/wk"],
                      ["moderate", "Moderate", "3–4 workouts/wk"],
                      ["veryActive", "Very Active", "5+ workouts/wk"],
                    ] as const).map(([val, label, desc]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() =>
                          updateField(setInputs, "activityLevel", val)
                        }
                        className={`text-left px-4 py-3 border transition-colors duration-150 ${
                          inputs.activityLevel === val
                            ? "border-[#facc15] bg-[#facc15]/10 text-white"
                            : "border-white/[0.08] bg-[#1a1a1a] text-white/40 hover:border-white/20"
                        }`}
                        aria-pressed={inputs.activityLevel === val}
                      >
                        <div className="font-body text-xs font-medium">{label}</div>
                        <div className="font-body text-[10px] text-white/25 mt-0.5">{desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Training frequency — slider */}
                <div className="sm:col-span-2">
                  <div className="flex items-end justify-between mb-2">
                    <InputLabel>Training Sessions / Week</InputLabel>
                    <span className="font-display text-2xl text-[#facc15] tabular-nums">
                      {inputs.sessionsPerWeek}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={7}
                    step={1}
                    value={inputs.sessionsPerWeek}
                    onChange={(e) =>
                      updateField(setInputs, "sessionsPerWeek", Number(e.target.value))
                    }
                    className="roi-slider w-full"
                    aria-label="Training sessions per week"
                  />
                  <div className="flex justify-between mt-1.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => updateField(setInputs, "sessionsPerWeek", n)}
                        className={`font-body text-[10px] w-6 h-6 flex items-center justify-center transition-colors ${
                          inputs.sessionsPerWeek === n
                            ? "text-[#facc15]"
                            : "text-white/20 hover:text-white/40"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Session price — toggle */}
                <div className="sm:col-span-2">
                  <InputLabel>Session Price</InputLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      ["single", "€60 Single Session"],
                      ["tenPack", "€450 10-Pack (€45/session)"],
                    ] as const).map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => updateField(setInputs, "pricingTier", val)}
                        className={`px-4 py-3.5 font-body text-sm transition-colors duration-150 ${
                          inputs.pricingTier === val
                            ? "bg-[#facc15] text-[#0a0a0a] font-medium"
                            : "bg-[#1a1a1a] border border-white/[0.08] text-white/50 hover:border-white/20"
                        }`}
                        aria-pressed={inputs.pricingTier === val}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job type — select */}
                <div>
                  <InputLabel>Job Type</InputLabel>
                  <select
                    value={inputs.jobType}
                    onChange={(e) =>
                      updateField(setInputs, "jobType", e.target.value as RoiInputs["jobType"])
                    }
                    className={`${baseInput} appearance-none cursor-pointer`}
                    aria-label="Job type"
                  >
                    <option value="desk">Desk job (low physical demand)</option>
                    <option value="active">Active job (moderate physical demand)</option>
                    <option value="manual">Manual labor (high physical demand)</option>
                  </select>
                </div>

                {/* Annual salary */}
                <div>
                  <InputLabel>Annual Salary (€)</InputLabel>
                  <input
                    type="number"
                    min={0}
                    max={10_000_000}
                    value={inputs.annualSalary}
                    onChange={(e) =>
                      updateField(setInputs, "annualSalary", Number(e.target.value) || 0)
                    }
                    className={baseInput}
                    aria-label="Annual salary in euros"
                  />
                </div>
              </div>

              {/* ═══ RESULTS ZONE ═══ */}
              <AnimatePresence mode="wait">
                {hasCalculated && r && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                  >
                    {/* Divider */}
                    <div className="mt-12 mb-10 h-px bg-white/[0.06]" />

                    {/* Hero number */}
                    <div className="text-center mb-12">
                      <div className="font-body text-[9px] text-white/25 uppercase tracking-[0.3em] mb-3">
                        5-Year Net ROI
                      </div>
                      <div
                        className="font-display text-[#facc15] leading-[0.85]"
                        style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
                      >
                        <NumberTicker
                          key={Math.round(r.netRoi / 50)}
                          value={Math.round(r.netRoi)}
                          prefix="€"
                          decimalPlaces={0}
                        />
                      </div>
                    </div>

                    {/* Metric card grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
                      {([
                        {
                          label: "Time to Goal",
                          value: r.monthsToGoal,
                          prefix: "",
                          suffix: " months",
                          decimals: 1,
                        },
                        {
                          label: "Total Investment",
                          value: r.totalInvestment,
                          prefix: "€",
                          suffix: "",
                          decimals: 0,
                        },
                        {
                          label: "Annual Benefit",
                          value: r.totalBenefitFiveYear / 5,
                          prefix: "€",
                          suffix: "/yr",
                          decimals: 0,
                        },
                        {
                          label: "ROI Return",
                          value: r.roiPercentage,
                          prefix: "",
                          suffix: "%",
                          decimals: 0,
                        },
                      ] as const).map(({ label, value, prefix, suffix, decimals }, i) => (
                        <motion.div
                          key={label}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.1 + i * 0.06,
                            duration: 0.35,
                            ease: [0.25, 0.4, 0.25, 1],
                          }}
                          className="bg-[#0a0a0a] border border-white/[0.06] p-5 md:p-6 hover:-translate-y-px transition-transform duration-200"
                        >
                          <div className="font-body text-[9px] text-white/25 uppercase tracking-[0.25em] mb-3">
                            {label}
                          </div>
                          <div className="font-display text-xl md:text-2xl text-[#facc15]">
                            <NumberTicker
                              key={Math.round(value / 10)}
                              value={value}
                              prefix={prefix}
                              suffix={suffix}
                              decimalPlaces={decimals}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hidden benefits editorial list */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                      className="border-l-2 border-[#facc15]/20 pl-5 md:pl-7 space-y-5 mb-10"
                    >
                      <div className="font-body text-[9px] text-[#facc15]/60 uppercase tracking-[0.25em] mb-3">
                        Hidden Benefits Beyond Money
                      </div>

                      <BenefitItem
                        title="Workplace Productivity"
                        body={`Regular exercise is linked to a ${Math.round(PRODUCTIVITY_BOOST * 100)}% boost in workplace productivity, translating to €${Math.round(r.productivityGainAnnual).toLocaleString("de-DE")}/yr in your case.`}
                        source="Harvard Business Review"
                      />

                      <BenefitItem
                        title="Long-Term Health"
                        body={`Active adults face ${Math.round(CHRONIC_DISEASE_RISK_REDUCTION * 100)}% lower chronic disease risk, saving an estimated €${Math.round(r.healthcareSavingsAnnual).toLocaleString("de-DE")}/yr in healthcare costs.`}
                        source="World Health Organization"
                      />

                      <BenefitItem
                        title="Mental Resilience"
                        body={`Consistent training reduces depression and anxiety risk by ~${Math.round(MENTAL_HEALTH_RISK_REDUCTION * 100)}%, with measurable quality-of-life and financial upside.`}
                        source="Lancet Psychiatry"
                      />

                      <BenefitItem
                        title="Break-Even Point"
                        body={`Your investment pays itself back in approximately ${r.breakEvenMonths < 1 ? "under a month" : `${Math.round(r.breakEvenMonths)} months`}. Everything after that is pure return — in energy, confidence, and longevity.`}
                        source="McKinsey Health Institute"
                      />
                    </motion.div>

                    {/* CTA button */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
                    >
                      <a href="#cta">
                        <ShimmerButton
                          shimmerColor="#facc15"
                          background="#facc15"
                          className="w-full font-display text-sm tracking-[0.18em] py-5"
                        >
                          BOOK YOUR FIRST SESSION — €60
                          <ArrowRight size={14} className="ml-2" />
                        </ShimmerButton>
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer attribution */}
              <div className="mt-10 font-body text-[10px] text-white/15 tracking-[0.25em] uppercase text-center">
                Calculations based on ACSM, WHO, HBR &amp; McKinsey research
              </div>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

/* ─── Benefit list item ─────────────────────────────────────────── */
function BenefitItem({
  title,
  body,
  source,
}: {
  title: string;
  body: string;
  source: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-3 h-px bg-[#facc15] shrink-0" />
        <span className="font-body text-sm text-white/70 font-medium">{title}</span>
      </div>
      <p className="font-body text-sm text-white/40 leading-relaxed ml-5">{body}</p>
      <p className="font-body text-[9px] text-white/15 mt-0.5 ml-5">Source: {source}</p>
    </div>
  );
}

// Re-export constants for the benefit item to reference
const PRODUCTIVITY_BOOST = 0.21;
const CHRONIC_DISEASE_RISK_REDUCTION = 0.4;
const MENTAL_HEALTH_RISK_REDUCTION = 0.3;
