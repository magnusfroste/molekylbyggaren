# Inskick – Molekylbyggaren

- **Titel:** Molekylbyggaren
- **Kort beskrivning (≤34 tecken):** Bygg molekyler atom för atom
- **URL:** https://molekylbyggaren.shipholm.dev
- **Ämne:** Kemi
- **Årskurs:** 7–9
- **Typ:** Öva
- **Enhet:** Alla enheter
- **Lgr22 (curriculum_ids):** KE.7-9.1.1
- **Kortbild:** `public/kort.png` (1200×900, 4:3, spelmoment utan pålägg) →
  https://molekylbyggaren.shipholm.dev/kort.png

## long_description
Molekylbyggaren är ett övningsspel i kemi för åk 7–9. Molekylens struktur
ligger på bordet som tomma cirklar bundna till varandra, och en av platserna
blinkar. Eleven läser molekylens namn och formel, till exempel vatten, H₂O, och
trycker på rätt grundämne i lådan – H, O, C, N eller Cl. Passar atomen sätter
den sig på plats med en bindning och nästa plats blinkar; passar den inte
studsar knappen tillbaka och Kotten berättar vad molekylen består av. Fel svar
kostar ingenting.

13 riktiga molekyler i tre nivåer: två atomer (H₂, O₂, N₂, HCl), tre till fem
(H₂O, NH₃, CH₄, CO₂) och sex till nio atomer (C₂H₆, C₂H₄, C₂H₂, CH₃OH,
C₂H₅OH). Varje molekyl ritas med rätt bindningsordning – dubbelbindningen i
syrgas och koldioxid syns, trippelbindningen i kvävgas och etyn likaså – och
efter varje bygge berättar Kotten en rad om ämnet.

Appen tränar det momentet i det centrala innehållet för kemi åk 7–9:
”Materiens uppbyggnad, kretslopp och oförstörbarhet visualiserat med hjälp av
partikelmodeller. Grundämnen, molekyl- och jonföreningar samt hur ämnen
omvandlas genom kemiska reaktioner.” (Skolverket, Lgr22.) Eleven läser en
formel, känner igen grundämnenas symboler och lär sig att en atom har ett
bestämt antal bindningar: H 1, O 2, N 3, C 4.

En runda är fyra molekyler och tar ungefär 3–5 minuter. Gratis, ingen
inloggning, inga annonser, inga länkar ut, inga barnuppgifter.

## Kontroll
- `node verify.mjs` – 13 molekyler, 0 fel: atomerna i strukturen stämmer med
  formeln och varje atom har exakt sin valens.
- Spelat igenom runda 1, 2 och 3 med `Input.dispatchTouchEvent`: 4/4 molekyler
  per runda, stjärnor och resultatruta, "En runda till" och "Byt nivå".
- Ryms utan scroll i 1024×768, 768×1024, 390×844 och 1440×900 (0 px båda axlarna).