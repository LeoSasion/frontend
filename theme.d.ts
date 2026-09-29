export type ThemeId = 'light' | 'mint' | 'green' | 'orange';
export const themes: readonly Readonly<{ id: ThemeId; label: string }>[];
export function isTheme(value: unknown): value is ThemeId;
export function setTheme(theme: ThemeId, target?: Element): ThemeId;
export function saveTheme(theme: ThemeId, key?: string): void;
export function loadTheme(key?: string, fallback?: ThemeId): ThemeId;
