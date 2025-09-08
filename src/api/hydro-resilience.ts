import { Router } from "express";

const router = Router();

// simple mock implementations; real adapters can bind later
router.get("/hvi/:region", (req, res) => {
  const { region } = req.params;
  const values = Array.from({ length: 365 }, () => 100 + Math.random() * 40);
  const mu = values.reduce((a,b)=>a+b,0)/values.length;
  const s2 = values.reduce((a,b)=>a+(b-mu)*(b-mu),0)/values.length;
  const hvi = Math.sqrt(s2)/mu;
  const sigil = hvi < 0.3 ? "🟢" : hvi < 0.6 ? "🟠" : "🔴";
  res.json({ success:true, data:{ region, value:hvi, sigil, timestamp:new Date().toISOString() }});
});

router.get("/blr/:resource/:region", (req, res) => {
  const { resource, region } = req.params;
  const buffer = 100 + Math.random()*80;
  const load   = 90 + Math.random()*90;
  const ratio  = buffer / load;
  const sigil  = ratio >= 1.2 ? "💧" : ratio > 0.8 ? "🚨" : "🧯";
  res.json({ success:true, data:{ resource, region, buffer, load, ratio, sigil, timestamp:new Date().toISOString() }});
});

router.get("/teleconnections", (_req, res) => {
  const oni = (Math.random()*2-1)*1.5;
  const score = Math.min(Math.abs(oni)*0.3 + 0.2, 1);
  res.json({ success:true, data:[{ index:"ENSO", phase: oni<-0.5?"La Niña":oni>0.5?"El Niño":"Neutral", strength:oni, impact_score:score, sigil:"🛰️", forecast_days:90, timestamp:new Date().toISOString() }]});
});

export { router as hydroResilienceRouter };
