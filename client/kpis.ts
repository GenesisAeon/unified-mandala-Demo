type Card = { title: string; value: string; sigil: string; subtitle?: string };
export async function loadCards(base = ""): Promise<Card[]> {
  const [hvi, blr, tele] = await Promise.all([
    fetch(base+"/api/kpi/hvi").then(r=>r.json()),
    fetch(base+"/api/kpi/blr").then(r=>r.json()),
    fetch(base+"/api/kpi/tele").then(r=>r.json()),
  ]);
  return [
    {
      title:"Hydro-Varianz-Index",
      value: hvi.hvi.toFixed(2),
      sigil: hvi.sigil,
      subtitle: `μ=${hvi.mean.toFixed(2)} σ=${hvi.stdev.toFixed(2)}`
    },
    {
      title:"Buffer/Load",
      value: blr.ratio.toFixed(2),
      sigil: blr.sigil,
      subtitle: `S=${blr.storage} D=${blr.demand}`
    },
    {
      title:"Teleconnection",
      value: tele.score.toFixed(2),
      sigil: tele.sigil,
      subtitle: `ENSO/IOD/NAO`
    }
  ];
}
