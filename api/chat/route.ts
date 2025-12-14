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

const debugEvents: ObservabilityEvent[] = [];

function logEvent(event: ObservabilityEvent) {
  if (!OBSERVABILITY_ENABLED) return;
  debugEvents.push(event);
  console.log("[obs]", event);
}

export async function POST(req: NextRequest) {
  debugEvents.length = 0; // reset per request

  const body = await req.json();
  const { sessionId, message } = body;

  if (!sessionId || !message) {
    return NextResponse.json(
      { error: "Missing sessionId or message" },
      { status: 400 }
    );
  }

  logEvent({ type: "session_start", sessionId });

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

    return NextResponse.json({
      reply,
      debug: {
        safetyViolation: violation,
        events: debugEvents,
      },
    });
  }

  const session = await getSession(sessionId);

  const selectedSections = selectHypnosisSections(
    HYPNOSIS_SECTIONS,
    message
  );

  logEvent({
    type: "rag_selection",
    sessionId,
    sectionIds: selectedSections.map((s) => s.id),
  });

  const prompt = [
    basePrompt(session, selectedSections),
    `Brugerens besked:\n${message}`,
  ].join("\n\n");

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

  return NextResponse.json({
    reply: result.text,
    debug: {
      ragSectionIds: selectedSections.map((s) => s.id),
      events: debugEvents,
    },
  });
}
