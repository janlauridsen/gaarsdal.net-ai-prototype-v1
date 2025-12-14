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

/* -------------------- observability -------------------- */

const debugEvents: ObservabilityEvent[] = [];

function logEvent(event: ObservabilityEvent) {
  if (!OBSERVABILITY_ENABLED) return;
  debugEvents.push(event);
  console.log("[obs]", event);
}

/* -------------------- route handler -------------------- */

export async function POST(req: NextRequest) {
  debugEvents.length = 0; // reset per request

  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { sessionId, message } = body;

  if (!sessionId || !message) {
    return NextResponse.json(
      { error: "Missing sessionId or message" },
      { status: 400 }
    );
  }

  logEvent({ type: "session_start", sessionId });

  /* ---------- persist user message ---------- */

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

  /* ---------- safety ---------- */

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

  /* ---------- session + RAG ---------- */

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

  /* ---------- prompt ---------- */

  const prompt = [
    basePrompt(session, selectedSections),
    `Brugerens besked:\n${message}`,
  ].join("\n\n");

  /* ---------- AI ---------- */

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
