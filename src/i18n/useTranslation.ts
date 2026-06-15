import { PORTFOLIO, getPortfolioName } from '../config/portfolio';
import { interpolate } from './interpolate';
import { translations } from './translations';
import { useLanguage } from './useLanguage';

export const useTranslation = () => {
	const language = useLanguage();
	const portfolioName = getPortfolioName(language);

	return {
		language,
		t: translations[language],
		portfolio: PORTFOLIO,
		portfolioName,
		interpolate: (text: string) => interpolate(text, { portfolioName }),
	};
};
