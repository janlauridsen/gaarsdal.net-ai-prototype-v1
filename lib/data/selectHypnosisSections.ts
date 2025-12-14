import { HypnosisSection } from "./hypnosis";

export function selectHypnosisSections(
  sections: HypnosisSection[],
  userInput: string
): HypnosisSection[] {
  const input = userInput.toLowerCase();

  return sections.filter((section) =>
    section.tags.some((tag) => input.includes(tag.toLowerCase()))
  );
}
