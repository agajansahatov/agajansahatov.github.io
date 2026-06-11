import type { Breakpoint, NavItem } from '../../config/navigation';
import styles from './Navbar.module.css';

const NAVBAR_FROM_CLASS: Record<Breakpoint, string> = {
	sm: styles['navbar__item--from-sm'],
	md: styles['navbar__item--from-md'],
};

const SIDEBAR_BELOW_CLASS: Record<Breakpoint | 'always', string> = {
	sm: styles['sidebar__item--below-sm'],
	md: styles['sidebar__item--below-md'],
	always: styles['sidebar__item--always'],
};

export const getNavbarItemClassName = (item: NavItem): string =>
	item.navbarFrom === null
		? styles['navbar__item--hidden']
		: NAVBAR_FROM_CLASS[item.navbarFrom];

export const getSidebarItemClassName = (item: NavItem): string =>
	SIDEBAR_BELOW_CLASS[item.sidebarBelow];
