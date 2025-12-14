export type SafetyViolation =
  | "diagnosis"
  | "treatment"
  | "medical_advice";

const DIAGNOSIS_KEYWORDS = [
  "diagnose",
  "diagnosticere",
  "har jeg",
  "lider jeg af",
];

const TREATMENT_KEYWORDS = [
  "behandling",
  "helbrede",
  "kurere",
  "medicin",
  "recept",
];

const MEDICAL_ADVICE_KEYWORDS = [
  "læge",
  "psykiater",
  "psykolog",
  "medicinsk råd",
];

export function checkSafetyViolation(
  input: string
): SafetyViolation | null {
  const text = input.toLowerCase();

  if (DIAGNOSIS_KEYWORDS.some((k) => text.includes(k))) {
    return "diagnosis";
  }

  if (TREATMENT_KEYWORDS.some((k) => text.includes(k))) {
    return "treatment";
  }

  if (MEDICAL_ADVICE_KEYWORDS.some((k) => text.includes(k))) {
    return "medical_advice";
  }

  return null;
}
