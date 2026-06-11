export type NavItemId =
	| 'home'
	| 'experience'
	| 'projects'
	| 'resumeCv'
	| 'expertise'
	| 'about'
	| 'contact'
	| 'settings';

export type Breakpoint = 'sm' | 'md';

export type NavItem = {
	readonly id: NavItemId;
	readonly href: string;
	readonly target: '_self' | '_blank';
	readonly navbarFrom: Breakpoint | null;
	readonly sidebarBelow: Breakpoint | 'always';
};

export const NAV_ITEMS: readonly NavItem[] = [
	{
		id: 'home',
		href: '/',
		target: '_self',
		navbarFrom: 'md',
		sidebarBelow: 'sm',
	},
	{
		id: 'experience',
		href: '/experience',
		target: '_self',
		navbarFrom: 'md',
		sidebarBelow: 'md',
	},
	{
		id: 'projects',
		href: '/projects',
		target: '_self',
		navbarFrom: 'md',
		sidebarBelow: 'md',
	},
	{
		id: 'resumeCv',
		href: '/resume-cv',
		target: '_self',
		navbarFrom: 'sm',
		sidebarBelow: 'sm',
	},
	{
		id: 'expertise',
		href: '/expertise',
		target: '_self',
		navbarFrom: null,
		sidebarBelow: 'always',
	},
	{
		id: 'about',
		href: '/about',
		target: '_self',
		navbarFrom: null,
		sidebarBelow: 'always',
	},
	{
		id: 'contact',
		href: '/contact',
		target: '_self',
		navbarFrom: null,
		sidebarBelow: 'always',
	},
	{
		id: 'settings',
		href: '/settings',
		target: '_self',
		navbarFrom: null,
		sidebarBelow: 'always',
	},
] as const;

export const ROUTES = {
	home: '/',
	experience: '/experience',
	projects: '/projects',
	resumeCv: '/resume-cv',
	expertise: '/expertise',
	contact: '/contact',
	pricing: '/pricing',
	about: '/about',
	settings: '/settings',
} as const;
