import { usePreferences } from '../hooks/usePreferences';
import { translations } from './translations';

export const useTranslation = () => {
	const { language } = usePreferences();
	return {
		language,
		t: translations[language],
	};
};

