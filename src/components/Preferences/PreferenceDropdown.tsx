import { useEffect, useId, useRef, type ReactNode } from 'react';
import { LuLanguages, LuSunMoon, LuX } from 'react-icons/lu';
import { useTranslation } from '../../i18n';
import IconButton from '../Button/IconButton';
import SettingsControls from './SettingsControls';
import styles from './PreferencesMenu.module.css';

type PreferenceVariant = 'language' | 'theme';

type PreferenceDropdownProps = {
	readonly variant: PreferenceVariant;
	readonly isOpen: boolean;
	readonly onOpen: () => void;
	readonly onClose: () => void;
	readonly className?: string;
};

const VARIANT_ICONS: Record<PreferenceVariant, ReactNode> = {
	language: <LuLanguages size={22} />,
	theme: <LuSunMoon size={22} />,
};

const PreferenceDropdown = ({
	variant,
	isOpen,
	onOpen,
	onClose,
	className,
}: PreferenceDropdownProps) => {
	const menuId = useId();
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const { t } = useTranslation();

	const labels =
		variant === 'language'
			? {
					title: t.nav.language,
					open: t.nav.openLanguage,
					close: t.nav.closeLanguage,
				}
			: {
					title: t.nav.theme,
					open: t.nav.openTheme,
					close: t.nav.closeTheme,
				};

	useEffect(() => {
		if (!isOpen) return;

		const handlePointerDown = (event: PointerEvent) => {
			if (!wrapperRef.current?.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
				buttonRef.current?.focus();
			}
		};

		window.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	return (
		<div
			className={`${styles.menu} ${className ?? ''}`.trim()}
			ref={wrapperRef}
		>
			<IconButton
				ref={buttonRef}
				aria-label={isOpen ? labels.close : labels.open}
				aria-expanded={isOpen}
				aria-controls={menuId}
				onClick={() => (isOpen ? onClose() : onOpen())}
				title={labels.title}
			>
				{isOpen ? <LuX size={22} /> : VARIANT_ICONS[variant]}
			</IconButton>

			<div
				id={menuId}
				className={`${styles.panel} ${isOpen ? styles.open : ''}`}
				role='dialog'
				aria-label={labels.title}
				inert={!isOpen ? true : undefined}
			>
				<h2 className={styles.title}>{labels.title}</h2>
				<SettingsControls isCompact variant={variant} />
			</div>
		</div>
	);
};

export default PreferenceDropdown;
