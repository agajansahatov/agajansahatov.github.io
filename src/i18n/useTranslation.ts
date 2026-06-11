import { translations } from './translations';
import { useLanguage } from './useLanguage';

export const useTranslation = () => {
	const language = useLanguage();
	return {
		language,
		t: translations[language],
	};
};
