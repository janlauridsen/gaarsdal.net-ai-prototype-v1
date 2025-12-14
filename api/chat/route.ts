import { NextRequest, NextResponse } from "next/server";
import { getSession, appendToSession } from "@/lib/memory/redis";
import { basePrompt } from "@/lib/prompts";
import { generateText } from "@/lib/ai/adapter";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId, message } = body;
api/chat/route.ts
  if (!sessionId || !message) {
    return NextResponse.json(
      { error: "Missing sessionId or message" },
      { status: 400 }
    );
  }

  // 1. Hent session
  const session = await getSession(sessionId);

  // 2. Gem brugerens besked
  await appendToSession(sessionId, {
    role: "user",
    content: message,
    timestamp: Date.now(),
  });

  // 3. Sammensæt prompt (inkl. session-kontekst)
  const prompt = [
    basePrompt(session),
    `Brugerens besked:\n${message}`,
  ].join("\n\n");

  // 4. Kald AI-model via adapter
  const result = await generateText({ prompt });

  // 5. Gem assistant-svar
  await appendToSession(sessionId, {
    role: "assistant",
    content: result.text,
    timestamp: Date.now(),
  });

  // 6. Returner svar
  return NextResponse.json({
    reply: result.text,
  });
}
