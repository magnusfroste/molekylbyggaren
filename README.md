# Molekylbyggaren

Bygg molekyler atom för atom – kemi åk 7–9.

Molekylens struktur visas som tomma cirklar bundna till varandra. Eleven läser
namn och formel och trycker på rätt grundämne i lådan; rätt atom sätter sig på
plats, fel atom studsar tillbaka med en förklaring. 13 riktiga molekyler i tre
nivåer, kontrollerade med `node verify.mjs` (formel mot struktur, valens per atom).

Statisk app: `public/` serveras av nginx (`Dockerfile`). Inga beroenden, inga
tredjepartsanrop förutom kodsnutten `kotten.js` från skolappar.com.
