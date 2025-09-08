import fs from "fs";
import YAML from "yaml";

const repo = YAML.parse(fs.readFileSync("maps/RepoMap.yaml","utf8"));
const flow = YAML.parse(fs.readFileSync("maps/ProgramFlow.yaml","utf8"));

const mermaidRepo = `graph TD;\n${repo.modules.map(m => `  ${id(m.id)}["${m.id}\\n${esc(m.desc)}"]`).join("\n")}\n${repo.links.map(l => `  ${id(l.from)} -->|API| ${id(l.to)}`).join("\n")}\n`;

const mermaidFlow = `flowchart TD;\n${flow.flow.map((f,i)=>`  S${i}["${esc(f.step)}"]`).join("\n")}\n${flow.flow.map((_,i)=> i<flow.flow.length-1 ? `  S${i} --> S${i+1}` : ``).join("\n")}\n`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/maps.md", `# Maps\n\n## Repo\n\`\`\`mermaid\n${mermaidRepo}\n\`\`\`\n\n## Flow\n\`\`\`mermaid\n${mermaidFlow}\n\`\`\``);
console.log("Wrote docs/maps.md");

function id(s){ return s.replace(/[^a-z0-9]/gi,"_"); }
function esc(s){ return String(s||"").replace(/"/g,'\\"'); }
