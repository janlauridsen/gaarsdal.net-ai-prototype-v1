Prompt-moduler & adfærd (ingen API-kald endnu)

Formål med TRIN 5:
At definere hvordan chatbotten tænker og opfører sig, uden at binde os til en bestemt model.

👉 Vi skriver ingen AI-kald endnu.
👉 Kun prompt-komposition.

1️⃣ Designprincip for prompten

Prompten er:

komponeret, ikke monolitisk

læsbar i kode

let at ændre ét lag ad gangen

hårdt afgrænset fagligt og etisk

Vi bygger den som:

SYSTEM ROLE
↓
SAFETY & ETHICS
↓
DOMAIN KNOWLEDGE
↓
SESSION CONTEXT
↓
USER INPUT

2️⃣ System-rolle

📁 /lib/prompts/system.ts

export const systemPrompt = `
Du er en rolig, professionel og etisk ansvarlig hypnoterapeutisk chatbot.

Du arbejder udelukkende inden for hypnoterapi og relaterede forklaringer.
Du baserer alle dine svar på det vidensgrundlag, du får stillet til rådighed.

Hvis du mangler viden, siger du det ærligt og tydeligt.
Du opfinder aldrig svar.
`.trim();

3️⃣ Safety & etisk afgrænsning

📁 /lib/prompts/safety.ts

export const safetyPrompt = `
VIGTIGE BEGRÆNSNINGER:

- Du stiller aldrig diagnoser.
- Du lover aldrig helbredelse eller behandlingsresultater.
- Du erstatter ikke lægelig, psykiatrisk eller psykologisk behandling.
- Du opfordrer ikke til at stoppe igangværende behandling.
- Hvis brugeren beder om noget uden for dit domæne, forklarer du roligt,
  at du ikke kan hjælpe med det.

Disse begrænsninger må aldrig brydes.
`.trim();

4️⃣ Domæneviden (data-injektion)

📁 /lib/prompts/compose.ts (del 1)

import { hypnosisData } from "../data/hypnosis";

export function buildDomainKnowledge(): string {
  return hypnosisData
    .map(
      (chunk) =>
        `### ${chunk.title}\n${chunk.content}\n(Kilde: ${chunk.source})`
    )
    .join("\n\n");
}


👉 Simpelt. Læsbart. Ingen magi.

5️⃣ Session-kontekst (chat-historik)

📁 /lib/prompts/compose.ts (del 2)

import { ChatTurn } from "../memory/redis";

export function buildSessionContext(turns: ChatTurn[]): string {
  if (!turns.length) return "";

  return turns
    .map((turn) => `${turn.role.toUpperCase()}: ${turn.content}`)
    .join("\n");
}

6️⃣ Prompt-komposition (samling)

📁 /lib/prompts/compose.ts (del 3)

import { systemPrompt } from "./system";
import { safetyPrompt } from "./safety";
import { buildDomainKnowledge, buildSessionContext } from "./compose";

export function composePrompt(
  userInput: string,
  sessionTurns: ChatTurn[]
): string {
  const domainKnowledge = buildDomainKnowledge();
  const sessionContext = buildSessionContext(sessionTurns);

  return `
${systemPrompt}

${safetyPrompt}

VIDENSGRUNDLAG:
${domainKnowledge}

TIDLIGERE SAMTALE:
${sessionContext}

BRUGERENS BESKED:
${userInput}
`.trim();
}

7️⃣ Bevidste fravalg i TRIN 5

Ingen prompt-optimering

Ingen token-kontrol

Ingen system/user-message split

Ingen “few-shot” eksempler

Ingen hallucinations-detektion

Alt kommer senere, hvis nødvendigt.

8️⃣ Output af TRIN 5

Efter dette trin har du:

Klar chatbot-rolle

Klar etisk afgrænsning

Ét samlet prompt-entrypoint

Et system der kun kan svare inden for domænet
