import { systemPrompt } from "./system";
import { ethicsPrompt } from "./ethics";

export function basePrompt(): string {
  return [
    systemPrompt(),
    ethicsPrompt(),
  ].join("\n\n");
}
