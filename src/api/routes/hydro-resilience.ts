import { Router } from 'express';
import { HydroVarianceAdapter, BufferLoadAdapter, TeleconnectionAdapter, InstitutionalStressAdapter } from '../../adapters/hydro-resilience/index.js';

export const hydroResilienceRouter = Router();

hydroResilienceRouter.get('/hvi/:region', async (req, res) => {
  try {
    const adapter = new HydroVarianceAdapter();
    const data = await adapter.getHVI(req.params.region);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

hydroResilienceRouter.get('/blr/:resource/:region', async (req, res) => {
  try {
    const adapter = new BufferLoadAdapter();
    const data = await adapter.getBLR(req.params.resource as any, req.params.region);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

hydroResilienceRouter.get('/teleconnections', async (_req, res) => {
  try {
    const adapter = new TeleconnectionAdapter();
    const data = await adapter.getTeleconnectionSignals();
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

hydroResilienceRouter.get('/stress/:region', async (req, res) => {
  try {
    const adapter = new InstitutionalStressAdapter();
    const data = await adapter.getStressProxies(req.params.region);
    res.json({ success: true, data });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});
