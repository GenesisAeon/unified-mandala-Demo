import { TimePoint, HVIMetric, Threshold } from "./types";
import { toSigil } from "./sigil";

export function computeHVI(series: TimePoint[], th: Threshold): HVIMetric {
  if (series.length < 2) throw new Error("HVI: need >=2 points");
  const vals = series.map(p => p.v);
  const mean = vals.reduce((a,b)=>a+b,0) / vals.length;
  const var_ = vals.reduce((a,b)=>a + (b-mean)**2, 0) / (vals.length-1);
  const stdev = Math.sqrt(var_);
  const hvi = stdev / (mean || 1e-9);
  return { mean, stdev, hvi, sigil: toSigil(hvi, th) };
}
