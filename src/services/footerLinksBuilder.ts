import { PORTFOLIO } from '../config/portfolio';
import { GITHUB_PROFILE } from '../config/github';
import type { TranslationDictionary } from '../i18n/translations';

export type FooterLink = {
	readonly link: string;
	readonly label: string;
	readonly target: '_self' | '_blank';
};

export type FooterLinkGroup = {
	readonly header: string;
	readonly links: readonly FooterLink[];
	readonly isHidden: boolean;
};

const LIVE_PROJECT_URLS = {
	gameHub: 'https://game-hub-three-kohl.vercel.app/',
	sada: 'https://agajansahatov.github.io/sada/',
	sozluk: 'https://agajansahatov.github.io/sozluk/',
	auroraTours: 'https://agajansahatov.github.io/aurora-tours/',
} as const;

export class FooterLinksBuilder {
	static build(translations: TranslationDictionary): readonly FooterLinkGroup[] {
		const { footer } = translations;

		return [
			{
				header: footer.services,
				links: [
					{
						link: '/#services1',
						label: footer.serviceLinks.frontEnd,
						target: '_self',
					},
					{
						link: '/#services2',
						label: footer.serviceLinks.backEnd,
						target: '_self',
					},
					{
						link: '/#services3',
						label: footer.serviceLinks.mobile,
						target: '_self',
					},
					{
						link: '/#services4',
						label: footer.serviceLinks.crossPlatform,
						target: '_self',
					},
				],
				isHidden: false,
			},
			{
				header: footer.projects,
				links: [
					{
						link: LIVE_PROJECT_URLS.gameHub,
						label: footer.projectLinks.gameHub,
						target: '_blank',
					},
					{
						link: LIVE_PROJECT_URLS.sada,
						label: footer.projectLinks.sada,
						target: '_blank',
					},
					{
						link: LIVE_PROJECT_URLS.sozluk,
						label: footer.projectLinks.sozluk,
						target: '_blank',
					},
					{
						link: LIVE_PROJECT_URLS.auroraTours,
						label: footer.projectLinks.auroraTours,
						target: '_blank',
					},
				],
				isHidden: true,
			},
			{
				header: footer.about,
				links: [
					{ link: '/', label: footer.aboutLinks.home, target: '_self' },
					{
						link: '/#section-showcase',
						label: footer.aboutLinks.whyWorkWithMe,
						target: '_self',
					},
					{
						link: `https://github.com/${GITHUB_PROFILE.username}/`,
						label: footer.aboutLinks.githubProfile,
						target: '_blank',
					},
					{
						link: `mailto:${PORTFOLIO.email}`,
						label: PORTFOLIO.email,
						target: '_self',
					},
				],
				isHidden: true,
			},
		] as const;
	}
}
