import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LanguageResolver } from '../../services/preferences/languageResolver';
import { LocalPreferencesStorage } from '../../services/preferences/localPreferencesStorage';
import { CachedGeoCountryService } from '../../services/preferences/cachedGeoCountryService';
import type { LanguageCode } from '../../types/preferences';

const languageResolver = new LanguageResolver(
	new LocalPreferencesStorage(),
	CachedGeoCountryService.instance,
);

const RootRedirect = () => {
	const [language, setLanguage] = useState<LanguageCode | null>(() =>
		languageResolver.resolveStoredLanguage(),
	);

	useEffect(() => {
		if (language) return;

		let isCancelled = false;
		void languageResolver.resolveInitialLanguage().then((resolvedLanguage) => {
			if (!isCancelled) setLanguage(resolvedLanguage);
		});

		return () => {
			isCancelled = true;
		};
	}, [language]);

	return language ? <Navigate to={`/${language}`} replace /> : null;
};

export default RootRedirect;
