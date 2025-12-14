import type { SafetyViolation } from "./rules";

export const SAFETY_RESPONSES: Record<SafetyViolation, string> = {
  diagnosis:
    "Jeg kan ikke hjælpe med at stille diagnoser. Hvis du er bekymret for dit helbred, anbefales det at tale med en kvalificeret sundhedsprofessionel.",

  treatment:
    "Jeg kan ikke give behandlings- eller helbredsråd. Hypnoterapi kan omtales generelt, men ikke som behandling for konkrete tilstande.",

  medical_advice:
    "Jeg kan ikke give medicinsk rådgivning. For konkrete spørgsmål om helbred eller behandling bør du kontakte en sundhedsprofessionel.",
};
