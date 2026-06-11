import { useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useTranslation } from '../../i18n';
import { NAV_ITEMS } from '../../config/navigation';
import BurgerButton from '../../components/Button/BurgerButton';
import IconButton from '../../components/Button/IconButton';
import Link from '../../components/Link';
import Logo from '../../components/Logo';
import { PreferencesMenu } from '../../components/Preferences';
import {
	getNavbarItemClassName,
	getSidebarItemClassName,
} from './navItemClassNames';
import styles from './Navbar.module.css';

const Navbar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const openButtonRef = useRef<HTMLButtonElement | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);
	const { t } = useTranslation();

	const openSidebar = () => setIsSidebarOpen(true);

	const closeSidebar = () => {
		setIsSidebarOpen(false);
		requestAnimationFrame(() => openButtonRef.current?.focus());
	};

	const toggleSidebar = () => {
		if (isSidebarOpen) {
			closeSidebar();
		} else {
			openSidebar();
		}
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closeSidebar();
		};

		if (isSidebarOpen) {
			document.body.style.overflow = 'hidden';
			window.addEventListener('keydown', handleKeyDown);
			requestAnimationFrame(() => closeButtonRef.current?.focus());
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSidebarOpen]);

	return (
		<>
			<nav className={styles.navbar}>
				<Logo href='/' shouldHideTitleOnSmallScreens />

				<ul className={styles.navbar__items}>
					{NAV_ITEMS.map((item) => (
						<li
							key={item.id}
							className={`${styles.navbar__item} ${getNavbarItemClassName(item)} link-underline`}
						>
							<Link
								href={item.href}
								target={item.target}
								activeClassName={styles['navbar__item--active']}
							>
								{t.nav.items[item.id]}
							</Link>
						</li>
					))}
				</ul>

				<div className={styles.navbar__actions}>
					<PreferencesMenu
						className={`${styles['navbar-top']} ${styles['navbar__preferences']}`}
					/>

					<BurgerButton
						ref={openButtonRef}
						className={styles.navbar__toggler}
						isActive={isSidebarOpen}
						aria-label={
							isSidebarOpen ? t.nav.closeMenu : t.nav.openMenu
						}
						aria-expanded={isSidebarOpen}
						aria-controls='mobile-menu'
						onClick={toggleSidebar}
					/>
				</div>
			</nav>

			<div
				className={`${styles.overlay} ${
					isSidebarOpen ? styles['overlay--active'] : ''
				}`}
				onClick={closeSidebar}
				aria-hidden='true'
			/>

			<aside
				id='mobile-menu'
				role='dialog'
				aria-modal='true'
				aria-label={t.nav.mobileMenu}
				className={`${styles.sidebar} ${
					isSidebarOpen ? styles['sidebar--active'] : ''
				}`}
				inert={!isSidebarOpen ? true : undefined}
			>
				<div className={styles.sidebar__header}>
					<Logo
						href='/'
						onClick={closeSidebar}
						titleClassName={styles['sidebar__logo-title']}
					/>

					<IconButton
						ref={closeButtonRef}
						aria-label={t.nav.closeMenu}
						aria-expanded={isSidebarOpen}
						aria-controls='mobile-menu'
						onClick={closeSidebar}
					>
						<AiOutlineClose size={22} />
					</IconButton>
				</div>

				<PreferencesMenu
					className={styles['sidebar__preferences']}
					placement='sidebar'
				/>

				<ul className={styles.sidebar__items}>
					{NAV_ITEMS.map((item) => (
						<li
							key={item.id}
							className={`${styles.sidebar__item} ${getSidebarItemClassName(item)}`}
						>
							<Link
								href={item.href}
								target={item.target}
								onClick={closeSidebar}
								activeClassName={styles['sidebar__item--active']}
								className='link-underline'
							>
								{t.nav.items[item.id]}
							</Link>
						</li>
					))}
				</ul>
			</aside>
		</>
	);
};

export default Navbar;
