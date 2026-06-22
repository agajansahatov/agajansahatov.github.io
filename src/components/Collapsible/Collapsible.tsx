import {
	useEffect,
	useId,
	useState,
	type ElementType,
	type ReactNode,
} from 'react';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import Icon from '../Icon';
import type { SkinVariant } from '../types';
import styles from './Collapsible.module.css';

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

type CollapsibleProps = {
	readonly header: ReactNode;
	readonly defaultExpanded?: boolean;
	readonly headingLevel?: HeadingLevel;
	readonly headerClassName?: string;
	readonly headingClassName?: string;
	readonly chevronIconClassName?: string;
	readonly className?: string;
	readonly children: ReactNode;
	readonly alwaysExpandedOn?: number;
	readonly chevronSkinVariant?: SkinVariant;
};

const Collapsible = ({
	header,
	defaultExpanded = false,
	headingLevel = 2,
	headerClassName,
	headingClassName,
	chevronIconClassName,
	className,
	children,
	alwaysExpandedOn = 0,
	chevronSkinVariant = 'default',
}: CollapsibleProps) => {
	const [isExpanded, setExpanded] = useState(defaultExpanded);
	const [isAlwaysExpanded, setAlwaysExpanded] = useState(
		() =>
			alwaysExpandedOn > 0 &&
			typeof window !== 'undefined' &&
			window.matchMedia(`(min-width: ${alwaysExpandedOn}px)`).matches,
	);
	const generatedId = useId();
	const contentId = `collapsible-${generatedId.replace(/:/g, '')}`;
	const Heading = `h${headingLevel}` as ElementType;

	useEffect(() => {
		if (alwaysExpandedOn <= 0 || typeof window === 'undefined') return;

		const mediaQuery = window.matchMedia(`(min-width: ${alwaysExpandedOn}px)`);
		const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
			setAlwaysExpanded(event.matches);
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, [alwaysExpandedOn]);

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
				<Heading
					className={`${styles['collapsible__heading']} ${headingClassName ?? ''}`.trim()}
				>
					{isAlwaysExpanded ? (
						<span className={styles['collapsible__heading-label']}>
							{header}
						</span>
					) : (
						<button
							type='button'
							className={styles['collapsible__trigger']}
							onClick={() => setExpanded((current) => !current)}
							aria-expanded={shouldExpand}
							aria-controls={contentId}
						>
							<span className={styles['collapsible__heading-label']}>
								{header}
							</span>
							<Icon
								icon={MdOutlineArrowForwardIos}
								variant={chevronSkinVariant}
								isSmall
								className={`${styles['collapsible__chevron']} ${chevronIconClassName ?? ''}`.trim()}
							/>
						</button>
					)}
				</Heading>
			</header>
			<div
				id={contentId}
				className={styles['collapsible__content']}
				aria-hidden={!shouldExpand}
			>
				<div className={styles['collapsible__content-inner']}>{children}</div>
			</div>
		</div>
	);
};

export default Collapsible;
