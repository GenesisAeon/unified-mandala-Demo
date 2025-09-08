(() => {
  const el = document.getElementById("hydro-kpis");
  if (!el) return;

  const post = (p, body) => fetch(`/api/hydro/${p}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body)
  }).then(r => r.json());

  const cards = [];
  const addCard = (title, value, sigil) => {
    const c = document.createElement("div"); c.className="kpi-card";
    c.innerHTML = `<div class="kpi-title">${title}</div>
                   <div class="kpi-value">${value}</div>
                   <div class="kpi-sigil">${sigil}</div>`;
    el.appendChild(c); cards.push(c);
  };

  // Demo-Inputs (Mock)
  const hviIn = { region:"Nile Basin", values:[4500,4600,4400,3800,4200,3900,3700] };
  const blrIn = { storage:150, demand:200 };
  const telIn = { enso:1.2, iod:-0.8, nao:0.5, region:"Nile Basin" };

  Promise.all([
    post("hvi", hviIn),
    post("blr", blrIn),
    post("teleconnection", telIn),
  ]).then(([hvi, blr, tel]) => {
    addCard(`HVI (${hviIn.region})`, hvi.hvi ? hvi.hvi.toFixed(2) : hvi.data?.hvi?.toFixed(2), hvi.sigil || hvi.data?.sigil);
    addCard("BLR (groundwater)", blr.blr ? blr.blr.toFixed(2) : blr.data?.blr?.toFixed(2), blr.sigil || blr.data?.sigil);
    addCard("Teleconnection Impact", tel.score ? tel.score.toFixed(2) : tel.data?.score?.toFixed(2), tel.sigil || tel.data?.sigil);
  }).catch(err => {
    addCard("Hydro KPIs", "n/a", "💀");
    console.error(err);
  });
})();
