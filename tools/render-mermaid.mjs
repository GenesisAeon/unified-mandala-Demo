import fs from 'node:fs';

const flow = JSON.parse(fs.readFileSync('maps/ProgramFlow.json','utf8'));
const steps = flow.flow.map(f => f.step);
const width = 200 * steps.length + 40;
const height = 120;
let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7"/></marker></defs>`;
steps.forEach((step,i)=>{
  const x = 20 + i*200;
  svg += `<rect x="${x}" y="40" width="160" height="40" fill="#fff" stroke="#000"/>`;
  svg += `<text x="${x+80}" y="65" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14">${step}</text>`;
  if(i < steps.length-1){
    svg += `<line x1="${x+160}" y1="60" x2="${x+200}" y2="60" stroke="#000" marker-end="url(#arrow)"/>`;
  }
});
svg += `</svg>`;
fs.mkdirSync('docs',{recursive:true});
fs.writeFileSync('docs/ProgramFlow.svg', svg);
console.log('Wrote docs/ProgramFlow.svg');
