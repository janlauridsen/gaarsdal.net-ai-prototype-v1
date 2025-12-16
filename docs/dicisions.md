# DECISIONS  
## Arkitektoniske beslutninger – AI Hypnoterapi Chatbot

Dette dokument logger **bevidste arkitektoniske beslutninger** truffet i projektet.

Formål:
- fastholde hvorfor ting blev gjort på en bestemt måde
- undgå gentagelse af tidligere diskussioner
- gøre videreudvikling mere bevidst og kontrolleret

Beslutninger ændres kun ved eksplicit valg.

---

## Arkitektonisk mantra

> **Hellere stoppe rigtigt  
> end hjælpe forkert.**

Dette mantra fungerer som fortolkningsprincip for alle arkitektoniske beslutninger
i `gaarsdal-layered-prototype-v1`.

Hvis der opstår tvivl om:
- hvor meget systemet må gøre
- om et flow er for hjælpsomt
- om en grænse bør udvides

skal dette mantra vægtes højere end funktionel bekvemmelighed
eller oplevet brugerhjælp.

Arkitekturen er designet til lokal, relationel brug, hvor tillid og korrekt afgrænsning vægtes højere end tilgængelighed og dialog.

SEO bestemmer hvem der kommer.
Arkitekturen bestemmer hvem der bliver.

Arkitekturen er designet til lokal, ikke-skalerende brug, hvor korrekt afgrænsning og tillid vægtes højere end interaktion og fastholdelse.

---

## 2025-01 – Projektets grundlag

### 1. Prototype frem for produkt
**Beslutning:**  
Projektet er defineret som en **lærings- og referenceprototype**, ikke et produkt.

**Begrundelse:**  
Fokus er arkitekturforståelse, iteration og genbrug — ikke performance, UI eller drift.

---

### 2. Fast stack
**Beslutning:**  
Projektet anvender udelukkende:
- GitHub
- Vercel (Edge Functions)
- Upstash (Redis)
- Cloud-only arkitektur

**Begrundelse:**  
Reducerer kompleksitet og holder fokus på arkitektur frem for tooling.

---

### 3. Ét domæne: hypnoterapi
**Beslutning:**  
Chatbotten arbejder udelukkende inden for hypnoterapi.

**Begrundelse:**  
Klar faglig afgrænsning er nødvendig for:
- stabil adfærd
- etisk ansvar
- læring om domænebegrænsede AI-systemer

---

### 4. Statisk, manuelt udvalgt viden
**Beslutning:**  
Al viden kommer fra statisk, manuelt udvalgt indhold fra gaarsdal.net.

**Begrundelse:**  
Sikrer:
- gennemsigtighed
- versionskontrol
- fuld kontrol over vidensgrundlaget

Fravalg af crawling og automatisering er bevidst.

---

### 5. Ingen fine-tuning i første iteration
**Beslutning:**  
Der anvendes ingen fine-tuning.

**Begrundelse:**  
Målet er at forstå arkitektur, prompt-design og systemgrænser før modeltilpasning.

---

### 6. Ingen autonome agent-teams
**Beslutning:**  
Systemet bygges uden autonome agenter eller multi-agent-setup.

**Begrundelse:**  
Reducerer kompleksitet og gør systemets adfærd mere forudsigelig.

---

### 7. Prompt-komposition frem for monolitisk prompt
**Beslutning:**  
Prompten opdeles i klare moduler:
- systemrolle
- etik & sikkerhed
- domæneviden
- session-kontekst

**Begrundelse:**  
Gør adfærden mere forståelig og lettere at justere.

---

### 8. Model-agnostisk design
**Beslutning:**  
AI-modellen tilgås via en adapter med ét interface.

**Begrundelse:**  
Muliggør udskiftning af model uden arkitekturændring.

---

### 9. Session-hukommelse i Redis (7 dage)
**Beslutning:**  
Chat-historik gemmes i Redis med TTL på 7 dage.

**Begrundelse:**  
Balancerer:
- kontekst
- privatliv
- enkelhed

Ingen langtidsviden i første iteration.

---

### 10. Edge Functions frem for serverfuld runtime
**Beslutning:**  
Chat-endpointet kører som Vercel Edge Function.

**Begrundelse:**  
- Lav latency
- Enkel deployment
- Passer til prototype-scope

---

### 11. Bevidste fravalg i første iteration
**Beslutning:**  
Følgende er eksplicit udeladt:
- embeddings / vector search
- eval-pipelines
- streaming
- rate limiting
- auth
- UI-polish
- produktionssikkerhed

**Begrundelse:**  
Hvert fravalg reducerer støj og styrker læringsfokus.

---

### 12. Stram adfærdsstyring for statisk data (anti-hallucination)

**Beslutning:**  
Statisk information (fx kontaktoplysninger og praktiske fakta fra gaarsdal.net)
må kun gengives, når brugeren stiller et direkte og eksplicit
informationsspørgsmål om disse oplysninger.

Formuleringer, der udtrykker intention eller ønske
(fx “jeg vil gerne kontakte …”),
må ikke udløse gengivelse af statisk data.

Når statisk data gengives, skal det ske ordret og uændret,
præcis som leveret i den statiske kilde.
Modellen må ikke udfylde, normalisere, omskrive eller supplere oplysninger.

Hvis den relevante information ikke findes i den statiske data,
skal modellen tydeligt oplyse dette og afslutte svaret uden at foreslå
handlinger eller næste skridt.

**Begrundelse:**  
Denne beslutning reducerer risiko for hallucinationer,
utilsigtet rådgivning og tillidsbrud.
Den gør systemets adfærd deterministisk, testbar og egnet
som lærings- og referencearkitektur for ansvarlig AI.

---

## Fremtidige beslutninger (placeholder)

Nye beslutninger logges her, fx:
- introduktion af RAG-light
- ændringer i prompt-strategi
- udvidelse med flere modes
- klargøring til kommerciel version

---

## Status

Dette dokument afspejler projektets **nuværende arkitektoniske sandhed**.

Hvis noget føles “forkert”, skal beslutningen ændres her — ikke skjult i kode.

