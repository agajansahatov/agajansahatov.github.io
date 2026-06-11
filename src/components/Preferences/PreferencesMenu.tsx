import { useState } from 'react';
import PreferenceDropdown from './PreferenceDropdown';
import styles from './PreferencesMenu.module.css';

type OpenMenu = 'language' | 'theme' | null;

type PreferencesMenuProps = {
	readonly className?: string;
	readonly placement?: 'navbar' | 'sidebar';
};

const PreferencesMenu = ({
	className,
	placement = 'navbar',
}: PreferencesMenuProps) => {
	const [openMenu, setOpenMenu] = useState<OpenMenu>(null);

	const placementClass =
		placement === 'sidebar' ? styles['group--sidebar'] : '';

	return (
		<div
			className={`${styles.group} ${placementClass} ${className ?? ''}`.trim()}
		>
			<PreferenceDropdown
				className={styles['language-switch']}
				variant='language'
				isOpen={openMenu === 'language'}
				onOpen={() => setOpenMenu('language')}
				onClose={() => setOpenMenu(null)}
			/>
			<PreferenceDropdown
				className={styles['theme-switch']}
				variant='theme'
				isOpen={openMenu === 'theme'}
				onOpen={() => setOpenMenu('theme')}
				onClose={() => setOpenMenu(null)}
			/>
		</div>
	);
};

export default PreferencesMenu;
