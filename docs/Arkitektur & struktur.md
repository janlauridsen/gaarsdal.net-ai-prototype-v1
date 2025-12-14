🔹 TRIN 1 – Arkitektur & struktur (før kode)

Målet med dette trin er udelukkende at fastlægge:

systemets bestanddele

ansvar

dataflow

klare grænser

👉 Ingen kode endnu.
👉 Dette er arkitekturskelettet, som alt andet bygges ovenpå.

1️⃣ Overordnet arkitektur (mental model)

Systemet består af fire meget enkle lag:

[ Client / UI ]
       ↓
[ Vercel Edge Function ]
       ↓
[ AI Model Adapter ]
       ↓
[ Redis (Session + Memory) ]
       ↑
[ Statisk Hypnoterapi Data ]


Ingen skjulte lag. Ingen magi.

2️⃣ Komponenter & ansvar
🔹 1. Client / UI

Ansvar:

Vise chat

Sende brugerens input

Modtage svar

Bevidste fravalg:

Ingen logik

Ingen viden

Ingen sessionstyring

👉 UI er dumt og udskifteligt.

🔹 2. Vercel Edge Function (kernen)

Ansvar:

Modtage brugerinput

Identificere session

Hente relevant session-hukommelse (Redis)

Sammensætte prompt (roller + regler + data)

Kalde AI-model

Gemme nyt svar i session-hukommelse

Returnere svar til klienten

👉 Dette er det eneste sted, hvor “intelligens” bor.

🔹 3. AI Model Adapter (abstraktion)

Ansvar:

Ét ensartet interface til AI-model

Ingen forretningslogik

Ingen domæneviden

Hvorfor?

Model-agnostisk design

Let at skifte model senere uden arkitekturændringer

🔹 4. Redis (Upstash) – Session & hukommelse

Indeholder:

Session-ID

Chat-historik (begrænset)

Timestamps

TTL = 7 dage

Bevidste fravalg:

Ingen langtidsviden

Ingen embeddings (endnu)

Ingen brugerprofiler

🔹 5. Statisk hypnoterapi-indhold

Form:

Manuel tekst

Lokal fil (fx JSON eller MD)

Indlæses i edge function

Ansvar:

Eneste videnskilde

Bruges i prompten (RAG-light)

3️⃣ Dataflow (trin for trin)

Bruger skriver besked

UI sender:

message

session-id (eller får et nyt)

Edge Function:

henter session fra Redis

henter relevant statisk tekst

bygger prompt:

systemrolle

sikkerhedsregler

hypnoterapi-indhold

session-kontekst

brugerinput

AI-model returnerer svar

Edge Function:

gemmer nyt turn i Redis

returnerer svar til UI

4️⃣ Prompt-struktur (konceptuelt – ikke tekst endnu)

Prompten er komponeret, ikke monolitisk:

System Role

“Du er en hypnoterapeutisk chatbot…”

Safety & Ethics Block

Ingen diagnose

Ingen løfter

Domain Knowledge Block

Kun tekst fra gaarsdal.net

Session Context

Udvalgte tidligere turns

User Input

👉 Let at ændre ét lag uden at røre resten.

5️⃣ Bevidste udeladelser (meget vigtige)

I TRIN 1 bygger vi ikke:

UI-design

Embeddings / vector search

Automatisk dokumentudvælgelse

Eval-setup

Multi-mode routing

Tool-calling

Logging/analytics

Dette er et valg, ikke en mangel.

6️⃣ Output af TRIN 1

Når dette trin er godkendt, har vi:

En klar systemarkitektur

Klare ansvarsområder

Et fast dataflow

Et fundament der kan kodes uden overraskelser
