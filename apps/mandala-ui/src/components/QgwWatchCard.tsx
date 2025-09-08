import React from "react";
import { usePolling } from "../hooks/usePolling";

type Claim = {
  id: string;
  title: string;
  axis: string;
  evidence: string;
  sigils?: string[];
  updated?: string;
};

type Resp = { claims: Claim[]; count: number };

export function QgwWatchCard() {
  const { data, error, refresh } = usePolling<Resp>(async () => {
    const r = await fetch("/api/qgw/list");
    if (!r.ok) throw new Error("qgw fetch failed");
    return r.json();
  }, 12000);

  if (error) return <div className="p-4 rounded bg-red-50 text-red-800">QGW Error</div>;
  if (!data) return <div className="p-4 rounded bg-gray-100 animate-pulse">QGW lädt…</div>;

  return (
    <div className="p-4 rounded-2xl border bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Quantum-Gravity Watch</div>
          <div className="text-xs text-gray-500">{data.count} Einträge</div>
        </div>
        <button onClick={refresh} className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200">↻</button>
      </div>
      <ul className="mt-3 space-y-2">
        {data.claims.slice(0, 5).map(c => (
          <li key={c.id} className="text-sm">
            <div className="font-medium">{c.title}</div>
            <div className="text-xs text-gray-500">
              {c.axis} · {c.evidence} {c.updated ? `· ${new Date(c.updated).toLocaleDateString()}` : ""}
            </div>
            {c.sigils?.length ? (
              <div className="text-lg leading-none mt-1">{c.sigils.join(" ")}</div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
