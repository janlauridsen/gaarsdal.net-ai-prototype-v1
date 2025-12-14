# ARCHITECTURE  
## AI Hypnoterapi Chatbot – Referencearkitektur

Dette dokument beskriver den **faktiske arkitektur** for AI Hypnoterapi Chatbot-prototypen.

Formålet er at:
- fastholde arkitektoniske beslutninger
- fungere som teknisk reference
- sikre konsistens på tværs af iterationer og udviklingstråde

Dette dokument er **normativt**:  
Hvis kode og arkitektur divergerer, er det en fejl.

---

## 1. Arkitekturprincipper

Arkitekturen følger en **Minimal Viable State-of-the-Art** tilgang:

- Moderne designprincipper
- Bevidst lav kompleksitet
- Klar ansvarsadskillelse
- Ingen skjulte abstraheringer

Projektet prioriterer:
> forståelse, stabilitet og genbrug frem for features og performance

---

## 2. Fast stack (låst)

Arkitekturen er bundet til følgende stack:

- GitHub – versionering
- Vercel – hosting + Edge Functions
- Upstash (Redis) – session-hukommelse (TTL 7 dage)
- Cloud-only arkitektur

Der må **ikke** introduceres:
- nye services
- nye databaser
- nye orkestreringslag
uden eksplicit arkitekturændring.

---

## 3. Overordnet systemoversigt

Systemet består af få, klart definerede komponenter:

[ Client / UI ]
↓
[ Vercel Edge Function ]
↓
[ Prompt-komposition ]
↓
[ AI-model-adapter ]
↓
[ Redis (Session State) ]

[ Statisk Hypnoterapi Data ]
↘ (prompt-injektion)

yaml
Kopier kode

Der er **ét entrypoint** til systemet: `/api/chat`.

---

## 4. Komponenter & ansvar

### 4.1 Client / UI
**Ansvar:**
- Indsamle brugerinput
- Vise chatbot-svar
- Håndtere session-id

**Bevidste fravalg:**
- Ingen forretningslogik
- Ingen AI-viden
- Ingen session-intelligens

UI er bevidst “dumt”.

---

### 4.2 Chat Endpoint (Vercel Edge Function)
**Placering:** `/api/chat/route.ts`

**Ansvar:**
- Modtage requests
- Håndtere session-id
- Hente og opdatere session-hukommelse
- Sammensætte prompt
- Kalde AI-model
- Returnere svar

Dette er systemets **orkestrerende kerne**.

---

### 4.3 Prompt-komposition
**Placering:** `/lib/prompts/`

Prompten bygges dynamisk af følgende lag:

1. System-rolle
2. Etiske og faglige begrænsninger
3. Statisk domæneviden (hypnoterapi)
4. Session-kontekst
5. Brugerens input

Hvert lag er isoleret i egen fil for:
- læsbarhed
- kontrolleret iteration
- lav kobling

---

### 4.4 AI-model-adapter
**Placering:** `/lib/ai/adapter.ts`

**Ansvar:**
- Én funktion: prompt → tekst
- Skjule model- og API-detaljer
- Muliggøre modeludskiftning uden arkitekturændring

Resten af systemet er **model-agnostisk**.

---

### 4.5 Session-hukommelse (Redis)
**Placering:** `/lib/memory/redis.ts`

**Indhold:**
- Session-ID
- Liste af chat-turns
- Timestamp pr. turn
- TTL: 7 dage

**Bevidste fravalg:**
- Ingen langtidsviden
- Ingen brugerprofiler
- Ingen summarization (endnu)

---

### 4.6 Statisk domæneviden
**Placering:** `/lib/data/hypnosis.ts`

**Karakteristika:**
- Manuel udvælgelse
- Kun indhold fra gaarsdal.net
- Kun hypnoterapi-relateret indhold
- Versioneret i Git

Dette er chatbotten **eneste videnskilde**.

---

## 5. Dataflow (runtime)

1. Bruger sender besked
2. Client kalder `/api/chat`
3. Session hentes fra Redis
4. Brugerens besked gemmes
5. Prompt sammensættes
6. AI-model genererer svar
7. Svar gemmes i session
8. Svar returneres til client

Der findes ingen alternative flows.

---

## 6. Bevidste arkitektoniske fravalg

I første iteration er følgende **bevidst udeladt**:

- Fine-tuning
- Autonome agent-teams
- Tool-calling
- Eval-pipelines
- Embeddings / vector search
- Automatisk dataudtræk
- Streaming responses
- Autentifikation
- Rate limiting
- Produktionssikkerhed

Disse kan tilføjes senere **uden at bryde arkitekturen**.

---

## 7. Iterationsstrategi

Arkitekturen understøtter:
- små, kontrollerede ændringer
- udvidelse med flere modes
- genbrug til andre terapeuter/domæner

Regel:
> Kun én arkitektonisk ændring pr. iteration.

---

## 8. Dokumentets rolle

Dette dokument fungerer som:
- teknisk kontrakt
- arkitektur-reference
- kontekst-anker ved nye udviklingstråde

Ændringer i arkitekturen kræver:
- eksplicit beslutning
- opdatering af dette dokument

---

## Status

Arkitekturen er:
- komplet
- konsistent
- bevidst begrænset

Formålet er læring, ikke produktion.

