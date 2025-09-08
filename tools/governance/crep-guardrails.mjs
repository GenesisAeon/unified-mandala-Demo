import 'dotenv/config';
import fs from 'fs';
import cp from 'child_process';
import YAML from 'yaml';
import path from 'path';

const cfgPath = 'tools/governance/crep-guardrails.config.yaml';
const cfg = fs.existsSync(cfgPath) ? YAML.parse(fs.readFileSync(cfgPath,'utf8')) : {};
const git = (c)=>cp.execSync(`git ${c}`, {encoding:'utf8'}).trim();
const changedRaw = git('diff --name-only HEAD~1..HEAD').split('\n').filter(Boolean);
const ignore = (cfg.ignore?.paths || []).map(p=>new RegExp('^'+p.replace(/\*\*/g,'.*').replace(/\*/g,'[^/]*')+'$'));
const changed = changedRaw.filter(f=>!ignore.some(rx=>rx.test(f)));

const violations=[];
const sev = g => (cfg.severity?.[g] || 'medium').toLowerCase();
const sigilSet = cfg.sigils || [];
const sigilReg = new RegExp(sigilSet.join('|'));
const kpiReg = /kpi|metric|dashboard/i;
const apiReg = /openai|anthropic|mistral/i;
const nameReg = /function handle\d+|const data\d+|class Manager\d+|\/\/\s*TODO.*fix.*hack/i;

for(const f of changed){
  const txt = fs.existsSync(f)? fs.readFileSync(f,'utf8'): '';
  if(/sigil|symbol|\.sigillin/i.test(f)){
    if(!/symbol:\s*["']/.test(txt) || !sigilReg.test(txt))
      violations.push(['CREP',f,'Sigil format inconsistent or unknown symbol']);
  }
  if(kpiReg.test(f)){
    if(cfg.kpi_sigils_required !== false && kpiReg.test(txt) && !sigilReg.test(txt))
      violations.push(['CREP',f,'KPI without Sigil mapping']);
  }
  if(path.basename(f)==='package.json'){
    try{
      const cur=JSON.parse(txt);
      const prev=JSON.parse(git(`show HEAD~1:${f}`));
      const nM=parseInt(cur.version.split('.')[0]), pM=parseInt(prev.version.split('.')[0]);
      if(nM>pM && cfg.major_bump_requires_docs !== false){
        const hasDocs=changed.some(x=>/ritual|CHANGELOG|BREAKING/i.test(x));
        if(!hasDocs) violations.push(['CREP',f,'Major version bump without ritual/changelog docs']);
      }
    }catch{}
  }
  if(/\.(ts|js|tsx|jsx)$/.test(f) && nameReg.test(txt)){
    violations.push(['Naming',f,'Mechanistic naming/comments detected']);
  }
  if(/(ai|llm|agent)/i.test(f) || /\.(ts|js|py)$/.test(f)){
    if(apiReg.test(txt) && !/AI_POLICY|ethic/i.test(txt))
      violations.push(['Ethics',f,'AI API usage without explicit policy/ethics reference']);
  }
  if(/\.sigillin$|sigil-message/i.test(f)){
    try{
      const msg=YAML.parse(txt);
      if(!msg.symbol||!msg.intent||!msg.context) violations.push(['Sigillin',f,'Missing required fields']);
      if(msg.intent && !(cfg.valid_intents||['query','assert','ritual']).includes(msg.intent))
        violations.push(['Sigillin',f,`Invalid intent '${msg.intent}'`]);
      if(msg.symbol && sigilSet.length && !sigilSet.includes(msg.symbol))
        violations.push(['Sigillin',f,`Unknown symbol '${msg.symbol}'`]);
    }catch{ violations.push(['Sigillin',f,'Invalid YAML format']); }
  }
}

console.log('🌀 Running CREP-Guardrails…');
for(const [g,f,m] of violations){
  const msg=`[${g}/${sev(g)}] ${f}: ${m}`;
  sev(g)==='high'? console.error(msg): console.warn(msg);
}

const mode=(process.env.CREP_GUARDRAILS_MODE||cfg.mode||'soft').toLowerCase();
const th=(process.env.CREP_FAIL_ON||cfg.fail_on_severity_at_least||'high').toLowerCase();
const ord=['low','medium','high'];
const fail = mode==='hard'? violations.length>0 :
             mode==='auto'? violations.some(v=>ord.indexOf(sev(v[0]))>=ord.indexOf(th)) : false;
if(violations.length) console.log(`\n${mode==='soft'?'🌱 Soft-fail':fail?'❌ Hard-fail':'ℹ️ Pass'}: ${violations.length} issue(s) found.`);
else console.log('✅ CREP-Resonance: All principles aligned 🟢');
process.exit(fail?1:0);
