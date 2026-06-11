import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { DEFAULT_LANGUAGE_CODE } from '../../config/preferences';
import {
	CountryIsGeoCountryService,
	LanguageResolver,
	type GeoCountryServicePort,
} from '../../services/preferences/languageResolver';
import {
	LocalPreferencesStorage,
	type PreferencesStoragePort,
} from '../../services/preferences/localPreferencesStorage';
import { ThemeResolver } from '../../services/preferences/themeResolver';
import type { LanguageCode, ResolvedTheme, ThemeMode } from '../../types/preferences';
import { PreferencesContext } from './preferencesContext';

type PreferencesProviderProps = {
	readonly children: ReactNode;
	readonly storage?: PreferencesStoragePort;
	readonly geoCountryService?: GeoCountryServicePort;
	readonly themeResolver?: ThemeResolver;
};

const defaultStorage = new LocalPreferencesStorage();
const defaultGeoCountryService = new CountryIsGeoCountryService();
const defaultThemeResolver = new ThemeResolver();

export const PreferencesProvider = ({
	children,
	storage = defaultStorage,
	geoCountryService = defaultGeoCountryService,
	themeResolver = defaultThemeResolver,
}: PreferencesProviderProps) => {
	const languageResolver = useMemo(
		() => new LanguageResolver(storage, geoCountryService),
		[geoCountryService, storage],
	);

	const [language, setLanguageState] = useState<LanguageCode>(() => {
		return (
			languageResolver.resolveStoredLanguage() ??
			languageResolver.resolveBrowserLanguage() ??
			DEFAULT_LANGUAGE_CODE
		);
	});

	const [themeMode, setThemeModeState] = useState<ThemeMode>(() =>
		storage.readThemeMode(),
	);

	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
		themeResolver.resolve(themeMode),
	);

	useEffect(() => {
		if (typeof document === 'undefined') return;
		document.documentElement.lang = language;
	}, [language]);

	useEffect(() => {
		const applyResolvedTheme = () => {
			const nextTheme = themeResolver.resolve(themeMode);
			setResolvedTheme(nextTheme);
			themeResolver.apply(nextTheme);
		};

		applyResolvedTheme();

		if (themeMode !== 'system') return;
		return themeResolver.subscribeToSystemChanges(applyResolvedTheme);
	}, [themeMode, themeResolver]);

	const setLanguage = useCallback(
		(nextLanguage: LanguageCode) => {
			storage.writeLanguage(nextLanguage);
			setLanguageState(nextLanguage);
		},
		[storage],
	);

	const setThemeMode = useCallback(
		(nextThemeMode: ThemeMode) => {
			storage.writeThemeMode(nextThemeMode);
			setThemeModeState(nextThemeMode);
		},
		[storage],
	);

	const value = useMemo(
		() => ({
			language,
			setLanguage,
			themeMode,
			setThemeMode,
			resolvedTheme,
		}),
		[language, resolvedTheme, setLanguage, setThemeMode, themeMode],
	);

	return (
		<PreferencesContext.Provider value={value}>
			{children}
		</PreferencesContext.Provider>
	);
};
