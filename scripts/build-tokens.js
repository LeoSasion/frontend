import { readFileSync, writeFileSync } from 'node:fs';
const tokens = JSON.parse(readFileSync(new URL('../tokens.json', import.meta.url)));
const darkThemes = new Set(['green', 'orange', 'dlss-dark']);
export const css = Object.entries(tokens).map(([id, values]) => `${id === 'light' ? ':where(:root), ' : ''}:where([data-pv-theme="${id}"]) {\n  color-scheme: ${darkThemes.has(id) ? 'dark' : 'light'};\n${Object.entries(values).map(([key, value]) => `  --pv-${key}: ${value};`).join('\n')}\n}`).join('\n\n') + '\n';
if (process.argv.includes('--check')) {
  if (readFileSync(new URL('../styles/tokens.css', import.meta.url), 'utf8') !== css) throw new Error('Run npm run build:tokens to synchronize CSS');
} else writeFileSync(new URL('../styles/tokens.css', import.meta.url), css);
