# Molekylbyggaren – koncept och testplan

## Mål (en sak per app)
Eleven ska kunna läsa en molekylformel och bygga molekylen: sätta rätt
grundämnen på rätt plats i strukturen, och veta att varje atom har ett bestämt
antal bindningar.

## Målgrupp och årskurs
Åk 7–9 (kemi). Läskunnig målgrupp, så namn och formel får stå på skärmen – men
allt som behövs för att spela finns i bilden: en blinkande tom plats, en låda
med grundämnen, en formel.

## Kärnmekanik (touch först)
Molekylens struktur ligger på bordet som tomma cirklar bundna till varandra.
En cirkel blinkar. Barnet trycker på ett grundämne i lådan (H, O, C, N, Cl):
passar det sätter atomen sig med ett klick och nästa plats blinkar; passar det
inte studsar knappen tillbaka och Kotten säger vad molekylen består av. Inget
drag, ingen tajming, två tryck som mest.

## 5-minuterssession
4 molekyler per runda. Runda 1: två atomer (H₂, O₂, N₂, HCl). Runda 2: tre till
fem atomer (H₂O, NH₃, CH₄, CO₂). Runda 3: sex till nio atomer (C₂H₆, C₂H₄,
C₂H₂, CH₃OH, C₂H₅OH). Efter varje molekyl berättar Kotten en rad om ämnet.

## Belöning barnet kan berätta om
”Jag byggde etanol, C₂H₅OH, och fick 9 stjärnor. Kolatomen hade fyra bindningar.”

## Vad barnet lär
- Att läsa en molekylformel och räkna atomerna i den.
- Grundämnenas symboler (H, O, C, N, Cl) och svenska namn.
- Att en atom har ett bestämt antal bindningar (valens): H 1, O 2, N 3, C 4.
- Att struktur och formel beskriver samma molekyl.

## Lgr22 (verbatimt, Skolverkets centrala innehåll för kemi åk 7–9)
1. `KE.7-9.1.1` – ”Materiens uppbyggnad, kretslopp och oförstörbarhet
   visualiserat med hjälp av partikelmodeller. Grundämnen, molekyl- och
   jonföreningar samt hur ämnen omvandlas genom kemiska reaktioner. Atomer,
   elektroner och kärnpartiklar.”
2. `KE.7-9.1.2` (valfri) – kemiska föreningars egenskaper och uppbyggnad, om
   citatet verifieras i lgr22-filen före inskick.

## Kotten
Egen SVG-kotte med fem uttryck (glad, hejar, firar, tänker, funderar). Hon
läser aldrig läxan åt barnet: vid fel säger hon vad molekylen består av, inte
vilken knapp som är rätt. Fel svar kostar ingenting.

## Testplan (mätbara krav)
| Krav | Mätning | Gräns |
|---|---|---|
| Allt ryms | `scrollHeight - innerHeight` / `scrollWidth - innerWidth` efter Spela | 0 i 1024×768, 768×1024, 390×844, 1440×900 |
| Bara fingrar | en hel runda med `Input.dispatchTouchEvent` | 4 molekyler byggda utan mus |
| Tryckytor | `getBoundingClientRect` på atomknapparna | ≥ 56 px |
| Direkt återkoppling | rätt atom sätter sig, fel studsar med förklaring | ja |
| Nytt försök utan straff | fel svar ger ledtråd, ingen poängförlust | ja |
| Ingen inloggning/reklam/länk ut | manuell kontroll + `check_app` | inga utlänkar |
| Korrekt kemi | `node verify.mjs` | 0 fel av 13 molekyler |
| Textstorlek | all text i spelplanen | ≥ 18 px |
| Reducerad rörelse | `prefers-reduced-motion` stänger av puls | ja |

## Validation före bygge
Kritisk genomgång mot källmaterialet (Skolverkets centrala innehåll, PappasAppars
kemilucka: två sandlådor från 2013–2014 utan fakta):

- **Skulle ett barn spela 5 minuter?** Ja: fyra molekyler per runda, ökande
  storlek, omedelbart klick vid rätt atom och en faktarad efter varje. Rundan
  tar 2–4 minuter, vilket ger ”en runda till”.
- **Träffar det ett verkligt kunskapskrav?** Ja: molekyler och jonföreningar ur
  KE.7-9.1.1, och valens är det som förklarar varför formeln ser ut som den gör.
- **Teknisk risk?** Låg: ren SVG, ingen fysikmotor, ingen timer. Risken är
  layout på små skärmar (löst med flex + viewBox) och att stora molekyler blir
  trånga (löst med radie beräknad ur minsta bindningslängd).