Filstruktur & projekt-skelet (ingen forretningslogik endnu)

Formål med TRIN 2:
At skabe et klart, minimalistisk projektskelet, som:

afspejler arkitekturen 1:1

er let at forstå og udvide

understøtter iteration uden rod

👉 Stadig ingen egentlig AI-logik.
👉 Kun struktur, navngivning og ansvar.

1️⃣ Overordnet princip for struktur

Alt intelligens-arbejde bor i /api

Data er statisk og eksplicit

Prompt og AI er adskilt

Session-hukommelse er isoleret

2️⃣ Foreslået mappestruktur
/project-root
│
├─ /app                # (valgfri) UI – ikke fokus nu
│
├─ /api
│   └─ /chat
│       └─ route.ts    # Edge Function (chat endpoint)
│
├─ /lib
│   ├─ ai
│   │   └─ adapter.ts  # Model-agnostisk AI interface
│   │
│   ├─ prompts
│   │   ├─ system.ts   # Rolle & identitet
│   │   ├─ safety.ts   # Etik & afgrænsning
│   │   └─ compose.ts  # Samler prompten
│   │
│   ├─ memory
│   │   └─ redis.ts    # Session-hukommelse (Upstash)
│   │
│   └─ data
│       └─ hypnosis.ts # Statisk tekst fra gaarsdal.net
│
├─ /docs
│   ├─ PROJECT_BRIEF.md
│   └─ ARCHITECTURE.md
│
├─ .env.example
├─ package.json
└─ README.md

3️⃣ Forklaring pr. hovedområde
🔹 /api/chat/route.ts

Én endpoint

Én ansvarlig indgang til systemet

Ingen domæneviden hardcoded

🔹 /lib/ai/adapter.ts

Ét function-call: generateResponse(prompt)

Skjuler model-specifikke detaljer

Klar til fremtidig udskiftning

🔹 /lib/prompts/

Bevidst opdelt:

system.ts
→ Hvem chatbotten er

safety.ts
→ Hvad chatbotten aldrig gør

compose.ts
→ Samler alle dele til én prompt

🔹 /lib/memory/redis.ts

getSession(sessionId)

saveTurn(sessionId, turn)

TTL = 7 dage

Ingen logik ud over session

🔹 /lib/data/hypnosis.ts

Ren tekst

Ingen parsing-magi

Kun manuelt indhold

4️⃣ Bevidste fravalg i strukturen

Ingen /utils-dump

Ingen globale helpers

Ingen “magic” abstractions

Ingen config-sprawl

Alt skal kunne findes intuitivt.

5️⃣ Output af TRIN 2

Efter dette trin har du:

Et repo, der kan pushes til GitHub

En struktur, der matcher arkitekturen

Et stabilt fundament for kode
