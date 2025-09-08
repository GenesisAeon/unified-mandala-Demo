import { Router } from 'express';
import { calculateHVI, HVIInput } from '../../adapters/hydro-variance.ts';
import { calculateBLR, BLRInput } from '../../adapters/buffer-load.ts';
import { calculateImpactScore, TeleconnectionInput } from '../../adapters/teleconnection-watch.ts';
import { calculateStress, StressInput } from '../../adapters/institutional-stress.ts';

export const hydroResilienceRouter = Router();

// Demo GET endpoints with mock payloads
hydroResilienceRouter.get('/hvi/:region', (_req, res) => {
  res.json(calculateHVI({ region: 'Nile Basin', values: [4500,4600,4400,3800,4200,3900,3700] }));
});

hydroResilienceRouter.get('/blr/:resource/:region', (_req, res) => {
  res.json(calculateBLR({ storage: 150, demand: 200 }));
});

hydroResilienceRouter.get('/teleconnections', (_req, res) => {
  res.json(calculateImpactScore({ enso: 1.2, iod: -0.8, nao: 0.5, region: 'Nile Basin' }));
});

hydroResilienceRouter.get('/stress/:region', (_req, res) => {
  res.json(calculateStress({ priceAnomaly: 15.3, harvestAnomaly: 10, supplyChainDelay: 4 }));
});

// POST endpoints for custom payloads
hydroResilienceRouter.post('/hvi', (req, res) => {
  res.json(calculateHVI(req.body as HVIInput));
});

hydroResilienceRouter.post('/blr', (req, res) => {
  res.json(calculateBLR(req.body as BLRInput));
});

hydroResilienceRouter.post('/teleconnection', (req, res) => {
  res.json(calculateImpactScore(req.body as TeleconnectionInput));
});

hydroResilienceRouter.post('/stress', (req, res) => {
  res.json(calculateStress(req.body as StressInput));
});
