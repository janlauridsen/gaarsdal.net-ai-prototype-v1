# Iterations-overblik – AI Hypnoterapi Chatbot

Dette dokument giver et samlet overblik over projektets
iterationer og deres læringsmæssige formål.

Formålet er at vise **hvordan arkitekturen blev til**
– trin for trin – og hvorfor denne proces er vigtig.

---

## Iteration 1 – Arkitektur & fundament

**Fokus:**
- Fastlægge formål, scope og arkitektur
- Låse stack og arkitekturprincipper

**Læring:**
- Værdien af at definere arkitektur før kode
- Bevidst fravalg reducerer kompleksitet

---

## Iteration 2 – Funktionel AI-chat

**Fokus:**
- Etablering af end-to-end chatflow
- Model-agnostisk AI-adapter

**Læring:**
- Klar ansvarsadskillelse giver stabilitet
- Ét entrypoint gør systemet forståeligt

---

## Iteration 3 – UI & session-overblik

**Fokus:**
- Simpelt test-UI
- Session-baseret hukommelse

**Læring:**
- “Dum” UI reducerer kobling
- Session-state kan være simpel og effektiv

---

## Iteration 4 – RAG-light (statisk viden)

**Fokus:**
- Domænebegrænset viden
- Deterministisk udvælgelse

**Læring:**
- RAG behøver ikke embeddings for at være nyttigt
- Simpel retrieval er lettere at debugge

---

## Iteration 5 – Sikkerhed & grænsehåndhævelse

**Fokus:**
- Etiske og faglige grænser
- Standardiserede afvisninger

**Læring:**
- Deterministisk sikkerhed skaber forudsigelighed
- Afvisning er en legitim del af AI-adfærd

---

## Iteration 6 – Observability & læring

**Fokus:**
- Metadata-baseret observability
- Indsigt uden adfærdsændring

**Læring:**
- Man kan forstå systemadfærd uden analytics-kompleksitet
- Observability er også et læringsværktøj

---

## Iteration 7 – Eval & kvalitetsmåling

**Fokus:**
- Manuel, struktureret evaluering
- Golden questions og kriterier

**Læring:**
- Kvalitet kræver refleksion, ikke kun metrics
- Eval kan eksistere uden feedback-loops

---

## Iteration 8 – UI debug & insight

**Fokus:**
- Synliggørelse af intern adfærd i UI
- Read-only debug-metadata

**Læring:**
- UI kan være et læringsværktøj
- Transparens styrker arkitekturforståelse

---

## Samlet perspektiv

Projektet viser, at:
- Moderne AI-arkitektur kan bygges **trinvist**
- Kontrollerede iterationer skaber stabilitet
- Læring styrkes ved bevidste stop og dokumentation

Iterationstænkningen er en **arkitektonisk disciplin**,
ikke kun en projektmetode.
