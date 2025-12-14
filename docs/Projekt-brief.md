# PROJECT BRIEF  
## AI Hypnoterapi Chatbot – Lærings- & Arkitekturprototype

## 1. Formål

Dette projekt er en **lærings- og referenceprototype** for en moderne AI-chatbot med fokus på:
- forståelse af state-of-the-art AI-arkitektur
- stabilitet og minimal kompleksitet
- kontrolleret iteration
- genbrugelighed til fremtidige kommercielle løsninger

Prototypen er **ikke et færdigt produkt** og er ikke tiltænkt produktion i denne fase.

---

## 2. Overordnet mål

At bygge en **lille, isoleret AI-chatbot**, der:
- udelukkende arbejder inden for **hypnoterapi**
- baserer al viden på **udvalgt, statisk indhold fra gaarsdal.net**
- har klar faglig og etisk afgrænsning
- er arkitektonisk moderne, men bevidst enkel

---

## 3. Fast stack (må ikke ændres)

Stacken er låst for hele projektet:

- **GitHub** – versionering
- **Vercel** – hosting + edge/functions
- **Upstash (Redis)** – session state og hukommelse (7 dage)
- **Cloud-only arkitektur**

❌ Ingen nye services, tools, platforme eller frameworks må introduceres uden eksplicit beslutning.

---

## 4. Arkitekturprincipper

Vi følger en **Minimal Viable State-of-the-Art Architecture**:

### Ikke tilladt i første iteration
- Ingen autonome agent-teams
- Ingen eval-pipelines
- Ingen fine-tuning
- Ingen kompleks orkestrering

### Påkrævet
- Én klar adfærds-mode: **hypnoterapi**
- Dynamisk, men simpel prompt-komposition
- RAG-klar struktur (lille datasæt)
- Model-agnostisk design
- Session-baseret hukommelse (op til 7 dage)
- Klar sikkerheds- og etisk afgrænsning:
  - ingen diagnose
  - ingen behandlings- eller helbredsløfter

---

## 5. Datagrundlag

### Tilladt data
- **Kun statisk, manuelt udvalgt indhold fra gaarsdal.net**
- **Kun sider relateret til hypnoterapi**

### Ikke tilladt
- Ingen crawling
- Ingen automatiseret scraping
- Ingen eksterne vidensbaser
- Ingen generel verdensviden uden for domænet

Hvis chatbotten mangler viden:
> Den skal tydeligt og ærligt sige, at den ikke har grundlag for at svare.

---

## 6. Funktionelle krav – Første iteration

- Simpel chat-interface (teknisk fokus, ikke UI-polish)
- Session-baseret hukommelse (7 dage)
- Al adfærd begrænset til hypnoterapi
- Klar rolle, tone og sikkerhedsafgrænsning
- Stabil, forudsigelig opførsel

---

## 7. Arbejdsform & proces

- Projektet bygges **trin for trin**
- Ét trin ad gangen
- Arkitektoniske beslutninger dokumenteres
- Efter hvert trin stoppes arbejdet og afventer eksplicit “ok”

### Rollefordeling
- **ChatGPT fungerer som lead engineer og teknisk guide**
- ChatGPT:
  - foreslår næste skridt før kodning
  - holder arkitekturen minimal og stabil
  - skriver nødvendig kode
  - ændrer ikke stack eller arkitektur uden tilladelse

---

## 8. Iterationsstrategi

Arkitekturen skal muliggøre:
- små, kontrollerede iterationer
- fremtidig udvidelse med flere modes
- genbrug til andre terapeuter eller domæner

---

## 9. Gyldighed

Dette dokument fungerer som:
- arkitektonisk kontrakt
- fælles reference
- kontekst-anker på tværs af udviklingstråde

Ændringer kræver eksplicit beslutning.

---

## Iteration 1 – Status

Første iteration er afsluttet med følgende egenskaber:

- Én chat-endpoint (`/api/chat`)
- Session-baseret hukommelse i Redis (TTL 7 dage)
- Klar og isoleret prompt-komposition:
  - systemrolle
  - etik & sikkerhed
  - statisk domæneviden
  - session-kontekst
- Model-agnostisk AI-adapter
- Ingen streaming, ingen RAG, ingen produktsikkerhed

Systemet er arkitektonisk komplet for lærings- og referenceformål.

Videreudvikling kræver eksplicit beslutning og ny iteration.
---

## Iteration 2 – Status

Iteration 2 har udvidet prototypen med følgende, uden arkitekturændringer:

- Rigtig AI-model via adapter (OpenAI Chat Completions)
- Bevarelse af model-agnostisk arkitektur
- End-to-end chatflow:
  - client → api/chat
  - session-hukommelse (Redis)
  - prompt-komposition
  - AI-svar
- Minimal test-UI til manuel afprøvning

Følgende er fortsat bevidst udeladt:
- streaming
- RAG / embeddings
- evaluering
- sikkerhedslag
- produktionsklarhed

Systemet er nu funktionelt som lærings- og referenceprototype.

Videreudvikling kræver eksplicit beslutning og ny iteration.

---

## Iteration 3 – Fokus (Spor C: UI)

Iteration 3 fokuserer på forbedring af test-UI med henblik på:

- bedre synlighed af samtaleforløb
- lettere manuel afprøvning
- tydelig session-håndtering

Iteration 3 introducerer ingen ændringer i:
- arkitektur
- backend-logik
- AI-adfærd
- datagrundlag

UI’en forbliver teknisk og bevidst simpel.

---

