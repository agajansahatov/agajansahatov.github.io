import type { ComponentType, KeyboardEvent } from 'react';
import Badge from '../Badge';
import Icon from '../Icon';
import type { SkinVariant } from '../types';
import styles from './DocumentActionCard.module.css';

type DocumentActionCardProps = {
	readonly title: string;
	readonly description: string;
	readonly icon: ComponentType;
	readonly variant?: SkinVariant;
	readonly onAction?: () => void;
	readonly isDisabled?: boolean;
	readonly unavailableNote?: string;
};

const DocumentActionCard = ({
	title,
	description,
	icon,
	variant = 'primary',
	onAction,
	isDisabled = false,
	unavailableNote,
}: DocumentActionCardProps) => {
	const handleClick = () => {
		if (isDisabled) return;
		onAction?.();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (isDisabled) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onAction?.();
		}
	};

	const classNames = [
		styles.card,
		styles[`card--${variant}`],
		isDisabled ? styles['card--disabled'] : '',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<div
			className={classNames}
			role='button'
			tabIndex={isDisabled ? -1 : 0}
			aria-disabled={isDisabled}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<Icon icon={icon} variant={variant} className={styles.icon} />

			<div className={styles.content}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.description}>{description}</p>
				{unavailableNote ? (
					<Badge
						skinVariant='warning'
						size='small'
						className={styles.unavailable}
					>
						{unavailableNote}
					</Badge>
				) : null}
			</div>
		</div>
	);
};

export default DocumentActionCard;
