import React from "react";
import { KpiBoard } from "./components/KpiBoard";
import { CrepResonanceCard } from "./components/CrepResonanceCard";
import { QgwWatchCard } from "./components/QgwWatchCard";

export default function App() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mandala Climate Dashboard</h1>
      <CrepResonanceCard />
      <KpiBoard />
      <QgwWatchCard />
    </div>
  );
}
