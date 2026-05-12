/* ─────────────────────────────────────────────────────────────────
   ATLAS ROI Calculator — Pure calculation engine

   Data sources:
   - ACSM: safe weight loss rates (0.5–1.0 kg/week)
   - Harvard Business Review: workplace fitness → +21% productivity
   - WHO: regular exercise → −40% chronic disease risk
   - Lancet Psychiatry: exercise → −30% depression/anxiety risk
   - McKinsey Health Institute: corporate wellness ROI benchmarks
   - OECD: average healthcare cost age 30–50 (~€2,400/yr)
───────────────────────────────────────────────────────────────── */

/* ─── Types ─────────────────────────────────────────────────────── */

export interface RoiInputs {
  currentWeight: number;
  targetWeight: number;
  activityLevel: "sedentary" | "light" | "moderate" | "veryActive";
  sessionsPerWeek: number;
  pricingTier: "single" | "tenPack";
  jobType: "desk" | "active" | "manual";
  annualSalary: number;
}

export interface RoiResults {
  monthsToGoal: number;
  weeksToGoal: number;
  totalInvestment: number;
  productivityGainAnnual: number;
  productivityGainFiveYear: number;
  healthcareSavingsAnnual: number;
  healthcareSavingsFiveYear: number;
  mentalHealthBenefitAnnual: number;
  mentalHealthBenefitFiveYear: number;
  totalBenefitFiveYear: number;
  netRoi: number;
  roiPercentage: number;
  breakEvenMonths: number;
}

/* ─── Constants ─────────────────────────────────────────────────── */

export const DEFAULT_INPUTS: RoiInputs = {
  currentWeight: 80,
  targetWeight: 72,
  activityLevel: "moderate",
  sessionsPerWeek: 3,
  pricingTier: "single",
  jobType: "desk",
  annualSalary: 50000,
};

const STORAGE_KEY = "atlas-roi-inputs";

// ACSM guideline: 0.5–1.0 kg/week safe loss; midpoint used
const SAFE_WEEKLY_LOSS_KG = 0.75;

// Activity level affects metabolic rate and consistency
const ACTIVITY_MULTIPLIER: Record<RoiInputs["activityLevel"], number> = {
  sedentary: 0.7,
  light: 0.85,
  moderate: 1.0,
  veryActive: 1.15,
};

// HBR meta-analysis: fit employees show +21% productivity
export const PRODUCTIVITY_BOOST = 0.21;

// Job-type adjustment: physical jobs already capture some of the fitness dividend
const JOB_TYPE_MULTIPLIER: Record<RoiInputs["jobType"], number> = {
  desk: 1.0, // full 21%
  active: 0.57, // ~12%
  manual: 0.38, // ~8%
};

// WHO: regular exercise → ~40% reduction in chronic disease risk
export const CHRONIC_DISEASE_RISK_REDUCTION = 0.4;
const AVG_ANNUAL_HEALTHCARE_COST = 2400; // EUR, OECD avg age 30–50

// Lancet Psychiatry / McKinsey: ~30% reduction in depression/anxiety
export const MENTAL_HEALTH_RISK_REDUCTION = 0.3;
const AVG_ANNUAL_MENTAL_HEALTH_COST = 1200; // EUR, therapy + medication avoidance

const WEEKS_PER_MONTH = 4.33;
const PROJECTION_YEARS = 5;

/* ─── Helpers ───────────────────────────────────────────────────── */

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/* ─── Calculation ───────────────────────────────────────────────── */

