import { systemPrompt } from "./system";
import { ethicsPrompt } from "./ethics";
import { HYPNOSIS_DOMAIN_DATA } from "@/lib/data/hypnosis";

export function basePrompt(): string {
  return [
    systemPrompt(),
    ethicsPrompt(),
    HYPNOSIS_DOMAIN_DATA,
  ].join("\n\n");
}
