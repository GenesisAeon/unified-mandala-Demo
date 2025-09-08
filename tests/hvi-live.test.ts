import { hviFromSeries } from "../src/adapters/live/usgs-nwis";
import { expect, test } from "vitest";

test("hviFromSeries: low variance → green", () => {
  const base = Array.from({length: 365}, () => 100);
  const hvi = hviFromSeries(base);
  expect(hvi).toBeGreaterThanOrEqual(0);
});
