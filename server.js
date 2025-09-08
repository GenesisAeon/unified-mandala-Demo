const express = require("express");
const fs = require("fs");
const path = require("path");
const pino = require("pino");
const pinoHttp = require("pino-http");

const app = express();
const logger = pino({ level: process.env.LOG_LEVEL || "info" });
app.use(pinoHttp({ logger }));
const PORT = process.env.PORT || 3000;

// ---- Laufzeit-Ethik (minimaler Hook)
const POLICY = fs.readFileSync(path.join(__dirname, "policies/AI_POLICY.md"), "utf8");
app.use((req, res, next) => {
  if (req.headers["x-ai-action"] === "dangerous") {
    return res.status(403).json({ allow: false, reason: "AI_POLICY deny (demo)" });
  }
  next();
});

// ---- Static UI
app.use(express.static(path.join(__dirname, "public")));

// ---- Health & Readiness
app.get("/healthz", (_, res) => res.json({ ok: true, policy_sha: hash(POLICY) }));
app.get("/readyz", (_, res) => {
  const kpiOk = fs.existsSync(path.join(__dirname, "data/kpis.json"));
  res.json({ ready: kpiOk });
});

// ---- KPIs (Mock)
app.get("/api/kpi/list", (_, res) => {
  const raw = fs.readFileSync(path.join(__dirname, "data/kpis.json"), "utf8");
  const kpis = JSON.parse(raw);
  res.json({ items: kpis, ts: new Date().toISOString() });
});

// ---- CREP Resonanz (aus Seed + simple Score)
app.get("/api/crep/resonance", (_, res) => {
  const seed = JSON.parse(fs.readFileSync(path.join(__dirname, "data/crep.seed.json"), "utf8"));
  const score = (seed.coherence + seed.resonance + seed.emergence + seed.poetics) / 4;
  const sigil = score >= 0.7 ? "🟢" : score >= 0.4 ? "🟠" : "🔴";
  res.json({ ...seed, score: +score.toFixed(3), sigil });
});

// ---- SPA Fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ---- Beacon Herzschlag (Log alle 12s)
setInterval(() => {
  logger.info({ heartbeat: true }, "🫀");
}, 12_000);

// ---- Start
app.listen(PORT, () => {
  logger.info(`UnifiedMandala Lite listening on http://localhost:${PORT}`);
});

// ---- mini-Hash (ohne deps)
function hash(s) {
  let h = 0,
    i = 0,
    len = s.length;
  while (i < len) {
    h = (h << 5) - h + s.charCodeAt(i++) | 0;
  }
  return (h >>> 0).toString(16);
}
