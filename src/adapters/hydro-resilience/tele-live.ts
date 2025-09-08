import { fetchONI, oniToSignal } from "../live/noaa-cpc";

export async function getTeleconnectionsLive() {
  const oni = await fetchONI();
  const enso = oniToSignal(oni);
  // Optional: IOD/NAO analog ergänzen, aktuell ENSO reicht fürs Demo
  return [enso]; // [{ index:"ENSO", phase:"La Niña", strength:-1.2, updated:... }]
}
