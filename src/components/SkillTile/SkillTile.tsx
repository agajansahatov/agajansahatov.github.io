import type { ComponentType, CSSProperties } from 'react';
import Icon from '../Icon';
import Link from '../Link';
import styles from './SkillTile.module.css';

type SkillTileProps = {
	readonly label: string;
	readonly icon: ComponentType;
	readonly href?: string;
	readonly iconColor?: string;
	readonly officialWebsiteLabel?: string;
};

const SkillTile = ({
	label,
	icon,
	href,
	iconColor,
	officialWebsiteLabel,
}: SkillTileProps) => {
	const content = (
		<>
			<Icon icon={icon} variant='default' className={styles.icon} />
			<span className={styles.label}>{label}</span>
		</>
	);

	if (!href) {
		return <div className={`${styles.tile} ${styles['tile--concept']}`}>{content}</div>;
	}

	const linkStyle = iconColor
		? ({ '--skill-tile-icon-color': iconColor } as CSSProperties)
		: undefined;

	return (
		<Link
			href={href}
			target='_blank'
			className={`${styles.tile} ${styles['tile--link']}`}
			style={linkStyle}
			aria-label={officialWebsiteLabel ?? label}
		>
			{content}
		</Link>
	);
};

export default SkillTile;
