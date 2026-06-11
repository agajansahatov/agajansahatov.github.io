import type { ComponentType } from 'react';
import type { SkinVariant } from '../types';
import styles from './Icon.module.css';

interface Props {
	icon: ComponentType | string;
	variant?: SkinVariant;
	className?: string;
	isSmall?: boolean;
	/** Overrides variant foreground color (e.g. brand icon colors). */
	foregroundColor?: string;
}

const Icon = ({
	icon,
	variant = 'default',
	className = '',
	isSmall = false,
	foregroundColor,
}: Props) => {
	const classNames = [styles.icon];
	if (variant) classNames.push(styles[`icon--${variant}`]);
	if (className) classNames.push(className);
	if (isSmall) classNames.push(styles['icon--small']);

	const isImage = typeof icon === 'string';

	return (
		<span
			className={classNames.join(' ')}
			style={foregroundColor ? { color: foregroundColor } : undefined}
		>
			{isImage ? (
				<img src={icon} alt='' className={styles.icon__image} />
			) : (
				(() => {
					const IconComponent = icon;
					return <IconComponent />;
				})()
			)}
		</span>
	);
};

export default Icon;
