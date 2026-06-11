import { DEFAULT_THEME_MODE } from '../../config/preferences';
import type { ResolvedTheme, ThemeMode } from '../../types/preferences';

export class ThemeResolver {
	static readonly darkModeMediaQuery = '(prefers-color-scheme: dark)';

	resolve(themeMode: ThemeMode): ResolvedTheme {
		if (themeMode === 'light' || themeMode === 'dark') return themeMode;
		return this.prefersDark() ? 'dark' : 'light';
	}

	apply(theme: ResolvedTheme): void {
		if (typeof document === 'undefined') return;
		document.documentElement.setAttribute('data-theme', theme);
	}

	subscribeToSystemChanges(onChange: () => void): () => void {
		if (typeof window === 'undefined' || !window.matchMedia) {
			return () => undefined;
		}

		const mediaQuery = window.matchMedia(ThemeResolver.darkModeMediaQuery);
		mediaQuery.addEventListener('change', onChange);
		return () => mediaQuery.removeEventListener('change', onChange);
	}

	private prefersDark(): boolean {
		if (typeof window === 'undefined' || !window.matchMedia) {
			return DEFAULT_THEME_MODE === 'dark';
		}

		return window.matchMedia(ThemeResolver.darkModeMediaQuery).matches;
	}
}
