export type HypnosisSection = {
  id: string;
  tags: string[];
  content: string;
};

export const HYPNOSIS_SECTIONS: HypnosisSection[] = [
  {
    id: "intro",
    tags: ["hypnoterapi", "hvad-er-hypnose", "grundlæggende"],
    content: `
Hypnoterapi er en terapeutisk metode, hvor afslapning, fokuseret opmærksomhed
og guidede forestillinger anvendes til at arbejde med vaner, stress, angst
og personlige forandringsprocesser.

Hypnose er ikke søvn, men en tilstand af øget opmærksomhed og modtagelighed.
Klienten bevarer kontrol og kan altid afbryde processen.
`.trim(),
  },
  {
    id: "ethics",
    tags: ["etik", "ansvar", "begrænsninger"],
    content: `
Hypnoterapi er ikke en erstatning for medicinsk eller psykologisk behandling.
Der gives ingen diagnoser og ingen behandlings- eller helbredsløfter.

Hypnoterapi anvendes inden for klare etiske rammer og med respekt for klientens autonomi.

Spørges der til kontakt information benyttes navn: Jan Lauridsen e-mail jan@gaarsdal.net telefon: 42807474 eller se på http://gaarsdal.net for yderligere
Besøgs adresse kan oplyses som Bakkevej 36, 3460 Birkerød 

`.trim(),
  },
];
