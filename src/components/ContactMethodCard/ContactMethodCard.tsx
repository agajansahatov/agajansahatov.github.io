import type { ComponentType, ReactNode } from 'react';
import Card from '../Card';
import Icon from '../Icon';
import styles from './ContactMethodCard.module.css';
import type { SkinVariant } from '../types';
import ButtonLink from '../Button/ButtonLink';
import IconButton from '../Button/IconButton';

type Action =
	| {
			type: 'button';
			label: string;
			href: string;
			target?: '_self' | '_blank' | '_parent' | '_top';
	  }
	| {
			type: 'icon';
			label: string; // aria-label + tooltip
			icon: ComponentType;
			className?: string; // for ClipboardJS selector (copy-btn)
			clipboardText?: string; // for ClipboardJS
			onClick?: () => void; // optional extra behavior
	  };

type Props = {
	title: string;
	description: ReactNode;
	icon: ComponentType;
	variant?: SkinVariant;
	actions?: Action[];
	note?: ReactNode;
	isScalableOnHover?: boolean;
	dataAos?: string; // for AOS animation (e.g., 'fade-up', 'fade-right')
};

const ContactMethodCard = ({
	title,
	description,
	icon,
	variant = 'primary',
	actions = [],
	note,
	isScalableOnHover = true,
	dataAos,
}: Props) => {
	const cardVariant = variant === 'default' ? 'primary' : variant;

	return (
		<Card
			className={styles.card}
			variant={cardVariant}
			isScalableOnHover={isScalableOnHover}
			header={
				<div className={styles.header}>
					<Icon icon={icon} variant='default' isSmall />
					<h3 className={styles.title}>{title}</h3>
				</div>
			}
			dataAos={dataAos}
		>
			<div className={styles.desc}>{description}</div>

			{actions.length > 0 ? (
				<div className={styles.actions}>
					{actions.map((a, idx) => {
						if (a.type === 'button') {
							return (
								<ButtonLink
									key={`btn-${idx}`}
									href={a.href}
									target={a.target ?? '_self'}
									variant={cardVariant}
									layout='normal'
									className={styles.actionBtn}
								>
									{a.label}
								</ButtonLink>
							);
						}

						const IconCmp = a.icon;

						return (
							<IconButton
								key={`icon-${idx}`}
								aria-label={a.label}
								title={a.label}
								onClick={a.onClick}
								className={`${styles.iconBtn} ${a.className ?? ''}`.trim()}
								// ClipboardJS reads this:
								data-clipboard-text={a.clipboardText}
								data-label={a.label}
							>
								<IconCmp />
							</IconButton>
						);
					})}
				</div>
			) : null}

			{note ? <div className={styles.note}>{note}</div> : null}
		</Card>
	);
};

export default ContactMethodCard;
