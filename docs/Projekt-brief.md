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
