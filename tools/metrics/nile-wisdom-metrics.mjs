import client from 'prom-client';
import express from 'express';

const registry = new client.Registry();
client.collectDefaultMetrics({ register: registry });

const hviGauge = new client.Gauge({
  name: 'mandala_nile_hvi_variance_ratio',
  help: 'Hydro Variance Index (σ/μ)',
  labelNames: ['region', 'sigil', 'historical_reference'],
  registers: [registry],
});

const blrGauge = new client.Gauge({
  name: 'mandala_nile_buffer_load_ratio',
  help: 'Buffer/Load ratio',
  labelNames: ['resource', 'region', 'sigil', 'ancient_parallel'],
  registers: [registry],
});

const teleGauge = new client.Gauge({
  name: 'mandala_nile_teleconnection_impact',
  help: 'Teleconnection impact score',
  labelNames: ['index', 'phase', 'strength_category'],
  registers: [registry],
});

const stressGauge = new client.Gauge({
  name: 'mandala_nile_institutional_stress',
  help: 'Institutional stress proxy',
  labelNames: ['region', 'stress_level', 'sigil'],
  registers: [registry],
});

const beaconCounter = new client.Counter({
  name: 'mandala_beacon_heartbeats_total',
  help: 'Total beacon heartbeats',
  labelNames: ['sigil', 'phase'],
  registers: [registry],
});

const beaconLatency = new client.Histogram({
  name: 'mandala_beacon_latency_seconds',
  help: 'Beacon processing latency',
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1.0],
  registers: [registry],
});

function updateHVIMetrics(items) {
  for (const m of items) {
    const ref = m.value <= 0.3 ? 'stable_nile' : m.value <= 0.6 ? 'intermediate_period' : m.value <= 1.0 ? 'approaching_42ka' : 'collapse_threshold';
    hviGauge.set({ region: m.region, sigil: m.sigil, historical_reference: ref }, m.value);
  }
}

function updateBLRMetrics(items) {
  for (const m of items) {
    const parallel = m.value < 1 ? 'dry_fayyum' : 'abundant_delta';
    blrGauge.set({ resource: m.resource || 'composite', region: m.region, sigil: m.sigil, ancient_parallel: parallel }, m.value);
  }
}

function updateTeleMetrics(items) {
  for (const s of items) {
    const strength = Math.abs(s.strength) > 1 ? 'strong' : Math.abs(s.strength) > 0.5 ? 'moderate' : 'weak';
    teleGauge.set({ index: s.index, phase: s.phase.toLowerCase().replace(' ', '_'), strength_category: strength }, s.impact_score);
  }
}

function updateStressMetrics(items) {
  for (const s of items) {
    const val = s.stress_level === 'low' ? 0 : s.stress_level === 'medium' ? 1 : 2;
    stressGauge.set({ region: s.region, stress_level: s.stress_level, sigil: s.sigil }, val);
  }
}

function startBeacon(cadenceSec = 12) {
  setInterval(() => {
    const t0 = Date.now();
    beaconCounter.inc({ sigil: '🫀', phase: 'heartbeat' });
    beaconLatency.observe((Date.now() - t0) / 1000);
  }, cadenceSec * 1000);
}

const demoHVI = [
  { region: 'Nile-Delta', value: 0.45, sigil: '🟠' },
  { region: 'Rhine-Basin', value: 0.28, sigil: '🟢' },
  { region: 'Colorado-Basin', value: 0.85, sigil: '🔴' },
];
const demoBLR = [
  { region: 'Fayyum-Analogue', value: 0.7, sigil: '🧯', resource: 'groundwater' },
  { region: 'Rhine-Valley', value: 1.2, sigil: '💧', resource: 'reservoir' },
];
const demoTele = [
  { index: 'ENSO', phase: 'La Niña', strength: -1.2, impact_score: 0.36 },
  { index: 'IOD', phase: 'Positive', strength: 0.8, impact_score: 0.2 },
];
const demoStress = [
  { region: 'Mediterranean', stress_level: 'medium', sigil: '⚠️' },
  { region: 'MENA', stress_level: 'high', sigil: '🚨' },
];

updateHVIMetrics(demoHVI);
updateBLRMetrics(demoBLR);
updateTeleMetrics(demoTele);
updateStressMetrics(demoStress);
startBeacon();

const app = express();
app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', registry.contentType);
  res.end(await registry.metrics());
});
app.listen(9464, () => {
  console.log('📊 Prometheus metrics on http://localhost:9464/metrics');
});
