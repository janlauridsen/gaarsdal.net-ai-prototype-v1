import { NextRequest, NextResponse } from "next/server";
import { getSession, appendToSession } from "@/lib/memory/redis";
import { basePrompt } from "@/lib/prompts";
import { generateText } from "@/lib/ai/adapter";
import { HYPNOSIS_SECTIONS } from "@/lib/data/hypnosis";
import { selectHypnosisSections } from "@/lib/data/selectHypnosisSections";
import { checkSafetyViolation } from "@/lib/safety/rules";
import { SAFETY_RESPONSES } from "@/lib/safety/responses";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId, message } = body;

  if (!sessionId || !message) {
    return NextResponse.json(
      { error: "Missing sessionId or message" },
      { status: 400 }
    );
  }

  // 1. Gem brugerens besked
  await appendToSession(sessionId, {
    role: "user",
    content: message,
    timestamp: Date.now(),
  });

  // 2. Sikkerhedscheck (før AI-kald)
  const violation = checkSafetyViolation(message);

  if (violation) {
    const reply = SAFETY_RESPONSES[violation];

    // Gem afvisning som assistant-svar
    await appendToSession(sessionId, {
      role: "assistant",
      content: reply,
      timestamp: Date.now(),
    });

    return NextResponse.json({ reply });
  }

  // 3. Hent session (til kontekst)
  const session = await getSession(sessionId);

  // 4. RAG-light: vælg relevant domæneviden
  const selectedSections = selectHypnosisSections(
    HYPNOSIS_SECTIONS,
    message
  );

  // 5. Sammensæt prompt
  const prompt = [
    basePrompt(session, selectedSections),
    `Brugerens besked:\n${message}`,
  ].join("\n\n");

  // 6. Kald AI-model via adapter
  const result = await generateText({ prompt });

  // 7. Gem assistant-svar
  await appendToSession(sessionId, {
    role: "assistant",
    content: result.text,
    timestamp: Date.now(),
  });

  // 8. Returner svar
  return NextResponse.json({
    reply: result.text,
  });
}
