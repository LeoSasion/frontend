export const themes = Object.freeze([
  Object.freeze({ id: 'light', label: '清雅白紫' }),
  Object.freeze({ id: 'mint', label: '雾光薄荷' }),
  Object.freeze({ id: 'green', label: '暗夜黑绿' }),
  Object.freeze({ id: 'orange', label: '经典黑橙' }),
  Object.freeze({ id: 'dlss-dark', label: 'DLSS 光谱深色' }),
  Object.freeze({ id: 'dlss-light', label: 'DLSS 银灰浅色' }),
]);
export function isTheme(value) { return themes.some(theme => theme.id === value); }
/** No DOM access on import; call in a browser or pass a target element. */
export function setTheme(theme, target = globalThis.document?.documentElement) {
  if (!isTheme(theme)) throw new TypeError(`Unknown PixelVault theme: ${theme}`);
  if (!target) throw new Error('setTheme requires a DOM element');
  target.setAttribute('data-pv-theme', theme);
  return theme;
}
/** Persistence is optional. Storage failures never prevent switching themes. */
export function saveTheme(theme, key = 'pixelvault-style-theme') {
  if (!isTheme(theme)) throw new TypeError(`Unknown PixelVault theme: ${theme}`);
  try { globalThis.localStorage?.setItem(key, theme); } catch { /* unavailable storage */ }
}
export function loadTheme(key = 'pixelvault-style-theme', fallback = 'light') {
  if (!isTheme(fallback)) throw new TypeError('Invalid fallback theme');
  try { const stored = globalThis.localStorage?.getItem(key); return isTheme(stored) ? stored : fallback; }
  catch { return fallback; }
}
