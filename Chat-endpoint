Chat-endpoint (samling af det hele)

Formål med TRIN 7:
At bygge én Vercel Edge Function, som:

modtager brugerinput

håndterer session-hukommelse

bygger prompten

kalder AI-modellen

returnerer svaret

👉 Dette er første gang systemet kan “tale”.
👉 Ingen ekstra features. Kun det nødvendige.

1️⃣ Endpoint-kontrakt
Request (POST)
{
  "message": "Brugerens besked",
  "sessionId": "valgfri-session-id"
}

Response
{
  "reply": "Chatbottens svar",
  "sessionId": "session-id"
}


Hvis sessionId mangler:

vi genererer én

returnerer den til klienten

2️⃣ Designvalg (kort)

Én endpoint: /api/chat

Én request-type

Én response-type

Session-ID er klientens ansvar efter første svar

3️⃣ Kode: /api/chat/route.ts

Dette er hele chat-flowet, samlet og læsbart.

import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { getSession, saveTurn } from "@/lib/memory/redis";
import { composePrompt } from "@/lib/prompts/compose";
import { generateResponse } from "@/lib/ai/adapter";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const userMessage: string = body.message;
  let sessionId: string = body.sessionId;

  if (!userMessage) {
    return NextResponse.json(
      { error: "Message is required" },
      { status: 400 }
    );
  }

  if (!sessionId) {
    sessionId = uuidv4();
  }

  // 1. Hent session-hukommelse
  const sessionTurns = await getSession(sessionId);

  // 2. Gem brugerens besked
  await saveTurn(sessionId, {
    role: "user",
    content: userMessage,
    timestamp: Date.now(),
  });

  // 3. Byg prompt
  const prompt = composePrompt(userMessage, sessionTurns);

  // 4. Kald AI-model
  const reply = await generateResponse(prompt);

  // 5. Gem AI-svar
  await saveTurn(sessionId, {
    role: "assistant",
    content: reply,
    timestamp: Date.now(),
  });

  // 6. Returnér svar
  return NextResponse.json({
    reply,
    sessionId,
  });
}

4️⃣ Bevidste fravalg i TRIN 7

Ingen input-validering ud over “message findes”

Ingen rate limiting

Ingen auth

Ingen streaming

Ingen UI

Dette er arkitekturens proof, ikke produktionskode.

5️⃣ Manuel test (meget enkel)

Med curl eller Postman:

curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hvad er hypnoterapi?"
  }'


Andet kald:

curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Kan det hjælpe mig?",
    "sessionId": "<returneret-id>"
  }'

6️⃣ Output af TRIN 7

Efter dette trin har du:

En fuldt fungerende AI-chatbot

Session-hukommelse

Klar domæneafgrænsning

Minimal state-of-the-art arkitektur

👉 Du har nu en komplet referenceprototype.
