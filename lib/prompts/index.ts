import { systemPrompt } from "./system";
import { ethicsPrompt } from "./ethics";
import { sessionPrompt } from "./session";
import { domainPrompt } from "./domain";
import type { ChatTurn } from "@/lib/memory/redis";
import type { HypnosisSection } from "@/lib/data/hypnosis";
import { CONTACT_INFO } from "@/lib/data/contact";

export function basePrompt(
  turns: ChatTurn[] = [],
  sections: HypnosisSection[] = []
): string {
  return [
    systemPrompt(),
    ethicsPrompt(),
    domainPrompt(sections),
    sessionPrompt(turns),
  ]
    .filter(Boolean)
    .join("\n\n");
}
