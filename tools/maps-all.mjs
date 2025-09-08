import fs from "fs";
import YAML from "yaml";

const repo = YAML.parse(fs.readFileSync("maps/RepoMap.yaml", "utf8"));
const flow = YAML.parse(fs.readFileSync("maps/ProgramFlow.yaml", "utf8"));

// export JSON versions
fs.writeFileSync("maps/RepoMap.json", JSON.stringify(repo, null, 2));
fs.writeFileSync("maps/ProgramFlow.json", JSON.stringify(flow, null, 2));

const mermaidRepo = `graph TD;
${repo.modules.map(m => `  ${id(m.id)}["${m.id}\n${esc(m.desc)}"]`).join("\n")}
${repo.links.map(l => `  ${id(l.from)} -->|API| ${id(l.to)}`).join("\n")}
`;

const mermaidFlow = `flowchart TD;
${flow.flow.map((f,i)=>`  S${i}["${esc(f.step)}"]`).join("\n")}
${flow.flow.map((_,i)=> i<flow.flow.length-1 ? `  S${i} --> S${i+1}` : ``).join("\n")}
`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/maps.md", `# Maps\n\n## Repo\n\`\`\`mermaid\n${mermaidRepo}\n\`\`\`\n\n## Flow\n\`\`\`mermaid\n${mermaidFlow}\n\`\`\`\n`);
console.log("Wrote docs/maps.md and JSON maps.");

function id(s){ return s.replace(/[^a-z0-9]/gi,"_"); }
function esc(s){ return String(s||"").replace(/"/g,'\\"'); }
