import fs from "fs";
import YAML from "yaml";
const legendPath = "src/config/sigil-legend.yaml";
const outDir = "public/gallery";
fs.mkdirSync(outDir, { recursive:true });
const legend = YAML.parse(fs.readFileSync(legendPath,"utf8"));
const rows = [];
for (const [domain, groups] of Object.entries(legend)) {
  for (const [group, entries] of Object.entries(groups)) {
    for (const [sigil, meaning] of Object.entries(entries)) {
      rows.push(`<tr><td>${domain}/${group}</td><td style="font-size:20px">${sigil}</td><td>${meaning}</td></tr>`);
    }
  }
}
const html = `<!doctype html><meta charset="utf-8"><title>Sigillin Gallery</title>
<link rel="stylesheet" href="/css/styles.css">
<h1>Sigillin Gallery</h1>
<table class="table"><thead><tr><th>Domain/Group</th><th>Sigil</th><th>Bedeutung</th></tr></thead>
<tbody>${rows.join("")}</tbody></table>`;
fs.writeFileSync(`${outDir}/index.html`, html);
console.log("✅ Gallery built → public/gallery/index.html");
