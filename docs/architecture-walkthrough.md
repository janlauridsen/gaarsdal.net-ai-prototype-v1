# Arkitektur-walkthrough – AI Hypnoterapi Chatbot

Dette dokument er en **forklarende guide** til arkitekturen
bag AI Hypnoterapi Chatbot-prototypen.

Formålet er at gøre arkitekturen let at forstå for:
- nye læsere
- undervisningsbrug
- fremtidig genbrug

Dette dokument **supplerer** `ARCHITECTURE.md`
og gentager ikke alle normative detaljer.

---

## 1. Overblik

Systemet er bygget som et **enkelt request-response flow**
med tydelig ansvarsadskillelse.

Der findes:
- ét UI
- ét API-endpoint
- én AI-modeladapter
- én session-hukommelse

Dette er et bevidst valg for at holde arkitekturen læsbar.

---

## 2. Entry point: Client / UI

**Placering:**  
`/app/page.tsx`

**Ansvar:**
- indsamle brugerinput
- vise svar
- håndtere session-id
- vise debug-metadata (Iteration 8)

UI’en indeholder:
- ingen AI-logik
- ingen prompt-viden
- ingen session-intelligens

UI’en er bevidst “dum”.

---

## 3. API-laget

**Placering:**  
`/api/chat/route.ts`

Dette er systemets **orkestrerende kerne**.

Ansvar:
1. Modtage request
2. Hente og opdatere session i Redis
3. Køre sikkerhedscheck
4. Udvælge domæneviden (RAG-light)
5. Sammensætte prompt
6. Kalde AI-model via adapter
7. Gemme og returnere svar
8. Emitte observability-metadata (valgfrit)

Der findes ingen alternative flows.

---

## 4. Session-hukommelse

**Placering:**  
`/lib/memory/redis.ts`

Sessionen indeholder:
- chat-turns
- roller (user / assistant)
- timestamps
- TTL på 7 dage

Der findes:
- ingen langtidsviden
- ingen brugerprofiler
- ingen summarization

---

## 5. Prompt-komposition

**Placering:**  
`/lib/prompts/`

Prompten bygges i lag:

1. System-rolle
2. Etiske og faglige begrænsninger
3. Statisk domæneviden
4. Session-kontekst
5. Brugerens input

Hvert lag er isoleret i egen fil
for at gøre adfærd tydelig og kontrollerbar.

---

## 6. Domæneviden (RAG-light)

**Placering:**  
`/lib/data/hypnosis.ts`  
`/lib/data/selectHypnosisSections.ts`

Domæneviden er:
- statisk
- manuelt udvalgt
- versionsstyret

Udvælgelsen er:
- deterministisk
- simpel
- uden embeddings

Dette gør RAG-adfærden let at forstå og debugge.

---

## 7. AI-modeladapter

**Placering:**  
`/lib/ai/adapter.ts`

Adapteren har:
- ét ansvar: prompt → tekst
- ét interface

Resten af systemet er model-agnostisk.

---

## 8. Sikkerhed & etik

**Placering:**  
`/lib/safety/`

Systemet håndhæver:
- ingen diagnoser
- ingen behandlings- eller helbredsløfter
- ingen medicinsk rådgivning

Ved overtrædelse:
- afvises request før AI-kald
- standardiseret svar returneres

Dette er bevidst deterministisk.

---

## 9. Observability & debug

**Placering:**  
`/lib/observability/`  
UI-debug i `/app/page.tsx`

Observability er:
- metadata-baseret
- læringsorienteret
- ikke persistent

Debug-information bruges kun til:
- forståelse
- undervisning
- manuel analyse

---

## 10. Iterationstænkning

Arkitekturen er udviklet i afsluttede iterationer.

Hver iteration:
- introducerer ét fokus
- afsluttes eksplicit
- dokumenteres

Dette gør arkitekturen stabil,
selv når projektet ikke længere udvikles.

---

## Afslutning

Arkitekturen er ikke optimeret for:
- performance
- skala
- produktion

Den er optimeret for:
> **forståelse, stabilitet og læring**
