import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { themes, isTheme, setTheme, loadTheme, saveTheme } from '../theme.js';
const tokens = JSON.parse(readFileSync(new URL('../tokens.json', import.meta.url)));
test('all themes provide the same complete, isolated token contract', () => {
  const keys = Object.keys(tokens.light).sort();
  for (const {id} of themes) {
    assert.deepEqual(Object.keys(tokens[id]).sort(), keys);
    for (const value of Object.values(tokens[id])) {
      for (const [, ref] of value.matchAll(/var\(--pv-([\w-]+)\)/g)) assert.ok(ref in tokens[id], `${id}: ${ref}`);
    }
  }
});
test('theme switching validates IDs and works with explicit targets without DOM', () => {
  const target = { setAttribute(k,v) { this[k]=v; } };
  for (const {id} of themes) { setTheme(id,target); assert.equal(target['data-pv-theme'],id); }
  assert.equal(isTheme('unknown'),false);
  assert.throws(()=>setTheme('unknown',target),TypeError);
  assert.throws(()=>setTheme('light'),/DOM element/);
});
test('storage is optional and access denial is tolerated', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis,'localStorage');
  try {
    Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw new Error('blocked');}});
    saveTheme('green'); assert.equal(loadTheme(),'light');
  } finally { if(descriptor) Object.defineProperty(globalThis,'localStorage',descriptor); else delete globalThis.localStorage; }
});
test('original primary colors and green glass are preserved', () => {
  assert.equal(tokens.light.primary,'hsl(262 80% 55%)');
  assert.equal(tokens.mint.primary,'#116f5c');
  assert.equal(tokens.green.primary,'#75f59b');
  assert.equal(tokens.orange.primary,'#ff6a00');
  assert.equal(tokens.green.blur,'blur(20px)');
});
