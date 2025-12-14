# gaarsdal.net-ai-prototype-v1
State-of-the-art AI løsning - en prototype oplæg dokumenteret i projekt-brief.md 

# AI Hypnoterapi Chatbot – Referenceprototype

Dette projekt er en **lærings- og arkitekturprototype** for en moderne AI-chatbot med fokus på:
- state-of-the-art arkitektur
- minimal kompleksitet
- stabilitet og gennemsigtighed
- kontrolleret iteration

Projektet er **ikke et færdigt produkt** og er **ikke tiltænkt produktion** i sin nuværende form.

---

## Formål

Formålet med projektet er at:

- forstå og afprøve moderne AI-arkitekturprincipper
- bygge en lille, isoleret chatbot med klar faglig afgrænsning
- kunne iterere i små, kontrollerede skridt
- skabe et genbrugeligt arkitektonisk fundament til fremtidige kommercielle løsninger

Chatbotten fungerer som en **hypnoterapeutisk chatbot**, men er udelukkende en teknisk prototype.

---

## Faglig og etisk afgrænsning

Chatbotten:

- arbejder **udelukkende inden for hypnoterapi**
- baserer al viden på **statisk, manuelt udvalgt indhold fra gaarsdal.net**
- stiller **ingen diagnoser**
- giver **ingen behandlings- eller helbredsløfter**
- erstatter **ikke** lægelig, psykiatrisk eller psykologisk behandling

Hvis chatbotten mangler viden, skal den sige det klart og ærligt.

---

## Stack (låst)

Projektet anvender en fast, bevidst begrænset stack:

- **GitHub** – versionering
- **Vercel** – hosting + Edge Functions
- **Upstash (Redis)** – session-hukommelse (7 dage)
- **Cloud-only arkitektur**

Ingen nye services, tools eller platforme introduceres i denne fase.

---

## Overordnet arkitektur

Systemet består af få, klart adskilte dele:

Client / UI
↓
Vercel Edge Function (/api/chat)
↓
Prompt-komposition
↓
AI-model-adapter
↓
Redis (session-hukommelse, 7 dage)

Statisk hypnoterapi-data injiceres i prompten

yaml
Kopier kode

Der anvendes:
- ingen fine-tuning
- ingen autonome agent-teams
- ingen eval-pipeline
- ingen embeddings i første iteration

---

## Projektstruktur (forenklet)

/api/chat/route.ts # Chat-endpoint (Edge Function)

/lib
/ai/adapter.ts # Model-agnostisk AI-interface
/memory/redis.ts # Session & hukommelse
/prompts # Prompt-moduler
/data/hypnosis.ts # Statisk hypnoterapi-viden

/docs
PROJECT_BRIEF.md
ARCHITECTURE.md

yaml
Kopier kode

Strukturen afspejler arkitekturen 1:1.

---

## Lokal udvikling

1. Klon repoet
2. Opret `.env.local` baseret på `.env.example`
3. Tilføj:
   - `OPENAI_API_KEY`
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. Kør projektet lokalt (Next.js / Vercel setup)

---

## Kendte begrænsninger (bevidste valg)

- Simpel prompt (ingen token-optimering)
- Hele datasættet injiceres i prompten
- Ingen streaming
- Ingen rate limiting
- Ingen UI-polish
- Ingen produktionssikkerhed

Disse valg er **bevidste** og støtter projektets læringsformål.

---

## Videre arbejde

Projektet er designet til kontrolleret videreudvikling, fx:

- RAG-light uden ny stack
- Forfinet prompt-adfærd
- Forbedret session-hukommelse
- Simpel UI
- Klargøring til kommerciel version

Kun ét skridt ad gangen.

---

## Status

✅ Færdig referenceprototype  
🧠 Fokus: arkitektur, forståelse og læring  
🚫 Ikke produktion

