import { Router } from "express";
import { getHVIFromUSGS } from "../../adapters/hydro-resilience/hvi-live";
import { getTeleconnectionsLive } from "../../adapters/hydro-resilience/tele-live";
export const metricsSnapshot = Router();

metricsSnapshot.get("/snapshot", async (_req, res) => {
  try {
    const [hvi, tele] = await Promise.all([
      getHVIFromUSGS(process.env.DEMO_USGS_SITE ?? "01184000", 180),
      getTeleconnectionsLive()
    ]);
    res.json({ hvi, tele });
  } catch (e:any) {
    res.status(500).json({ error: e.message });
  }
});
