import type { ReactNode } from 'react';
import styles from './Card.module.css';
import type { SkinVariant } from '../types';

interface Props {
	header?: ReactNode;
	children: ReactNode;
	className?: string;
	isInverted?: boolean;
	variant?: SkinVariant;
	isScalableOnHover?: boolean;

	/** Optional: style the header container when you pass a custom header node */
	headerClassName?: string;
	dataAos?: string; // for AOS animation (e.g., 'fade-up', 'fade-right')
}

const Card = ({
	header,
	children,
	className,
	isInverted = false,
	variant = 'primary',
	isScalableOnHover = true,
	headerClassName,
	dataAos = '',
}: Props) => {
	const classNames = [
		styles.card,
		styles[`card--${variant}`],
		isInverted ? styles['card--inverted'] : '',
		isScalableOnHover ? styles['card--scalable'] : '',
		className ?? '',
	].filter(Boolean);

	const headerNode =
		typeof header === 'string' ? (
			<header
				className={`${styles.card__header} ${headerClassName ?? ''}`.trim()}
			>
				<h3 className={styles.card__title}>{header}</h3>
			</header>
		) : header ? (
			<header
				className={`${styles.card__header} ${headerClassName ?? ''}`.trim()}
			>
				{header}
			</header>
		) : null;

	return (
		<div className={classNames.join(' ')} data-aos={dataAos || undefined}>
			{headerNode}
			<div className={styles.card__body}>{children}</div>
		</div>
	);
};

export default Card;
