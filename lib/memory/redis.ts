import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 dage

function sessionKey(sessionId: string) {
  return `session:${sessionId}`;
}

export async function getSession(
  sessionId: string
): Promise<ChatTurn[]> {
  const data = await redis.get<ChatTurn[]>(sessionKey(sessionId));
  return data ?? [];
}

export async function appendToSession(
  sessionId: string,
  turn: ChatTurn
): Promise<void> {
  const key = sessionKey(sessionId);

  const existing = await getSession(sessionId);
  const updated = [...existing, turn];

  await redis.set(key, updated, {
    ex: SESSION_TTL_SECONDS,
  });
}
