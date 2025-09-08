// Minimaler Builder: Markdown → einfache HTML-Seite (Headings/Absätze/Codefences)
// Nutzung: `node tools/docops/build-presentation.mjs`
import fs from "fs";

const files = ["README.md","HANDBUCH.md","QUICKSTART.md","ARCHITECTURE.md","GOVERNANCE.md","AGENTS_WORKFLOW.md"];

function mdToHtml(md){
  const lines = md.split(/\r?\n/);
  let html = [], inCode = false;
  for (let ln of lines){
    if (ln.startsWith("```") ){ inCode=!inCode; html.push(inCode?"<pre><code>":"</code></pre>"); continue; }
    if (inCode){ html.push(ln.replace(/</g,"&lt;")); continue; }
    if (ln.startsWith("### ")) html.push("<h3>"+ln.slice(4)+"</h3>");
    else if (ln.startsWith("## ")) html.push("<h2>"+ln.slice(3)+"</h2>");
    else if (ln.startsWith("# ")) html.push("<h1>"+ln.slice(2)+"</h1>");
    else if (ln.trim().startsWith("- ")) html.push("<li>"+ln.trim().slice(2)+"</li>");
    else if (ln.trim()==="") html.push("");
    else html.push("<p>"+ln+"</p>");
  }
  return html.join("\n");
}

function build(){
  let body = "<html><head><meta charset='utf-8'><title>Mandala Docs</title>"
    + "<style>body{font-family:system-ui;max-width:820px;margin:24px auto;line-height:1.6}"
    + "pre{background:#f6f7f9;padding:8px;border-radius:6px;overflow:auto}"
    + "code{font-family:ui-monospace, SFMono-Regular, Menlo, monospace}"
    + "h1,h2{margin-top:24px}</style></head><body>";
  for (const f of files){
    if (!fs.existsSync(f)) continue;
    const md = fs.readFileSync(f,"utf-8");
    body += "\n<section>"+mdToHtml(md)+"</section>\n<hr/>\n";
  }
  body += "</body></html>";
  fs.writeFileSync("docs_bundle.html", body);
  console.log("Wrote docs_bundle.html");
}
build();