export function calculateRoi(inputs: RoiInputs): RoiResults {
  const {
    currentWeight,
    targetWeight,
    activityLevel,
    sessionsPerWeek,
    pricingTier,
    jobType,
    annualSalary,
  } = inputs;

  // ── A) Time to Goal ──────────────────────────────────────────
  const weightDiff = Math.abs(currentWeight - targetWeight);
  const frequencyMultiplier = 0.6 + sessionsPerWeek * 0.15;
  // 1 session → 0.75x, 4 sessions → 1.20x, 7 sessions → 1.65x
  const weeklyLoss =
    SAFE_WEEKLY_LOSS_KG * ACTIVITY_MULTIPLIER[activityLevel] * frequencyMultiplier;
  const weeksToGoal = weightDiff > 0 ? weightDiff / weeklyLoss : 0;
  const monthsToGoal = weeksToGoal / WEEKS_PER_MONTH;

  // ── B) Total Investment ──────────────────────────────────────
  const pricePerSession = pricingTier === "single" ? 60 : 45; // 450/10
  const totalInvestment = sessionsPerWeek * pricePerSession * weeksToGoal;

  // ── C) Productivity Gain ─────────────────────────────────────
  const effectiveBoost = PRODUCTIVITY_BOOST * JOB_TYPE_MULTIPLIER[jobType];
  const productivityGainAnnual = annualSalary * effectiveBoost;
  const productivityGainFiveYear = productivityGainAnnual * PROJECTION_YEARS;

  // ── D) Healthcare Savings ────────────────────────────────────
  const healthcareSavingsAnnual =
    AVG_ANNUAL_HEALTHCARE_COST * CHRONIC_DISEASE_RISK_REDUCTION; // €960
  const healthcareSavingsFiveYear = healthcareSavingsAnnual * PROJECTION_YEARS;

  // ── E) Mental Health Benefit ─────────────────────────────────
  const mentalHealthBenefitAnnual =
    AVG_ANNUAL_MENTAL_HEALTH_COST * MENTAL_HEALTH_RISK_REDUCTION; // €360
  const mentalHealthBenefitFiveYear = mentalHealthBenefitAnnual * PROJECTION_YEARS;

  // ── F) Final ROI ─────────────────────────────────────────────
  const totalBenefitFiveYear =
    productivityGainFiveYear + healthcareSavingsFiveYear + mentalHealthBenefitFiveYear;
  const netRoi = totalBenefitFiveYear - totalInvestment;
  const roiPercentage =
    totalInvestment > 0 ? (netRoi / totalInvestment) * 100 : 0;
  const monthlyBenefit = totalBenefitFiveYear / (PROJECTION_YEARS * 12);
  const breakEvenMonths =
    monthlyBenefit > 0 ? totalInvestment / monthlyBenefit : 0;

  return {
    monthsToGoal,
    weeksToGoal,
    totalInvestment,
    productivityGainAnnual,
    productivityGainFiveYear,
    healthcareSavingsAnnual,
    healthcareSavingsFiveYear,
    mentalHealthBenefitAnnual,
    mentalHealthBenefitFiveYear,
    totalBenefitFiveYear,
    netRoi,
    roiPercentage,
    breakEvenMonths,
  };
}

/* ─── Validation ────────────────────────────────────────────────── */

export function isFormComplete(inputs: RoiInputs): boolean {
  return (
    inputs.currentWeight >= 40 &&
    inputs.currentWeight <= 200 &&
    inputs.targetWeight >= 40 &&
    inputs.targetWeight <= 200 &&
    inputs.sessionsPerWeek >= 1 &&
    inputs.sessionsPerWeek <= 7 &&
    inputs.annualSalary >= 0 &&
    inputs.annualSalary <= 10_000_000
  );
}

/* ─── localStorage ──────────────────────────────────────────────── */

/** SSR-safe read with shape validation. Falls back to defaults. */
export function loadInputs(): RoiInputs {
  if (typeof window === "undefined") return { ...DEFAULT_INPUTS };

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_INPUTS };
    const parsed = JSON.parse(raw);
    return validateInputs(parsed);
  } catch {
    return { ...DEFAULT_INPUTS };
  }
}

export function saveInputs(inputs: RoiInputs): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
  } catch {
    // quota exceeded — silent fail
  }
}

/** Merge parsed data with defaults, only keeping valid keys */
function validateInputs(raw: Record<string, unknown>): RoiInputs {
  const defaults = { ...DEFAULT_INPUTS };

  if (typeof raw.currentWeight === "number")
    defaults.currentWeight = clamp(raw.currentWeight, 40, 200);
  if (typeof raw.targetWeight === "number")
    defaults.targetWeight = clamp(raw.targetWeight, 40, 200);
  if (
    typeof raw.activityLevel === "string" &&
    ["sedentary", "light", "moderate", "veryActive"].includes(raw.activityLevel)
  )
    defaults.activityLevel = raw.activityLevel as RoiInputs["activityLevel"];
  if (typeof raw.sessionsPerWeek === "number")
    defaults.sessionsPerWeek = clamp(raw.sessionsPerWeek, 1, 7);
  if (typeof raw.pricingTier === "string" && ["single", "tenPack"].includes(raw.pricingTier))
    defaults.pricingTier = raw.pricingTier as RoiInputs["pricingTier"];
  if (
    typeof raw.jobType === "string" &&
    ["desk", "active", "manual"].includes(raw.jobType)
  )
    defaults.jobType = raw.jobType as RoiInputs["jobType"];
  if (typeof raw.annualSalary === "number")
    defaults.annualSalary = clamp(raw.annualSalary, 0, 10_000_000);

  return defaults;
}

/** Format EUR with locale */
export function formatEur(value: number): string {
  return Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Format plain number with locale-separated thousands */
export function formatNumber(value: number, decimals = 1): string {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
