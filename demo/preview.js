import { themes, setTheme, saveTheme, loadTheme } from '../theme.js';
const select = document.querySelector('#theme');
select.value = setTheme(loadTheme());
select.addEventListener('change', () => { setTheme(select.value); saveTheme(select.value); });
for (const [token, label] of [['background','背景'],['surface','面板'],['primary','主色'],['accent','强调'],['foreground','正文'],['border','边框']]) {
  const item = document.createElement('div');
  const swatch = document.createElement('div'); swatch.className = 'swatch'; swatch.style.background = `var(--pv-${token})`;
  const caption = document.createElement('small'); caption.textContent = label;
  item.append(swatch, caption); document.querySelector('#palette').append(item);
}
for (const theme of themes) {
  const sample = document.createElement('div'); sample.className = 'pv-scope pv-shell sample'; setTheme(theme.id, sample);
  const title = document.createElement('h3'); title.textContent = theme.label;
  const card = document.createElement('div'); card.className = 'pv-card'; card.textContent = '独立主题区域 · 原始颜色与材质';
  sample.append(title, card); document.querySelector('#compare').append(sample);
}
document.querySelector('#form').addEventListener('submit', event => { event.preventDefault(); document.querySelector('#feedback').textContent = `已保存演示方案：${document.querySelector('#name').value}（仅页面演示）`; });
document.querySelector('#form').addEventListener('reset', () => { document.querySelector('#feedback').textContent = '输入名称后可试用保存反馈。'; });
document.querySelector('#glass').addEventListener('change', event => {
  document.querySelectorAll('.pv-card').forEach(card => card.classList.toggle('pv-glass', event.target.checked));
});
