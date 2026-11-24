/* Molekylbyggaren – bygg molekyler atom för atom. Statisk app, inga beroenden. */
(function () {
  "use strict";

  /* ---------------- Data: riktiga molekyler med struktur ----------------
     x/y är relativa lägen (0–1). Bindningar: [atomA, atomB, ordning].
     Varje molekyl är kontrollerad i verify.mjs: summan av atomerna stämmer med
     formeln, och varje atom har exakt så många bindningar som dess valens. */
  var MOLEKYLER = [
    /* Nivå 1 – två atomer */
    { niva: 1, namn: "Vätgas", formel: "H2", fakta: "Vätgas består av två väteatomer som sitter ihop. Det är det lättaste grundämnet.",
      atomer: [{ el: "H", x: .35, y: .5 }, { el: "H", x: .65, y: .5 }], bindningar: [[0, 1, 1]] },
    { niva: 1, namn: "Syrgas", formel: "O2", fakta: "Syrgas är två syreatomer med dubbelbindning. Den andas vi in ur luften.",
      atomer: [{ el: "O", x: .35, y: .5 }, { el: "O", x: .65, y: .5 }], bindningar: [[0, 1, 2]] },
    { niva: 1, namn: "Kvävgas", formel: "N2", fakta: "Kvävgas är två kväveatomer med trippelbindning – därför är den så svår att bryta.",
      atomer: [{ el: "N", x: .35, y: .5 }, { el: "N", x: .65, y: .5 }], bindningar: [[0, 1, 3]] },
    { niva: 1, namn: "Väteklorid", formel: "HCl", fakta: "Väteklorid är en väteatom och en kloratom. I vatten blir den saltsyra.",
      atomer: [{ el: "H", x: .3, y: .5 }, { el: "Cl", x: .7, y: .5 }], bindningar: [[0, 1, 1]] },

    /* Nivå 2 – tre till fem atomer */
    { niva: 2, namn: "Vatten", formel: "H2O", fakta: "Vatten är en syreatom och två väteatomer. Vinkeln mellan väteatomerna gör vattnet polariserat.",
      atomer: [{ el: "O", x: .5, y: .42 }, { el: "H", x: .26, y: .68 }, { el: "H", x: .74, y: .68 }], bindningar: [[0, 1, 1], [0, 2, 1]] },
    { niva: 2, namn: "Ammoniak", formel: "NH3", fakta: "Ammoniak är en kväveatom och tre väteatomer. Den luktar starkt och används i gödsel.",
      atomer: [{ el: "N", x: .5, y: .42 }, { el: "H", x: .22, y: .7 }, { el: "H", x: .78, y: .7 }, { el: "H", x: .5, y: .16 }], bindningar: [[0, 1, 1], [0, 2, 1], [0, 3, 1]] },
    { niva: 2, namn: "Metan", formel: "CH4", fakta: "Metan är en kolatom och fyra väteatomer. Det är huvudbeståndsdelen i naturgas.",
      atomer: [{ el: "C", x: .5, y: .5 }, { el: "H", x: .5, y: .16 }, { el: "H", x: .16, y: .5 }, { el: "H", x: .84, y: .5 }, { el: "H", x: .5, y: .84 }], bindningar: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1]] },
    { niva: 2, namn: "Koldioxid", formel: "CO2", fakta: "Koldioxid är en kolatom och två syreatomer med dubbelbindningar. Växterna bygger socker av den.",
      atomer: [{ el: "O", x: .2, y: .5 }, { el: "C", x: .5, y: .5 }, { el: "O", x: .8, y: .5 }], bindningar: [[0, 1, 2], [1, 2, 2]] },

    /* Nivå 3 – större molekyler */
    { niva: 3, namn: "Etan", formel: "C2H6", fakta: "Etan är två kolatomer med tre väteatomer var. Kolatomen vill alltid ha fyra bindningar.",
      atomer: [{ el: "C", x: .4, y: .5 }, { el: "C", x: .6, y: .5 },
        { el: "H", x: .4, y: .18 }, { el: "H", x: .16, y: .5 }, { el: "H", x: .4, y: .82 },
        { el: "H", x: .6, y: .18 }, { el: "H", x: .84, y: .5 }, { el: "H", x: .6, y: .82 }],
      bindningar: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [1, 5, 1], [1, 6, 1], [1, 7, 1]] },
    { niva: 3, namn: "Eten", formel: "C2H4", fakta: "Eten är två kolatomer med dubbelbindning och två väteatomer var. Den får frukt att mogna.",
      atomer: [{ el: "C", x: .4, y: .5 }, { el: "C", x: .6, y: .5 },
        { el: "H", x: .4, y: .18 }, { el: "H", x: .4, y: .82 }, { el: "H", x: .6, y: .18 }, { el: "H", x: .6, y: .82 }],
      bindningar: [[0, 1, 2], [0, 2, 1], [0, 3, 1], [1, 4, 1], [1, 5, 1]] },
    { niva: 3, namn: "Etyn", formel: "C2H2", fakta: "Etyn är två kolatomer med trippelbindning. Den används i gassvetsar eftersom lågan blir mycket varm.",
      atomer: [{ el: "C", x: .4, y: .5 }, { el: "C", x: .6, y: .5 }, { el: "H", x: .16, y: .5 }, { el: "H", x: .84, y: .5 }],
      bindningar: [[0, 1, 3], [0, 2, 1], [1, 3, 1]] },
    { niva: 3, namn: "Metanol", formel: "CH3OH", fakta: "Metanol är en kolatom, en syreatom och fyra väteatomer. Den är giftig – därför dricker man den inte.",
      atomer: [{ el: "C", x: .3, y: .5 }, { el: "H", x: .3, y: .16 }, { el: "H", x: .09, y: .34 },
        { el: "H", x: .09, y: .66 }, { el: "O", x: .58, y: .5 }, { el: "H", x: .84, y: .5 }],
      bindningar: [[0, 1, 1], [0, 2, 1], [0, 3, 1], [0, 4, 1], [4, 5, 1]] },
    { niva: 3, namn: "Etanol", formel: "C2H5OH", fakta: "Etanol är två kolatomer, en syreatom och sex väteatomer. Det är alkoholen i drycker och i handsprit.",
      atomer: [{ el: "C", x: .24, y: .5 }, { el: "C", x: .45, y: .5 }, { el: "O", x: .69, y: .5 }, { el: "H", x: .9, y: .5 },
        { el: "H", x: .24, y: .16 }, { el: "H", x: .05, y: .34 }, { el: "H", x: .05, y: .66 },
        { el: "H", x: .45, y: .16 }, { el: "H", x: .45, y: .84 }],
      bindningar: [[0, 1, 1], [0, 4, 1], [0, 5, 1], [0, 6, 1], [1, 7, 1], [1, 8, 1], [1, 2, 1], [2, 3, 1]] }
  ];

  var FARG = { H: "#7db3d6", O: "#cf5b4c", C: "#4c5563", N: "#5b7fd4", Cl: "#5f9e52" };

  /* ---------------- Kotten (SVG, egen figur) ---------------- */
  var KOTTEN_FARG = "#b07d4b", KOTTEN_MORK = "#8a5f36", KOTTEN_OGON = "#2b2118";
  function kottenSvg(uttryck, klass) {
    var mun, ogen = "", extra = "";
    if (uttryck === "hejar") { mun = '<path d="M22 36 q8 8 16 0" fill="none" stroke="' + KOTTEN_OGON + '" stroke-width="2.4" stroke-linecap="round"/>'; }
    else if (uttryck === "firar") { mun = '<path d="M21 34 q9 12 18 0" fill="#fff"/><path d="M21 34 q9 12 18 0" fill="none" stroke="' + KOTTEN_OGON + '" stroke-width="2.4" stroke-linecap="round"/>'; extra = '<path d="M10 12 l3 6M50 12 l-3 6M30 6 v5" stroke="#e8a33d" stroke-width="2.2" stroke-linecap="round" fill="none"/>'; }
    else if (uttryck === "tanker") { mun = '<path d="M24 37 h11" stroke="' + KOTTEN_OGON + '" stroke-width="2.4" stroke-linecap="round" fill="none"/>'; ogen = '<circle cx="46" cy="24" r="4" fill="none" stroke="' + KOTTEN_MORK + '" stroke-width="1.6" opacity=".5"/>'; }
    else if (uttryck === "funderar") { mun = '<path d="M22 38 q8 -6 16 0" fill="none" stroke="' + KOTTEN_OGON + '" stroke-width="2.4" stroke-linecap="round"/>'; }
    else { mun = '<path d="M22 34 q8 8 16 0" fill="none" stroke="' + KOTTEN_OGON + '" stroke-width="2.4" stroke-linecap="round"/>'; }
    var oga = '<circle cx="23" cy="24" r="5.2" fill="#fff"/><circle cx="37" cy="24" r="5.2" fill="#fff"/>' +
      '<circle cx="24" cy="24.6" r="2.5" fill="' + KOTTEN_OGON + '"/><circle cx="36" cy="24.6" r="2.5" fill="' + KOTTEN_OGON + '"/>';
    return '<svg class="' + (klass || "kotten-svg") + '" viewBox="0 0 60 60" aria-hidden="true">' + extra +
      '<path d="M30 6 q9 4 12 12 q9 12 4 24 q-4 12 -16 14 q-12 -2 -16 -14 q-5 -12 4 -24 q3 -8 12 -12z" fill="' + KOTTEN_FARG + '"/>' +
      '<path d="M19 20 q11 -5 22 0M16 30 q14 -5 28 0M16 40 q14 -4 28 0" stroke="' + KOTTEN_MORK + '" stroke-width="1.7" fill="none" opacity=".85" stroke-linecap="round"/>' +
      oga + ogen + mun + '</svg>';
  }
  function kottenIkonFyll(container, uttryck, klass) {
    if (container) container.outerHTML = kottenSvg(uttryck, klass);
  }

  /* ---------------- Ljud ---------------- */
  var ac = null, ljudPa = true;
  function ljud(frekvens, längd, typ) {
    if (!ljudPa) return;
    try {
      if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = typ || "sine"; o.frequency.value = frekvens;
      g.gain.value = 0.001;
      o.connect(g); g.connect(ac.destination);
      var t = ac.currentTime;
      g.gain.exponentialRampToValueAtTime(0.12, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + längd);
      o.start(t); o.stop(t + längd + 0.02);
    } catch (e) { /* ljud är ett plus, aldrig ett krav */ }
  }
  function säg(text) {
    if (!ljudPa) return;
    try {
      if (!("speechSynthesis" in window) || !text) return;
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "sv-SE"; u.rate = 0.98; u.volume = 0.9;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) { /* klassrumsplattor tappar talare */ }
  }
  function spår(namn, värde) { try { if (window.skolappar && window.skolappar.event) window.skolappar.event(namn, värde); } catch (e) { } }

  /* ---------------- Tillstånd ---------------- */
  var PER_RUNDA = 4;
  var S = { skärm: "start", runda: 1, stjärnor: 0, byggda: 0, uppg: [], idx: 0, ifyllda: [], vald: 0, fel: 0 };

  function aktuell() { return S.uppg[S.idx]; }
  function nästaTom() {
    for (var i = 0; i < S.ifyllda.length; i++) if (!S.ifyllda[i]) return i;
    return -1;
  }
  function blanda(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function väljUppgifter(runda) {
    var niva = runda <= 1 ? 1 : (runda === 2 ? 2 : 3);
    var pool = MOLEKYLER.filter(function (m) { return m.niva === niva; });
    return blanda(pool).slice(0, PER_RUNDA);
  }

  /* ---------------- Rendering ---------------- */
  var svg = document.getElementById("molekylsvg");

  function räkna(m) {
    var c = {};
    m.atomer.forEach(function (a) { c[a.el] = (c[a.el] || 0) + 1; });
    return c;
  }

  function ritaMolekyl() {
    var m = aktuell();
    if (!m) return;
    var xs = m.atomer.map(function (a) { return a.x; }), ys = m.atomer.map(function (a) { return a.y; });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var y0 = Math.min.apply(null, ys), y1 = Math.max.apply(null, ys);
    var w = Math.max(x1 - x0, 0.18), h = Math.max(y1 - y0, 0.18);
    var skala = Math.min(74 / w, 74 / h);
    var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    function px(x) { return 50 + (x - cx) * skala; }
    function py(y) { return 50 + (y - cy) * skala; }

    // minsta bindningslängd bestämmer atomradien så att stora molekyler inte krockar
    var minLängd = Infinity;
    m.bindningar.forEach(function (b) {
      var a1 = m.atomer[b[0]], a2 = m.atomer[b[1]];
      var d = Math.hypot((a1.x - a2.x), (a1.y - a2.y)) * skala;
      if (d < minLängd) minLängd = d;
    });
    if (!isFinite(minLängd)) minLängd = 40;
    var r = Math.max(5.5, Math.min(10, minLängd * 0.3));
    var fs = r * 0.95;

    var html = "";
    // bindningar
    m.bindningar.forEach(function (b) {
      var a1 = m.atomer[b[0]], a2 = m.atomer[b[1]];
      var ax = px(a1.x), ay = py(a1.y), bx = px(a2.x), by = py(a2.y);
      var dx = bx - ax, dy = by - ay, len = Math.hypot(dx, dy) || 1;
      var ux = dx / len, uy = dy / len;
      var sx = ax + ux * r, sy = ay + uy * r, ex = bx - ux * r, ey = by - uy * r;
      var off = Math.min(2.6, r * 0.22);
      var ord = b[2] || 1;
      var avst = ord === 1 ? [0] : (ord === 2 ? [-off, off] : [-off * 1.5, 0, off * 1.5]);
      avst.forEach(function (o) {
        var nx = -uy * o, ny = ux * o;
        html += '<line x1="' + (sx + nx).toFixed(1) + '" y1="' + (sy + ny).toFixed(1) +
          '" x2="' + (ex + nx).toFixed(1) + '" y2="' + (ey + ny).toFixed(1) +
          '" stroke="#9d9484" stroke-width="' + (r * 0.16).toFixed(1) + '" stroke-linecap="round"/>';
      });
    });
    // atomer
    m.atomer.forEach(function (a, i) {
      var ifylld = S.ifyllda[i];
      var klass = "atom" + (ifylld ? " fylld" : " tom") + (i === S.vald && !ifylld ? " aktiv" : "");
      html += '<g class="' + klass + '" data-i="' + i + '"' + (ifylld ? "" : ' role="button" tabindex="0" aria-label="Tom plats, tryck för att välja"') + '>' +
        '<circle class="kropp" cx="' + px(a.x).toFixed(1) + '" cy="' + py(a.y).toFixed(1) + '" r="' + r.toFixed(1) + '"' +
        (ifylld ? ' fill="' + FARG[a.el] + '"' : "") + '/>' +
        '<text x="' + px(a.x).toFixed(1) + '" y="' + (py(a.y) + fs * 0.36).toFixed(1) + '" text-anchor="middle" font-size="' + fs.toFixed(1) + '">' +
        (ifylld ? a.el : "?") + '</text></g>';
    });
    svg.innerHTML = html;
    svg.setAttribute("aria-label", m.namn + ", " + m.formel + ", " + S.ifyllda.filter(Boolean).length + " av " + m.atomer.length + " atomer på plats");

    document.getElementById("namn").textContent = m.namn;
    document.getElementById("formel").innerHTML = formelHtml(m.formel);
  }

  function formelHtml(f) {
    return f.replace(/([A-Z][a-z]?)(\d*)/g, function (m, a, d) {
      return a + (d ? "<sub>" + d + "</sub>" : "");
    });
  }
  function formelText(f) {
    return f.replace(/([A-Z][a-z]?)(\d*)/g, function (m, a, d) {
      return a + (d ? "₀₁₂₃₄₅₆₇₈₉"[Number(d)] || d : "");
    });
  }

  function ritaStjärnor() {
    document.getElementById("stjarnor").textContent = "★".repeat(Math.min(S.stjärnor, 12)) + (S.stjärnor > 12 ? " +" : "");
  }

  function sammansättningText(m) {
    var c = räkna(m), namn = { H: "väte", O: "syre", C: "kol", N: "kväve", Cl: "klor" };
    return Object.keys(c).sort().map(function (k) {
      return c[k] + " " + namn[k] + (c[k] > 1 ? "atomer" : "atom") + " (" + k + ")";
    }).join(" och ");
  }

  /* ---------------- Spelflöde ---------------- */
  function väljPlats(i) {
    if (S.skärm !== "spel") return;
    if (S.ifyllda[i]) return;
    S.vald = i;
    ritaMolekyl();
  }

  function tryckElement(el, knapp) {
    if (S.skärm !== "spel") return;
    var m = aktuell();
    var i = (S.ifyllda[S.vald] ? nästaTom() : S.vald);
    if (i < 0) return;
    if (m.atomer[i].el === el) {
      S.ifyllda[i] = true;
      S.vald = nästaTom() < 0 ? i : nästaTom();
      ritaMolekyl();
      ljud(560 + 40 * Math.min(3, S.ifyllda.filter(Boolean).length), 0.09, "triangle");
      var nästa = nästaTom();
      if (nästa < 0) klarmolekyl(); else {
        var a = m.atomer[nästa];
        document.getElementById("kottentext").textContent = "Bra! Nu den blinkande platsen: vilket grundämne passar där?";
        document.getElementById("fraga").className = "fraga";
        document.getElementById("fraga").textContent = "Fyll den blinkande platsen med rätt atom.";
      }
    } else {
      S.fel++;
      if (knapp) { knapp.classList.remove("fel"); void knapp.offsetWidth; knapp.classList.add("fel"); }
      ljud(200, 0.16, "triangle");
      var nästa2 = nästaTom();
      document.getElementById("fraga").className = "fraga nej";
      document.getElementById("fraga").textContent = "Inte den atomen – titta på formeln igen.";
      document.getElementById("kottentext").textContent = m.namn + " består av " + sammansättningText(m) + ".";
      if ("speechSynthesis" in window && ljudPa) säg(m.namn + " består av " + sammansättningText(m) + ".");
      kottenByt("funderar");
      spår("hint");
    }
  }

  function klarmolekyl() {
    var m = aktuell();
    S.byggda++; S.stjärnor++;
    ritaStjärnor();
    document.getElementById("fraga").className = "fraga";
    document.getElementById("fraga").textContent = "Klart!";
    document.getElementById("kottentext").textContent = m.namn + " – " + formelText(m.formel) + ". " + m.fakta;
    kottenByt("firar");
    ljud(660, 0.12); setTimeout(function () { ljud(880, 0.16); }, 120); setTimeout(function () { ljud(1100, 0.2); }, 260);
    säg(m.namn + ". " + formelText(m.formel) + ".");
    spår("round_done", Math.round(100 * (S.idx + 1) / S.uppg.length));
    setTimeout(function () {
      if (S.skärm !== "spel") return;
      if (S.idx < S.uppg.length - 1) { S.idx++; nollställ(); ritaMolekyl(); nästaLedtråd(); }
      else rundaKlar();
    }, 1900);
  }

  function nollställ() {
    var m = aktuell();
    S.ifyllda = m.atomer.map(function () { return false; });
    S.vald = 0; S.fel = 0;
    document.getElementById("fraga").className = "fraga";
    document.getElementById("fraga").textContent = "Fyll den blinkande platsen med rätt atom.";
  }

  function nästaLedtråd() {
    var m = aktuell();
    document.getElementById("rundtext").textContent = "Molekyl " + (S.idx + 1) + " av " + S.uppg.length;
    document.getElementById("kottentext").textContent = "Läs formeln: " + formelText(m.formel) + ". Tryck på rätt grundämne i lådan.";
    kottenByt("glad");
  }

  function rundaKlar() {
    S.skärm = "överlägg";
    spår("round_done", 100);
    säg("Rundan är klar. " + S.byggda + " molekyler byggda.");
    visaOverlay(S.byggda >= S.uppg.length ? "firar" : "hejar", "Rundan är klar!",
      S.byggda + " molekyler byggda och " + S.stjärnor + " stjärnor totalt.",
      "En runda till →", function () { S.runda++; startaRunda(S.runda); });
  }

  function visaOverlay(uttryck, titel, text, knapptext, vidare) {
    var ov = document.getElementById("overlay");
    document.getElementById("ov-bild").innerHTML = kottenSvg(uttryck, "ov-kotten");
    document.getElementById("ov-titel").textContent = titel;
    document.getElementById("ov-text").textContent = text;
    var b = document.getElementById("ov-nasta");
    b.textContent = knapptext;
    b.onclick = function () { ov.hidden = true; vidare(); };
    ov.hidden = false;
    document.querySelectorAll(".ov-knappar .knapp.tyst").forEach(function (n) { n.remove(); });
    if (S.runda >= 1) {
      var t = document.createElement("button");
      t.className = "knapp tyst"; t.textContent = "Byt nivå";
      t.onclick = function () { ov.hidden = true; S.runda = S.runda >= 3 ? 1 : S.runda + 1; startaRunda(S.runda); };
      document.querySelector(".ov-knappar").appendChild(t);
    }
  }

  function startaRunda(runda) {
    runda = Math.min(3, Math.max(1, runda));
    S.runda = runda; S.skärm = "spel"; S.idx = 0; S.byggda = 0;
    S.uppg = väljUppgifter(runda);
    document.getElementById("startskarm").hidden = true;
    document.getElementById("spel").hidden = false;
    document.getElementById("overlay").hidden = true;
    nollställ(); ritaMolekyl(); nästaLedtråd();
    document.getElementById("rundtext").textContent = "Molekyl 1 av " + S.uppg.length;
    ritaStjärnor();
    spår("round_start");
    spår("level", runda);
    säg(runda === 1 ? "Bygg molekylen. Läs formeln och tryck på rätt grundämne." : "Nu blir molekylerna större. Läs formeln noga.");
  }

  function kottenByt(uttryck) {
    var gammal = document.getElementById("kotten");
    if (!gammal) return;
    var ny = document.createElement("span");
    ny.innerHTML = kottenSvg(uttryck);
    gammal.replaceWith(ny.firstChild);
  }

  /* ---------------- Händelser ---------------- */
  function bind() {
    document.querySelectorAll(".atom-knapp").forEach(function (k) {
      k.addEventListener("click", function () { tryckElement(k.dataset.el, k); });
    });
    svg.addEventListener("click", function (e) {
      var g = e.target.closest(".atom");
      if (!g) return;
      väljPlats(Number(g.dataset.i));
    });
    svg.addEventListener("keydown", function (e) {
      var g = e.target.closest(".atom");
      if (!g) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); väljPlats(Number(g.dataset.i)); }
    });
    document.getElementById("spela").addEventListener("click", function () { ljud(600, 0.1); startaRunda(1); });
    document.getElementById("hjalp").addEventListener("click", function () {
      if (S.skärm !== "spel") return;
      var m = aktuell();
      document.getElementById("kottentext").textContent =
        "Tryck på en atom i lådan. Den sätter sig på den blinkande platsen om den passar. " + m.namn + " består av " + sammansättningText(m) + ".";
      spår("hint"); kottenByt("tanker");
    });
    document.getElementById("ljud").addEventListener("click", function () {
      ljudPa = !ljudPa;
      if (!ljudPa && "speechSynthesis" in window) { try { window.speechSynthesis.cancel(); } catch (e) { } }
      ritaLjudIkon(); spår("sound_off");
    });
  }

  function ritaLjudIkon() {
    document.getElementById("ljudikon").innerHTML = ljudPa
      ? '<path d="M4 9h3l4-3v12l-4-3H4z"/><path d="M15 8a5 5 0 0 1 0 8"/>'
      : '<path d="M4 9h3l4-3v12l-4-3H4z"/><path d="M15 9l5 6M20 9l-5 6"/>';
  }

  function init() {
    bind(); ritaLjudIkon();
    kottenIkonFyll(document.querySelector(".kotten-hud"), "glad", "kotten-hud");
    kottenIkonFyll(document.getElementById("kotten"), "glad", "kotten-svg");
    window.__game = {
      S: S, MOLEKYLER: MOLEKYLER, räkna: räkna,
      startaRunda: startaRunda, väljPlats: väljPlats, tryckElement: tryckElement,
      nästaTom: nästaTom, ritaMolekyl: ritaMolekyl
    };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();