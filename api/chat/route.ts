import { NextRequest, NextResponse } from "next/server";
import { getSession, appendToSession } from "@/lib/memory/redis";

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

  // 1. Hent eksisterende session (bruges ikke endnu, men bevidst læst)
  await getSession(sessionId);

  // 2. Gem brugerens besked
  await appendToSession(sessionId, {
    role: "user",
    content: message,
    timestamp: Date.now(),
  });

  // 3. Midlertidigt statisk svar (placeholder)
  const reply = "Tak for din besked.";

  // 4. Gem assistant-svar
  await appendToSession(sessionId, {
    role: "assistant",
    content: reply,
    timestamp: Date.now(),
  });

  // 5. Returner svar
  return NextResponse.json({
    reply,
  });
}
