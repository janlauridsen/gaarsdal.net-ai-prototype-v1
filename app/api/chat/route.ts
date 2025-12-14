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

/**
 * IMPORTANT:
 * - No default export
 * - No top-level async work
 * - Only named HTTP method exports
 */

/* -------------------- observability -------------------- */

const debugEvents: ObservabilityEvent[] = [];

function logEvent(event: ObservabilityEvent) {
  if (!OBSERVABILITY_ENABLED) return;
  debugEvents.push(event);
}

/* -------------------- POST handler -------------------- */

export async function POST(req: NextRequest) {
  debugEvents.length = 0;

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { sessionId, message } = body;

  if (typeof sessionId !== "string" || typeof message !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid sessionId/message" },
      { status: 400 }
    );
  }

  /* ---------- persist user message ---------- */

  await appendToSession(sessionId, {
    role: "user",
    content: message,
    timestamp: Date.now(),
  });

  /* ---------- safety ---------- */

  const violation = checkSafetyViolation(message);

  if (violation) {
    const reply = SAFETY_RESPONSES[violation];

    await appendToSession(sessionId, {
      role: "assistant",
      content: reply,
      timestamp: Date.now(),
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

  return NextResponse.json({
    reply: result.text,
    debug: {
      ragSectionIds: selectedSections.map((s) => s.id),
      events: debugEvents,
    },
  });
}
