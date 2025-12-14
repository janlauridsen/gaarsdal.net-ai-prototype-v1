# AI Hypnoterapi Chatbot – Arkitektur- & Læringsprototype

Dette repository indeholder en **lærings- og referenceprototype**
for en moderne, domænebegrænset AI-chatbot.

Projektets primære formål er **arkitekturforståelse** —
ikke at levere et færdigt produkt.

---

## Hvad er dette projekt?

- En lille, isoleret AI-chatbot med fokus på **hypnoterapi**
- Bygget trin-for-trin med **bevidst lav kompleksitet**
- Arkitekturen er:
  - moderne
  - cloud-baseret
  - model-agnostisk
- Alle beslutninger er dokumenteret og låst pr. iteration

Projektet er velegnet som:
- reference for AI-arkitektur
- undervisningsmateriale
- udgangspunkt for videre eksperimenter

---

## Hvad er dette projekt *ikke*?

- ❌ Et færdigt produkt
- ❌ En produktionsklar løsning
- ❌ Et generelt AI-chatinterface
- ❌ En platform for mange domæner
- ❌ Et optimeret eller skaleret system

Mange ting er bevidst udeladt for at holde fokus.

---

## Hvad kan man lære af repo’et?

- Hvordan man designer en **minimal, moderne AI-arkitektur**
- Hvordan man:
  - afgrænser et domæne
  - håndhæver etik og sikkerhed
  - arbejder med session-baseret hukommelse
- Hvordan man itererer **kontrolleret og dokumenteret**
- Hvordan observability og eval kan introduceres uden kompleksitet

---

## Overordnet arkitektur (kort)

Systemet består af få, klart adskilte komponenter:

- Client / UI (bevidst “dum”)
- Ét API-endpoint (`/api/chat`)
- Prompt-komposition i lag
- AI-model-adapter
- Session-hukommelse i Redis
- Statisk, versionsstyret domæneviden

Detaljer findes i:
- `ARCHITECTURE.md`
- `DECISIONS.md`

---

## Sådan læses repo’et

Anbefalet læserækkefølge:

1. `PROJECT_BRIEF.md` – formål og rammer
2. `ARCHITECTURE.md` – teknisk reference
3. `DECISIONS.md` – hvorfor arkitekturen ser sådan ud
4. `/docs/` – eval, observability og proces
5. Koden – som implementering af ovenstående

---

## Iterationstænkning

Projektet er bygget i **afsluttede iterationer**.
Hver iteration:
- har ét klart fokus
- afsluttes eksplicit
- danner stabil baseline for næste trin

Dette gør repo’et egnet som reference over tid.

---

## Status

Projektet er i **konsolideringsfase**  
og fungerer som stabil referenceprototype.

Videreudvikling bør ske:
- i nye iterationer
- eller i et nyt repo, der bygger videre herfra