## Iteration 3 – Status (Spor C: UI)

Iteration 3 har forbedret den tekniske test-UI uden ændringer i
arkitektur, backend eller AI-adfærd.

Tilføjelser i denne iteration:
- Visning af komplet chat-historik i UI
- Synligt session-id
- Kontrolleret nulstilling af session
- Forbedret manuel testbarhed og gennemsigtighed

Følgende er fortsat bevidst udeladt:
- UI-polish og design
- persistens i klienten
- backend-ændringer
- nye features eller modes

Iteration 3 afsluttes som stabil baseline.
Videreudvikling kræver eksplicit beslutning og ny iteration.

---

## Iteration 4 – Fokus (RAG-light)

Iteration 4 introducerer selektiv brug af statisk domæneviden
baseret på brugerens forespørgsel.

Der anvendes:
- ingen embeddings
- ingen eksterne datakilder
- ingen automatisering

Formålet er læring og arkitektonisk klarhed, ikke optimal retrieval.

---

## Iteration 4 – Status (RAG-light)

Iteration 4 har introduceret selektiv brug af statisk domæneviden
(RAG-light) uden ændringer i arkitektur eller stack.

Tilføjelser i denne iteration:
- Domæneviden opdelt i strukturerede, taggede sektioner
- Simpel, deterministisk udvælgelse baseret på brugerinput
- Prompt-injektion af kun relevant domæneviden
- Fuldt integreret i eksisterende chat-flow

Følgende er fortsat bevidst udeladt:
- embeddings og vector search
- eksterne datakilder
- automatiseret vidensudvidelse
- ranking eller scoring af viden
- fallback-logik ved manglende match

Iteration 4 afsluttes som stabil RAG-light baseline.
Videreudvikling kræver eksplicit beslutning og ny iteration.

---

## Iteration 5 – Fokus (Sikkerhed & grænsehåndhævelse)

Iteration 5 fokuserer på håndhævelse af etiske og faglige grænser
i runtime-logik.

Systemet udvides med:
- deterministiske sikkerhedschecks
- standardiserede afvisningssvar

Der introduceres ingen nye modes, services eller arkitekturændringer.

---

## Iteration 5 – Status (Sikkerhed & grænsehåndhævelse)

Iteration 5 har introduceret håndhævelse af etiske og faglige grænser i runtime.

Tilføjelser i denne iteration:
- Deterministiske sikkerhedschecks før AI-kald
- Standardiserede afvisningssvar ved diagnose, behandling og medicinsk rådgivning
- Forbedret forudsigelighed og ansvarlighed

Følgende er fortsat bevidst udeladt:
- Soft warnings eller logs
- Prioritering af violations
- UI-visning af afvisningstekster
- Ændringer i backend-arkitektur eller prompt-struktur

Iteration 5 afsluttes som stabil baseline for sikkerhed.
Videreudvikling kræver eksplicit beslutning og ny iteration.

---

## Iteration 6 – Status (Observability)

Iteration 6 har introduceret lærings-orienteret observability
uden ændringer i systemets adfærd eller arkitektur.

Tilføjelser i denne iteration:
- Formelle observability-event-typer
- Runtime-logging via console (edge-safe)
- Metadata-baseret indsigt i:
  - session-dynamik
  - RAG-light udvælgelse
  - sikkerhedsafvisninger
  - besked- og svarlængder
- Centralt debug-flag til aktivering/deaktivering

Følgende er fortsat bevidst udeladt:
- persistent logging
- eksterne analytics-services
- visning i UI
- performance- eller driftsovervågning

Iteration 6 afsluttes som stabil baseline for lærings-observability.
Videreudvikling kræver eksplicit beslutning og ny iteration.

---

## Iteration 7 – Status (Eval & kvalitetsmåling)

Iteration 7 har introduceret en struktureret tilgang til
manuel og reproducerbar evaluering af chatbot-svar.

Tilføjelser i denne iteration:
- Klart definerede eval-kriterier
- Fast sæt eval-spørgsmål (“golden questions”)
- Beskrevet eval-proces og dokumentationsskabelon
- Mulighed for kvalitativ sammenligning på tværs af iterationer

Følgende er bevidst udeladt:
- Automatisk eval-pipeline
- Numerisk scoring
- Feedback-loop til runtime
- UI-integration

Iteration 7 afsluttes som stabil baseline for eval og kvalitetsforståelse.
Videreudvikling kræver eksplicit beslutning og ny iteration.

---

## Iteration 8 – Status (UI debug & insight)

Iteration 8 har udvidet test-UI’et med read-only debug-information
for bedre indsigt i systemets runtime-adfærd.

Tilføjelser i denne iteration:
- Debug-panel i UI
- Visning af valgte RAG-sektioner (metadata)
- Visning af safety-status pr. request
- Visning af observability-events (metadata)

Følgende er bevidst udeladt:
- UI-polish og styling
- Redigering eller påvirkning af runtime-adfærd
- Persistens af debug-data
- Produktionsklar debug

Iteration 8 afsluttes som stabil baseline for UI-baseret indsigt.
Videreudvikling kræver eksplicit beslutning og ny iteration.

---

## Iteration 9 – Fokus (Konsolidering & undervisningsmateriale)

Iteration 9 fokuserer på konsolidering af projektet som
et klart reference- og undervisningsmateriale.

Fokus er på:
- forklaring af arkitektur og dataflow
- dokumentation af iterationstænkning
- tydeliggørelse af designbeslutninger

Der introduceres ingen nye features,
og systemets runtime-adfærd ændres ikke.
