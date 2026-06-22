import type { LanguageCode } from '../types/preferences';

export type PortfolioPhoneRegion = 'turkmenistan' | 'china';

export const PORTFOLIO = {
	legalName: 'Agajan Sahatov',
	names: {
		en: 'Agajan Sahatov',
		tk: 'Agajan Sahatow',
		zh: '阿哥战',
		tr: 'Ağacan Sahatov',
		ru: 'Агаджан Сахатов',
	},
	firstNames: {
		en: 'Agajan',
		tk: 'Agajan',
		zh: '阿哥战',
		tr: 'Ağacan',
		ru: 'Агаджан',
	},
	country: 'Turkmenistan',
	address: 'Mary, Turkmenistan',
	phones: {
		turkmenistan: '+99365083466',
		china: '+8613259400802',
	},
	email: 'agajansahatovofficial@gmail.com',
} as const;

export function getPortfolioName(language: LanguageCode): string {
	return PORTFOLIO.names[language];
}

export function getPortfolioFirstName(language: LanguageCode): string {
	return PORTFOLIO.firstNames[language];
}

export function getPortfolioLegalName(): string {
	return PORTFOLIO.legalName;
}

export function getPortfolioLegalNameSlug(): string {
	return PORTFOLIO.legalName.replace(/\s+/g, '-');
}

export function getPortfolioInitials(): string {
	return PORTFOLIO.legalName
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part.charAt(0).toUpperCase())
		.join('');
}

export function getPortfolioPhone(region: PortfolioPhoneRegion): string {
	return PORTFOLIO.phones[region];
}

export function getPortfolioPhoneLink(region: PortfolioPhoneRegion): string {
	return `tel:${PORTFOLIO.phones[region]}`;
}

export function getPortfolioMailtoLink(): string {
	return `mailto:${PORTFOLIO.email}`;
}
