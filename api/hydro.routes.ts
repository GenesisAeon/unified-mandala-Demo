import express from "express";
import { computeHVI, computeBLR, computeTeleImpact } from "../packages/hydro-watch/src";
import { TimePoint } from "../packages/hydro-watch/src/types";
import dayjs from "dayjs";

export function mountHydroRoutes(app: express.Express) {
  app.get("/api/kpi/hvi", (req, res) => {
    const series: TimePoint[] = Array.from({length: 30}, (_,i)=>({
      t: dayjs().subtract(29-i,"day").toISOString(),
      v: 5 + Math.sin(i/4)*2 + (Math.random()-0.5)*0.8
    }));
    const metric = computeHVI(series, { warn: 0.5, alarm: 0.8 });
    res.json(metric);
  });

  app.get("/api/kpi/blr", (req, res) => {
    const storage = 900;
    const demand  = 950;
    const metric = computeBLR(storage, demand, { warn: 1.2, alarm: 1.0, direction: "low_is_bad" });
    res.json(metric);
  });

  app.get("/api/kpi/tele", (req, res) => {
    const metric = computeTeleImpact(
      { nino34: 1.1, iod: 0.2, nao: -0.1, region: "nile" },
      { warn: 0.4, alarm: 0.7, direction: "two_sided" }
    );
    res.json(metric);
  });
}
