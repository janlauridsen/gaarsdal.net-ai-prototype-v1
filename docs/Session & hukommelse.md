Session & hukommelse (Upstash Redis)

Formål med TRIN 3:
At implementere det simpleste mulige, men korrekte session-hukommelseslag:

Én session pr. bruger

Chat-historik gemmes midlertidigt

TTL = 7 dage

Ingen ekstra features

👉 Ingen AI endnu.
👉 Kun hukommelse.

1️⃣ Designbeslutninger (kort)
Session-ID

Genereres på klienten eller ved første request

Behandles som opaque string

Ingen brugeridentitet

Datamodel (meget simpel)

Vi gemmer en liste af turns:

{
  role: "user" | "assistant",
  content: string,
  timestamp: number
}


Sessionen i Redis:

Key: session:{sessionId}

Value: JSON array af turns

TTL: 7 dage

2️⃣ Miljøvariabler

I .env.example:

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=


Ingen andre secrets i dette trin.

3️⃣ Kode: /lib/memory/redis.ts

Dette er hele hukommelseslaget.
Intet mere. Intet mindre.

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
};

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 dage

export async function getSession(sessionId: string): Promise<ChatTurn[]> {
  const key = `session:${sessionId}`;
  const session = await redis.get<ChatTurn[]>(key);
  return session ?? [];
}

export async function saveTurn(
  sessionId: string,
  turn: ChatTurn
): Promise<void> {
  const key = `session:${sessionId}`;

  const session = (await getSession(sessionId)) as ChatTurn[];
  session.push(turn);

  await redis.set(key, session, {
    ex: SESSION_TTL_SECONDS,
  });
}

4️⃣ Bevidste fravalg

Ingen max-length trimming (kommer evt. senere)

Ingen summarization

Ingen brugerprofil

Ingen kryptering

Ingen multi-session per bruger

Dette er den simplest mulige korrekte version.

5️⃣ Test (manuel)

Du kan teste isoleret ved:

at kalde saveTurn(...)

derefter getSession(...)

bekræfte TTL i Upstash UI

Ingen automatiske tests endnu.

6️⃣ Output af TRIN 3

Efter dette trin har du:

Et fungerende session-lag

7 dages hukommelse

Et stabilt fundament for chat-flow
