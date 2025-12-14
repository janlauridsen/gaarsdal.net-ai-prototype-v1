import { NextRequest, NextResponse } from "next/server";
import { getSession, appendToSession } from "@/lib/memory/redis";
import { basePrompt } from "@/lib/prompts";
import { generateText } from "@/lib/ai/adapter";
import { HYPNOSIS_SECTIONS } from "@/lib/data/hypnosis";
import { selectHypnosisSections } from "@/lib/data/selectHypnosisSections";
import { checkSafetyViolation } from "@/lib/safety/rules";
import { SAFETY_RESPONSES } from "@/lib/safety/responses";
import type { ObservabilityEvent } from "@/lib/observability/events";
import { OBSERVABILITY_ENABLED } from "@/lib/observability/config";

export const runtime = "edge";

function logEvent(event: ObservabilityEvent) {
  if (!OBSERVABILITY_ENABLED) return;
  console.log("[obs]", event);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId, message } = body;

  if (!sessionId || !message) {
    return NextResponse.json(
      { error: "Missing sessionId or message" },
      { status: 400 }
    );
  }

  logEvent({ type: "session_start", sessionId });

  // 1. Gem brugerens besked
  await appendToSession(sessionId, {
    role: "user",
    content: message,
    timestamp: Date.now(),
  });

  logEvent({
    type: "user_message",
    sessionId,
    messageLength: message.length,
  });

  // 2. Sikkerhedscheck
  const violation = checkSafetyViolation(message);

  if (violation) {
    logEvent({
      type: "safety_violation",
      sessionId,
      violationType: violation,
    });

    const reply = SAFETY_RESPONSES[violation];

    await appendToSession(sessionId, {
      role: "assistant",
      content: reply,
      timestamp: Date.now(),
    });

    logEvent({
      type: "assistant_response",
      sessionId,
      responseLength: reply.length,
    });

    return NextResponse.json({ reply });
  }

  // 3. Hent session
  const session = await getSession(sessionId);

  // 4. RAG-light udvælgelse
  const selectedSections = selectHypnosisSections(
    HYPNOSIS_SECTIONS,
    message
  );

  logEvent({
    type: "rag_selection",
    sessionId,
    sectionIds: selectedSections.map((s) => s.id),
  });

  // 5. Prompt
  const prompt = [
    basePrompt(session, selectedSections),
    `Brugerens besked:\n${message}`,
  ].join("\n\n");

  // 6. AI-kald
  const result = await generateText({ prompt });

  await appendToSession(sessionId, {
    role: "assistant",
    content: result.text,
    timestamp: Date.now(),
  });

  logEvent({
    type: "assistant_response",
    sessionId,
    responseLength: result.text.length,
  });

  // 7. Returner svar
  return NextResponse.json({
    reply: result.text,
  });
}
