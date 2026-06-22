import {
	PORTFOLIO,
	getPortfolioFirstName,
	getPortfolioName,
} from '../config/portfolio';
import { interpolate } from './interpolate';
import { translations } from './translations';
import { useLanguage } from './useLanguage';

export const useTranslation = () => {
	const language = useLanguage();
	const portfolioName = getPortfolioName(language);
	const portfolioFirstName = getPortfolioFirstName(language);

	return {
		language,
		t: translations[language],
		portfolio: PORTFOLIO,
		portfolioName,
		portfolioFirstName,
		interpolate: (text: string) =>
			interpolate(text, { portfolioName, portfolioFirstName }),
	};
};
