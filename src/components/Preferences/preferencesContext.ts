import { createContext } from 'react';
import type { LanguageCode, ResolvedTheme, ThemeMode } from '../../types/preferences';

export type PreferencesContextValue = {
	readonly language: LanguageCode;
	readonly setLanguage: (language: LanguageCode) => void;
	readonly themeMode: ThemeMode;
	readonly setThemeMode: (themeMode: ThemeMode) => void;
	readonly resolvedTheme: ResolvedTheme;
};

export const PreferencesContext =
	createContext<PreferencesContextValue | null>(null);
