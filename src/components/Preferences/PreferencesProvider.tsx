import {
	useCallback,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { withLanguagePrefix } from '../../i18n/languagePath';
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
	readonly themeResolver?: ThemeResolver;
};

const defaultStorage = new LocalPreferencesStorage();
const defaultThemeResolver = new ThemeResolver();

export const PreferencesProvider = ({
	children,
	storage = defaultStorage,
	themeResolver = defaultThemeResolver,
}: PreferencesProviderProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const [themeMode, setThemeModeState] = useState<ThemeMode>(() =>
		storage.readThemeMode(),
	);

	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
		themeResolver.resolve(themeMode),
	);

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
			const nextPath = withLanguagePrefix(location.pathname, nextLanguage);
			navigate(`${nextPath}${location.search}${location.hash}`);
		},
		[storage, navigate, location.pathname, location.search, location.hash],
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
			setLanguage,
			themeMode,
			setThemeMode,
			resolvedTheme,
		}),
		[resolvedTheme, setLanguage, setThemeMode, themeMode],
	);

	return (
		<PreferencesContext.Provider value={value}>
			{children}
		</PreferencesContext.Provider>
	);
};
