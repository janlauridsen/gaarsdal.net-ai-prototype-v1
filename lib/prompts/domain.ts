import { HypnosisSection } from "@/lib/data/hypnosis";

export function domainPrompt(sections: HypnosisSection[]): string {
  if (!sections.length) {
    return "";
  }

  const content = sections.map((s) => s.content).join("\n\n");

  return `
Relevant faglig viden:
${content}
`.trim();
}
