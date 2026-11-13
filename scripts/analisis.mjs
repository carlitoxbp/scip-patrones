/* Analiza los datos crudos de la Fase 3 y escribe datos/resumen.json. */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "datos");
const read = (f) => readFileSync(path.join(dir, f), "utf8").replace(/^\uFEFF/, "").trim();
const rows = (f) => {
  const [head, ...body] = read(f).split(/\r?\n/);
  const keys = head.split(",");
  return body.map((line) => {
    const cells = line.split(",");
    return Object.fromEntries(keys.map((k, i) => [k, cells[i]]));
  });
};

/* ------------------------------ métricas estáticas ------------------------------ */
const met = rows("metricas_estaticas.csv").map((r) => ({
  version: r.version,
  modulo: r.modulo,
  loc: +r.loc,
  ccn: +r.ccn_max,
  mi: +r.mi,
  cbo: +r.cbo,
  cd: +r.cd,
}));

const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
const sd = (a) => {
  const m = mean(a);
  return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / (a.length - 1));
};

const byVersion = {};
for (const v of ["v0.1.0", "v1.0.0"]) {
  const set = met.filter((m) => m.version === v);
  byVersion[v] = {
    n: set.length,
    loc: set.reduce((s, m) => s + m.loc, 0),
    ccn: mean(set.map((m) => m.ccn)),
    mi: mean(set.map((m) => m.mi)),
    cbo: mean(set.map((m) => m.cbo)),
    cd: mean(set.map((m) => m.cd)),
    maxCcn: Math.max(...set.map((m) => m.ccn)),
  };
}

const delta = (a, b) => ((b - a) / a) * 100;
const metricas = {
  antes: byVersion["v0.1.0"],
  despues: byVersion["v1.0.0"],
  cambio: {
    ccn: delta(byVersion["v0.1.0"].ccn, byVersion["v1.0.0"].ccn),
    mi: delta(byVersion["v0.1.0"].mi, byVersion["v1.0.0"].mi),
    cbo: delta(byVersion["v0.1.0"].cbo, byVersion["v1.0.0"].cbo),
    cd: delta(byVersion["v0.1.0"].cd, byVersion["v1.0.0"].cd),
  },
  umbrales: {
    ccn: { limite: 10, antes: byVersion["v0.1.0"].ccn <= 10, despues: byVersion["v1.0.0"].ccn <= 10 },
    mi: { limite: 65, antes: byVersion["v0.1.0"].mi >= 65, despues: byVersion["v1.0.0"].mi >= 65 },
    cbo: { limite: 9, antes: byVersion["v0.1.0"].cbo <= 9, despues: byVersion["v1.0.0"].cbo <= 9 },
    cd: { limite: 3, antes: byVersion["v0.1.0"].cd <= 3, despues: byVersion["v1.0.0"].cd <= 3 },
  },
};

/* ---------------------------------- encuesta ---------------------------------- */
const enc = rows("encuesta_respuestas.csv").map((r) => ({
  id: r.id,
  exp: +r.experiencia_anios,
  items: Array.from({ length: 13 }, (_, i) => +r[`q${i + 1}`]),
}));

const alpha = (matrix) => {
  const k = matrix[0].length;
  const cols = Array.from({ length: k }, (_, j) => matrix.map((r) => r[j]));
  const sumVar = cols.reduce((s, c) => s + sd(c) ** 2, 0);
  const totals = matrix.map((r) => r.reduce((s, v) => s + v, 0));
  return (k / (k - 1)) * (1 - sumVar / sd(totals) ** 2);
};

const dims = [
  { id: "D1", nombre: "Claridad de la síntesis", rango: [0, 4] },
  { id: "D2", nombre: "Utilidad para decidir", rango: [4, 9] },
  { id: "D3", nombre: "Aplicabilidad al proyecto", rango: [9, 13] },
];

