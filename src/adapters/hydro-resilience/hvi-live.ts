import { fetchDischargeSeries, hviFromSeries } from "../live/usgs-nwis";

export async function getHVIFromUSGS(site: string, days = 365) {
  const end = new Date(); const start = new Date(end.getTime() - days * 864e5);
  const sISO = start.toISOString().slice(0,10); const eISO = end.toISOString().slice(0,10);
  const { ts } = await fetchDischargeSeries(site, sISO, eISO);
  const hvi = hviFromSeries(ts);
  const sigil = hvi <= 0.3 ? "🟢" : hvi <= 0.6 ? "🟠" : "🔴";
  return { site, days, hvi, sigil, timestamp: new Date().toISOString() };
}
