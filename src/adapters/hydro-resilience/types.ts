export interface HydroVarianceIndex {
  region: string;
  value: number;            // σ/μ
  threshold_low: number;    // 🟢 stable
  threshold_high: number;   // 🔴 critical
  sigil: '🟢' | '🟠' | '🔴';
  timestamp: string;
}

export type ResourceKind = 'soil_moisture' | 'groundwater' | 'reservoir';

export interface BufferLoadRatio {
  resource: ResourceKind;
  region: string;
  buffer: number;   // available storage
  load: number;     // current demand
  ratio: number;    // buffer/load
  sigil: '💧' | '🧯'; // adequate | deficit
  timestamp: string;
}

export type TeleIdx = 'ENSO' | 'IOD' | 'NAO';

export interface TeleconnectionSignal {
  index: TeleIdx;
  phase: string;
  strength: number;     // -3..+3
  impact_score: number; // 0..1
  sigil: '🛰️';
  forecast_days: number;
  timestamp: string;
}

export interface InstitutionalStressProxy {
  region: string;
  price_anomaly: number;     // % deviation
  supply_disruption: number; // 0..1
  stress_level: 'low' | 'medium' | 'high';
  sigil: '🏛️' | '⚠️' | '🚨';
  timestamp: string;
}
