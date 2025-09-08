import express from 'express';
import cors from 'cors';
import { hydroResilienceRouter } from './hydro-resilience.ts';
import { metricsSnapshot } from './routes/metrics-snapshot.ts';
import { qgw } from './routes/qgw.ts';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/healthz', (_req, res) => res.json({ ok: true }));
app.get('/readyz', (_req, res) => res.json({ ready: true }));

app.use('/api/hydro', hydroResilienceRouter);
app.use('/api/metrics', metricsSnapshot);
app.use('/api/qgw', qgw);

const PORT = process.env.API_PORT ? Number(process.env.API_PORT) : 5175;
app.listen(PORT, () => {
  console.log(`API listening on :${PORT}`);
});
