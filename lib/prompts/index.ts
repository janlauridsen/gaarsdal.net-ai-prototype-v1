import { systemPrompt } from "./system";
import { ethicsPrompt } from "./ethics";
import { HYPNOSIS_DOMAIN_DATA } from "@/lib/data/hypnosis";
import { sessionPrompt } from "./session";
import type { ChatTurn } from "@/lib/memory/redis";

export function basePrompt(turns: ChatTurn[] = []): string {
  return [
    systemPrompt(),
    ethicsPrompt(),
    HYPNOSIS_DOMAIN_DATA,
    sessionPrompt(turns),
  ]
    .filter(Boolean)
    .join("\n\n");
}
