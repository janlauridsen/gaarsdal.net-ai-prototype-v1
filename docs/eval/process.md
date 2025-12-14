# Eval-proces – AI Hypnoterapi Chatbot

Dette dokument beskriver den anbefalede proces for manuel
evaluering af chatbot-svar baseret på eval-kriterierne
og golden questions.

Formålet er læring, refleksion og arkitektonisk forståelse.

---

## 1. Forberedelse

1. Sørg for at systemet kører i en stabil baseline (afsluttet iteration).
2. Slå observability til (hvis relevant for analysen).
3. Nulstil session mellem eval-runs for konsistens.

---

## 2. Gennemførsel

For hvert spørgsmål i *golden set*:

1. Indtast spørgsmålet i chatten.
2. Gem chatbot-svaret uændret.
3. Notér eventuelle observability-events (hvis brugt).
4. Vurder svaret ud fra eval-kriterierne.

---

## 3. Vurdering

For hvert svar vurderes følgende (kvalitativt):

- Domæne-korrekthed
- Etisk overholdelse
- Klarhed og tone
- Afgrænsning og ærlighed

Notér:
- styrker
- svagheder
- gentagende mønstre

Ingen numerisk scoring anvendes i denne iteration.

---

## 4. Sammenligning over tid

Ved senere iterationer:

- gentag eval med samme golden questions
- sammenlign svar kvalitativt
- identificér arkitektoniske eller prompt-relaterede ændringer

Fokus er:
> hvorfor ændrede svaret sig – ikke om det blev “bedre”.

---

## 5. Dokumentation

Eval-resultater kan dokumenteres som:
- noter i issues
- markdown-filer
- commit-kommentarer

Eval-resultater påvirker **ikke** systemet direkte
uden eksplicit beslutning i en ny iteration.
