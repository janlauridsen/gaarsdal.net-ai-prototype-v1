import type { ChatTurn } from "@/lib/memory/redis";

export function sessionPrompt(turns: ChatTurn[]): string {
  if (!turns.length) {
    return "";
  }

  const formatted = turns
    .map((turn) => {
      const label = turn.role === "user" ? "Bruger" : "Assistent";
      return `${label}: ${turn.content}`;
    })
    .join("\n");

  return `
Tidligere samtalekontekst:
${formatted}
`.trim();
}
