import cron from "node-cron";
import { computeTeleImpact } from "../packages/hydro-watch/src";

cron.schedule("*/12 * * * * *", () => {
  const tele = computeTeleImpact({ nino34: 0.8, iod: -0.1, nao: 0.2, region:"nile" },
                                 { warn: 0.4, alarm: 0.7, direction: "two_sided" });
  console.log("🫀 tele-beacon", tele);
});