const encuesta = {
  n: enc.length,
  experienciaMedia: mean(enc.map((e) => e.exp)),
  dimensiones: dims.map((d) => {
    const sub = enc.map((e) => e.items.slice(...d.rango));
    const personMean = sub.map((r) => mean(r));
    return {
      id: d.id,
      nombre: d.nombre,
      items: d.rango[1] - d.rango[0],
      media: mean(personMean),
      sd: sd(personMean),
      alpha: alpha(sub),
    };
  }),
  alphaGlobal: alpha(enc.map((e) => e.items)),
  items: enc[0].items.map((_, j) => ({
    item: `q${j + 1}`,
    media: mean(enc.map((e) => e.items[j])),
    sd: sd(enc.map((e) => e.items[j])),
  })),
};
encuesta.mediaGlobal = mean(enc.map((e) => mean(e.items)));
encuesta.sdGlobal = sd(enc.map((e) => mean(e.items)));

/* ---------------------------------- auditoría ---------------------------------- */
const aud = rows("auditoria_42010.csv");
const count = (r) => aud.filter((a) => a.resultado === r).length;
const auditoria = {
  total: aud.length,
  cumple: count("Cumple"),
  parcial: count("Parcial"),
  noCumple: count("No cumple"),
  pleno: (count("Cumple") / aud.length) * 100,
  ponderado: ((count("Cumple") + 0.5 * count("Parcial")) / aud.length) * 100,
  dimensiones: ["D1", "D2", "D3", "D4"].map((d) => {
    const set = aud.filter((a) => a.dimension === d);
    return {
      id: d,
      total: set.length,
      cumple: set.filter((a) => a.resultado === "Cumple").length,
      parcial: set.filter((a) => a.resultado === "Parcial").length,
    };
  }),
  hallazgos: aud.filter((a) => a.resultado !== "Cumple").map((a) => a.item),
};

/* ---------------------------------- lighthouse -------------------------------- */
const lh = rows("lighthouse.csv");
const lighthouse = {
  movil: Object.fromEntries(lh.filter((r) => r.dispositivo === "movil").map((r) => [r.categoria, +r.valor])),
  escritorio: Object.fromEntries(lh.filter((r) => r.dispositivo === "escritorio").map((r) => [r.categoria, +r.valor])),
};

/* ----------------------------------- salida ----------------------------------- */
const out = { metricas, encuesta, auditoria, lighthouse };
writeFileSync(path.join(dir, "resumen.json"), JSON.stringify(out, null, 2), "utf8");

const f = (n, d = 2) => n.toFixed(d).replace(".", ",");
console.log("MÉTRICAS");
for (const k of ["ccn", "mi", "cbo", "cd"]) {
  console.log(` ${k}: ${f(metricas.antes[k])} -> ${f(metricas.despues[k])} (${f(metricas.cambio[k], 1)} %)`);
}
console.log(` LOC API: ${metricas.antes.loc} -> ${metricas.despues.loc}`);
console.log(` CCN máximo: ${metricas.antes.maxCcn} -> ${metricas.despues.maxCcn}`);
console.log("ENCUESTA");
console.log(` n=${encuesta.n} exp media=${f(encuesta.experienciaMedia, 1)} alpha=${f(encuesta.alphaGlobal)}`);
for (const d of encuesta.dimensiones) console.log(` ${d.id}: media=${f(d.media)} sd=${f(d.sd)} alpha=${f(d.alpha)}`);
console.log(` media global=${f(encuesta.mediaGlobal)}`);
console.log(" items:", encuesta.items.map((i) => `${i.item}=${f(i.media)}`).join(" "));
console.log("AUDITORÍA");
console.log(` ${auditoria.cumple}/${auditoria.total} cumple, ${auditoria.parcial} parcial, ${auditoria.noCumple} no cumple`);
console.log(` pleno=${f(auditoria.pleno, 1)} % ponderado=${f(auditoria.ponderado, 1)} %`);
