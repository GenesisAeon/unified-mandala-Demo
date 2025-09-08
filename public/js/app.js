async function loadJSON(u){ const r=await fetch(u); return r.json(); }

function badge(sig){ return sig === "🟢" ? '<span class="badge ok">🟢 OK</span>' :
                               sig === "🟠" ? '<span class="badge warn">🟠 WARN</span>' :
                                              '<span class="badge alarm">🔴 ALARM</span>'; }

async function render() {
  const hz = await (await fetch('/healthz')).json();
  const rz = await (await fetch('/readyz')).json();
  document.getElementById('status').textContent =
    `healthz: ${hz.ok ? 'ok' : 'fail'} • readyz: ${rz.ready ? 'ready' : 'not ready'} • policy=${hz.policy_sha}`;

  const crep = await loadJSON('/api/crep/resonance');
  document.getElementById('crep').innerHTML =
    `<div class="kpi"><div><div class="muted">CREP Resonanz</div>
      <div style="font-size:14px">C ${crep.coherence} • R ${crep.resonance} • E ${crep.emergence} • P ${crep.poetics}</div>
    </div><div>${badge(crep.sigil)}</div></div>
    <div class="muted">score=${crep.score} • ${crep.note || ''}</div>`;

  const kpis = (await loadJSON('/api/kpi/list')).items;
  document.getElementById('kpis').innerHTML = kpis.map(k =>
    `<div class="card">
       <div class="kpi">
         <div>
           <div class="muted">${k.id}</div>
           <div>${k.label}</div>
         </div>
         <div class="sigil" title="${k.sigil}">${k.sigil}</div>
       </div>
       <div style="margin-top:6px;display:flex;justify-content:space-between;align-items:center;">
         <div>${k.value} ${k.unit}</div>
         <div class="${k.status}">${k.status.toUpperCase()}</div>
       </div>
       <div class="muted" style="margin-top:6px;">updated ${k.lastUpdated}</div>
     </div>`
  ).join('');
}
render(); setInterval(render, 15000);
