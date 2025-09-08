import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import pino from 'pino';
import pinoHttp from 'pino-http';

const require = createRequire(import.meta.url);
require('ts-node').register({ transpileOnly: true, compilerOptions: { allowImportingTsExtensions: true, module: 'commonjs' } });
const { hydroResilienceRouter } = require('../src/api/hydro-resilience.ts');
const { metricsSnapshot } = require('../src/api/routes/metrics-snapshot.ts');
const { qgw } = require('../src/api/routes/qgw.ts');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
app.use(pinoHttp({ logger }));
const PORT = process.env.PORT || 3000;

// ---- Laufzeit-Ethik
const POLICY = fs.readFileSync(path.join(__dirname, '../policies/AI_POLICY.md'), 'utf8');
app.use((req, res, next) => {
  if (req.headers['x-ai-action'] === 'dangerous') {
    return res.status(403).json({ allow: false, reason: 'AI_POLICY deny (demo)' });
  }
  next();
});

// ---- API Routes
app.use('/api/hydro', hydroResilienceRouter);
app.use('/api/metrics', metricsSnapshot);
app.use('/api/qgw', qgw);

const DATA = path.join(__dirname, '../data');
app.get('/api/kpi/list', (_req, res) => {
  const raw = fs.readFileSync(path.join(DATA, 'kpis.json'), 'utf8');
  const kpis = JSON.parse(raw);
  res.json({ items: kpis, ts: new Date().toISOString() });
});

app.get('/api/crep/resonance', (_req, res) => {
  const seed = JSON.parse(fs.readFileSync(path.join(DATA, 'crep.seed.json'), 'utf8'));
  const score = (seed.coherence + seed.resonance + seed.emergence + seed.poetics) / 4;
  const sigil = score >= 0.7 ? '🟢' : score >= 0.4 ? '🟠' : '🔴';
  res.json({ ...seed, score: +score.toFixed(3), sigil });
});

// ---- Static UI
const PUBLIC = path.join(__dirname, '../public');
app.use(express.static(PUBLIC));

// ---- Health & Readiness
app.get('/healthz', (_req, res) => res.json({ ok: true, policy_sha: hash(POLICY) }));
app.get('/readyz', (_req, res) => {
  const kpiOk = fs.existsSync(path.join(DATA, 'kpis.json'));
  res.json({ ready: kpiOk });
});

// ---- SPA Fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'));
});

// ---- Beacon Herzschlag
setInterval(() => {
  logger.info({ heartbeat: true }, '🫀');
}, 12_000);

app.listen(PORT, () => {
  logger.info(`UnifiedMandala Lite listening on http://localhost:${PORT}`);
});

function hash(s) {
  let h = 0, i = 0, len = s.length;
  while (i < len) {
    h = (h << 5) - h + s.charCodeAt(i++) | 0;
  }
  return (h >>> 0).toString(16);
}
