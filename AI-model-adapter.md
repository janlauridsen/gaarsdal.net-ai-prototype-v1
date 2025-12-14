AI-model-adapter (model-agnostisk)

Formål med TRIN 6:
At indføre ét, rent interface til en AI-model, sådan at:

resten af systemet er ligeglad med hvilken model der bruges

modellen kan skiftes senere uden arkitekturændring

al model-specifik kode er isoleret ét sted

👉 Ingen routing
👉 Ingen modes
👉 Ingen tool-calling
👉 Kun “prompt ind → tekst ud”

1️⃣ Designprincip

Adapteren skal:

tage én færdig prompt (string)

returnere én tekst (string)

skjule alle detaljer om API, SDK, headers osv.

Alt andet er støj.

2️⃣ Bevidst valg (i denne iteration)

Vi bruger én model

Ingen streaming

Ingen temperature-styring

Ingen retries

Ingen fallback-modeller

👉 Det er lærings- og arkitekturprototype, ikke robust drift.

3️⃣ Miljøvariabel

I .env.example (udvidelse):

OPENAI_API_KEY=


(Selvom arkitekturen er model-agnostisk, skal vi vælge én konkret model for at kunne køre noget.)

4️⃣ Kode: /lib/ai/adapter.ts

Dette er hele adapteren.

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateResponse(
  prompt: string
): Promise<string> {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message?.content ?? "";
}


👉 Bemærk:

Resten af systemet ved intet om OpenAI

Udskiftning = ændr denne fil, intet andet

5️⃣ Kendte begrænsninger (accepterede)

Prompt sendes som én system-besked

Ingen rolle-separation (system/user)

Ingen token-kontrol

Ingen fejl-håndtering

Alt dette kan komme senere, uden arkitekturændring.

6️⃣ Output af TRIN 6

Efter dette trin har du:

En fungerende AI-abstraktion

Ét stabilt kald: generateResponse(prompt)

Et system klar til at blive koblet sammen
