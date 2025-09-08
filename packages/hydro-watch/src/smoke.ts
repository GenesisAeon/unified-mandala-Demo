import { computeHVI, computeBLR, computeTeleImpact } from "./index";

console.log("HVI", computeHVI(
  Array.from({length: 10}, (_,i)=>({t:`t${i}`, v: i%2?6:4 })),
  { warn: 0.5, alarm: 0.8 }
));

console.log("BLR", computeBLR(900, 950, { warn: 1.2, alarm: 1.0, direction: "low_is_bad" }));

console.log("TELE", computeTeleImpact(
  { nino34: 1.0, iod: 0.3, nao: 0.1, region:"nile" },
  { warn: 0.4, alarm: 0.7, direction: "two_sided" }
));
