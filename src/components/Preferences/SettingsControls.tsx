import { LuChevronDown } from 'react-icons/lu';
import { LANGUAGE_OPTIONS, THEME_OPTIONS } from '../../config/preferences';
import { usePreferences } from '../../hooks/usePreferences';
import { useTranslation } from '../../i18n';
import styles from './SettingsControls.module.css';

type SettingsControlsVariant = 'all' | 'language' | 'theme';

type SettingsControlsProps = {
	readonly className?: string;
	readonly isCompact?: boolean;
	readonly variant?: SettingsControlsVariant;
};

const SettingsControls = ({
	className,
	isCompact = false,
	variant = 'all',
}: SettingsControlsProps) => {
	const { setLanguage, themeMode, setThemeMode } = usePreferences();
	const { language, t } = useTranslation();
	const showLanguage = variant === 'all' || variant === 'language';
	const showTheme = variant === 'all' || variant === 'theme';

	return (
		<div
			className={[
				styles.controls,
				isCompact ? styles.compact : '',
				className ?? '',
			]
				.filter(Boolean)
				.join(' ')}
		>
			{showLanguage ? (
			<label className={styles.field}>
				<span className={styles.label}>{t.settings.languageLabel}</span>
				<div className={styles.selectWrap}>
					<select
						className={styles.select}
						value={language}
						onChange={(event) =>
							setLanguage(event.target.value as typeof language)
						}
					>
						{LANGUAGE_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.nativeLabel}
							</option>
						))}
					</select>
					<span className={styles.selectIcon} aria-hidden='true'>
						<LuChevronDown />
					</span>
				</div>
				{!isCompact ? (
					<span className={styles.hint}>{t.settings.languageHint}</span>
				) : null}
			</label>
			) : null}

			{showTheme ? (
			<label className={styles.field}>
				<span className={styles.label}>{t.settings.themeLabel}</span>
				<div className={styles.selectWrap}>
					<select
						className={styles.select}
						value={themeMode}
						onChange={(event) =>
							setThemeMode(event.target.value as typeof themeMode)
						}
					>
						{THEME_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{t.themes[option.labelKey as keyof typeof t.themes]}
							</option>
						))}
					</select>
					<span className={styles.selectIcon} aria-hidden='true'>
						<LuChevronDown />
					</span>
				</div>
				{!isCompact ? (
					<span className={styles.hint}>{t.settings.themeHint}</span>
				) : null}
			</label>
			) : null}
		</div>
	);
};

export default SettingsControls;

