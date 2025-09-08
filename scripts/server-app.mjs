import express from "express";
import fs from "node:fs";
import path from "node:path";
import pino from "pino";
import pinoHttp from "pino-http";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function createApp(opts = {}) {
  const ROOT = opts.rootDir || path.resolve(__dirname, "..");
  const DATA = opts.dataDir || path.join(ROOT, "data", "demo");
  const DIST = opts.distDir || path.join(ROOT, "apps", "mandala-ui", "dist");
  const enableBeacon = !!opts.beacon;
  const QGW = path.join(ROOT, "data", "qgw", "claims.json");

  const app = express();
  const logger = pino({ level: process.env.LOG_LEVEL || "info" });
  app.use(pinoHttp({ logger }));

  // Static UI
  app.use(express.static(DIST));

  // API: KPI list (mock)
  app.get("/api/kpi/list", (_req, res) => {
    try {
      const fp = path.join(DATA, "kpis.json");
      if (!fs.existsSync(fp)) return res.json({ items: [] });
      const raw = fs.readFileSync(fp, "utf8");
      const kpis = JSON.parse(raw);
      res.json({ items: kpis, ts: new Date().toISOString() });
    } catch (e) {
      res.status(500).json({ error: "kpi_read_failed", detail: String(e) });
    }
  });

  // API: CREP Resonance
  app.get("/api/crep/resonance", (_req, res) => {
    try {
      const seedPath = path.join(DATA, "crep.seed.json");
      const seed = JSON.parse(fs.readFileSync(seedPath, "utf8"));
      const score = (seed.coherence + seed.resonance + seed.emergence + seed.poetics) / 4;
      const sigil = score >= 0.7 ? "🟢" : score >= 0.4 ? "🟠" : "🔴";
      res.json({ ...seed, score: +score.toFixed(3), sigil });
    } catch (e) {
      res.status(500).json({ error: "crep_read_failed", detail: String(e) });
    }
  });

  // API: Quantum-Gravity Watch (Seeds)
  app.get("/api/qgw/list", (_req, res) => {
    try {
      if (!fs.existsSync(QGW)) return res.json({ claims: [] });
      const claims = JSON.parse(fs.readFileSync(QGW, "utf8"));
      res.json({ claims, count: Array.isArray(claims) ? claims.length : 0 });
    } catch (e) {
      res.status(500).json({ error: "qgw_read_failed", detail: String(e) });
    }
  });

  // Health & Ready
  app.get("/healthz", (_req, res) => res.json({ ok: true }));
  app.get("/readyz", (_req, res) => {
    const ok = fs.existsSync(path.join(DATA, "kpis.json")) &&
      fs.existsSync(path.join(DATA, "resonance_trace.json"));
    res.status(ok ? 200 : 503).json({ ok });
  });

  // SPA fallback
  app.get("*", (_req, res) => {
    res.sendFile(path.join(DIST, "index.html"));
  });

  if (enableBeacon) {
    setInterval(() => {
      logger.info({ heartbeat: true }, "🫀");
    }, 12_000);
  }

  return app;
}
