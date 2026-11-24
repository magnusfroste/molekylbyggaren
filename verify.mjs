/* Kontrollerar molekyldatan i public/app.js:
   1) atomerna i strukturen stämmer med formeln (samma antal av varje grundämne)
   2) varje atom har exakt så många bindningar som dess valens
   3) alla bindningar pekar på atomindex som finns
   Kör: node verify.mjs */
import fs from "node:fs";

const src = fs.readFileSync(new URL("./public/app.js", import.meta.url), "utf8");
const start = src.indexOf("var MOLEKYLER = [");
const slut = src.indexOf("\n  ];", start);
if (start < 0 || slut < 0) { console.error("hittar inte MOLEKYLER"); process.exit(1); }
const data = eval(src.slice(start + "var MOLEKYLER = ".length, slut + 4));

const VALENS = { H: 1, O: 2, C: 4, N: 3, Cl: 1 };

function formelAtomer(f) {
  const ut = {};
  const re = /([A-Z][a-z]?)(\d*)/g;
  let m;
  while ((m = re.exec(f))) ut[m[1]] = (ut[m[1]] || 0) + Number(m[2] || 1);
  return ut;
}

let fel = 0;
for (const m of data) {
  const fromFormel = formelAtomer(m.formel);
  const franStruktur = {};
  m.atomer.forEach(a => { franStruktur[a.el] = (franStruktur[a.el] || 0) + 1; });
  const nycklar = new Set([...Object.keys(fromFormel), ...Object.keys(franStruktur)]);
  for (const k of nycklar) {
    if ((fromFormel[k] || 0) !== (franStruktur[k] || 0)) {
      console.log(`FEL ${m.namn} (${m.formel}): ${k} formel ${fromFormel[k] || 0} men struktur ${franStruktur[k] || 0}`);
      fel++;
    }
  }
  const anvand = m.atomer.map(() => 0);
  for (const [a, b, ord] of m.bindningar) {
    if (!m.atomer[a] || !m.atomer[b]) { console.log(`FEL ${m.namn}: bindning mot okänt index`); fel++; continue; }
    if (a === b) { console.log(`FEL ${m.namn}: atom bunden till sig själv`); fel++; }
    anvand[a] += ord || 1; anvand[b] += ord || 1;
  }
  m.atomer.forEach((a, i) => {
    const v = VALENS[a.el];
    if (v === undefined) { console.log(`FEL ${m.namn}: okänt grundämne ${a.el}`); fel++; return; }
    if (anvand[i] !== v) { console.log(`FEL ${m.namn}: ${a.el} på plats ${i} har ${anvand[i]} bindningar, ska ha ${v}`); fel++; }
  });
}

console.log(`${data.length} molekyler kontrollerade, ${fel} fel.`);
process.exit(fel ? 1 : 0);