import { Threshold, Sigil } from "./types";

export function toSigil(value: number, th: Threshold): Sigil {
  const dir = th.direction ?? "high_is_bad";
  if (dir === "high_is_bad") {
    if (value >= th.alarm) return "🔴";
    if (value >= th.warn)  return "🟠";
    return "🟢";
  }
  if (dir === "low_is_bad") {
    if (value <= th.alarm) return "🔴";
    if (value <= th.warn)  return "🟠";
    return "🟢";
  }
  // two-sided: Abweichung um einen Zielwert = 0
  const av = Math.abs(value);
  if (av >= th.alarm) return "🔴";
  if (av >= th.warn)  return "🟠";
  return "🟢";
}
