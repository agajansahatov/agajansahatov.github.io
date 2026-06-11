import React, { useState, useEffect, type ReactNode } from 'react';
import styles from './Collapsible.module.css';
import Icon from '../Icon';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import type { SkinVariant } from '../types';

interface Props {
	header: string;
	headerClassName?: string;
	headingClassName?: string;
	chevronIconClassName?: string;
	isHiddenInitially: boolean;
	className?: string;
	children: ReactNode;
	alwaysExpandedOn?: number; // screen width in pixels above which the collapsible should always be expanded
	chevronSkinVariant?: SkinVariant;
}

const Collapsible: React.FC<Props> = ({
	header,
	headerClassName,
	headingClassName,
	chevronIconClassName,
	isHiddenInitially,
	className,
	children,
	alwaysExpandedOn = 0,
	chevronSkinVariant = 'default',
}) => {
	const [isExpanded, setExpanded] = useState(!isHiddenInitially);
	const [isAlwaysExpanded, setAlwaysExpanded] = useState(false);

	// This effect listens for changes in the screen width and updates the isAlwaysExpanded state accordingly
	// If in the future we want to switch to a CSS-based solution for this, we can remove this effect and the isAlwaysExpanded state, and instead use CSS media queries to control the display of the collapsible content and the chevron icon.
	// But to do that we can only support several predefined breakpoints (e.g., 640px, 768px, 1024px, etc.) instead of allowing any custom pixel value for the alwaysExpandedOn prop.
	useEffect(() => {
		if (alwaysExpandedOn <= 0) return;

		const mediaQuery = window.matchMedia(`(min-width: ${alwaysExpandedOn}px)`);

		const handleChange = (e: MediaQueryListEvent | MediaQueryList) =>
			setAlwaysExpanded(e.matches);

		handleChange(mediaQuery);
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [alwaysExpandedOn]);

	const handleToggle = () => {
		setExpanded(!isExpanded);
	};

	const shouldExpand = isAlwaysExpanded || isExpanded;

	return (
		<div
			className={[
				styles.collapsible,
				shouldExpand ? styles['collapsible--expanded'] : '',
				className ?? '',
			]
				.filter(Boolean)
				.join(' ')}
		>
			<header
				className={`${styles['collapsible__header']} ${headerClassName ?? ''}`.trim()}
			>
				<h2
					className={`${styles['collapsible__heading']} ${headingClassName ?? ''}`.trim()}
				>
					{header}
				</h2>
				{!isAlwaysExpanded && (
					<button
						type='button'
						className={styles['collapsible__chevron']}
						onClick={handleToggle}
						aria-expanded={shouldExpand}
						aria-label={header}
					>
						<Icon
							icon={MdOutlineArrowForwardIos}
							variant={chevronSkinVariant}
							isSmall
							className={chevronIconClassName}
						/>
					</button>
				)}
			</header>
			<div className={styles['collapsible__content']}>{children}</div>
		</div>
	);
};

export default Collapsible;
