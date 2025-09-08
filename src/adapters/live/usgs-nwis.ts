// USGS NWIS Daily Discharge (00060) → HVI-Eingang; Fallback auf Mock
export interface Series { ts: number[] }
export async function fetchDischargeSeries(site: string, startISO: string, endISO: string): Promise<Series> {
  const base = process.env.USGS_DV_URL ??
    "https://waterservices.usgs.gov/nwis/dv/?format=json&parameterCd=00060";
  const url = `${base}&sites=${encodeURIComponent(site)}&startDT=${startISO}&endDT=${endISO}`;
  try {
    const resp = await fetch(url, { method: "GET" });
    if (!resp.ok) throw new Error(String(resp.status));
    const json = await resp.json();
    const vals: number[] =
      json?.value?.timeSeries?.[0]?.values?.[0]?.value?.map((v: any) => Number(v.value)) ?? [];
    if (!vals.length) throw new Error("empty");
    return { ts: vals };
  } catch {
    // 365 Tage Demo-Sinus + Rauschen
    const N = 365; const arr = Array.from({ length: N }, (_, i) =>
      100 + 30 * Math.sin(i / 18) + Math.random() * 20);
    return { ts: arr };
  }
}
export function mean(a: number[]) { return a.reduce((s, x) => s + x, 0) / a.length }
export function variance(a: number[]) { const m = mean(a); return a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length }
export function hviFromSeries(ts: number[]) { const v = variance(ts); const m = mean(ts); return v / (m || 1) }
