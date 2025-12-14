Statisk hypnoterapi-data (domænegrundlag)

Formål med TRIN 4:
At etablere det eneste vidensgrundlag, chatbotten må bruge — i en form der er:

manuel

gennemsigtig

RAG-klar

let at udskifte og udvide senere

👉 Stadig ingen AI-kald.
👉 Kun data + struktur.

1️⃣ Grundprincipper (meget vigtige)

Dette datasæt er:

autoriteten for domænet

begrænsningen for chatbotten

træningshjernen (uden fine-tuning)

Hvis noget ikke står her:

chatbotten må ikke “vide” det.

2️⃣ Designvalg: form & struktur

Vi vælger en meget enkel TypeScript-struktur, ikke embeddings, ikke vector DB.

Hvorfor?

Maksimal gennemsigtighed

Let at læse og validere

Let at versionere i GitHub

Klar til senere RAG-udvidelse

3️⃣ Datamodel

Hvert tekstafsnit er et videns-chunk:

type HypnosisChunk = {
  id: string;
  title: string;
  content: string;
  source: string;
};


Ingen metadata-overkill.
Ingen scoring.
Ingen tags (endnu).

4️⃣ Kode: /lib/data/hypnosis.ts

Dette er hele vidensbasen i første iteration.

export type HypnosisChunk = {
  id: string;
  title: string;
  content: string;
  source: string;
};

export const hypnosisData: HypnosisChunk[] = [
  {
    id: "intro-hypnosis",
    title: "Hvad er hypnoterapi?",
    content: `
Hypnoterapi er en terapeutisk metode, hvor hypnose anvendes til at skabe en tilstand
af fokuseret opmærksomhed og øget modtagelighed for forslag. I denne tilstand kan
klienten arbejde med vaner, mønstre og indre oplevelser på en mere direkte måde.
    `.trim(),
    source: "gaarsdal.net",
  },

  {
    id: "safety-boundaries",
    title: "Hypnoterapiens faglige afgrænsning",
    content: `
Hypnoterapi er ikke en erstatning for lægelig eller psykiatrisk behandling.
Der stilles ingen diagnoser, og der gives ingen garantier for helbredelse eller
behandlingsresultater.
    `.trim(),
    source: "gaarsdal.net",
  },

  // Flere chunks tilføjes manuelt her
];


👉 Du kan (og bør) selv:

tilføje flere chunks

splitte lange tekster op

være konservativ i udvælgelsen

5️⃣ Hvordan data bruges (konceptuelt)

I næste trin vil vi:

indsætte hele datasættet i prompten

uden retrieval-logik

uden filtrering

👉 Ja, det er “dumt” — og bevidst.

RAG-optimering kommer først, når arkitekturen er forstået.

6️⃣ Bevidste fravalg i TRIN 4

Ingen embeddings

Ingen søgning

Ingen ranking

Ingen automatisk tekstudtræk

Ingen eksterne kilder

Alt er:

manuelt, kontrolleret og læsbart

7️⃣ Output af TRIN 4

Efter dette trin har du:

En eksplicit domæneviden-fil

Klar afgrænsning af “hvad chatbotten ved”

Et datasæt klar til prompt-injektion
