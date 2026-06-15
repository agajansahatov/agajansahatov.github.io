import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
	FaArrowUpRightFromSquare,
	FaChevronDown,
} from 'react-icons/fa6';
import Badge from '../Badge';
import Icon from '../Icon';
import Link from '../Link';
import type { ResolvedExperience } from '../../types/experience';
import { ExperienceCardTechBadgeStyles } from './experienceCardTechBadgeStyles';
import styles from './ExperienceCard.module.css';

type ExperienceCardProps = Pick<
	ResolvedExperience,
	| 'role'
	| 'organization'
	| 'location'
	| 'description'
	| 'logoIcon'
	| 'iconVariant'
	| 'organizationUrl'
	| 'tech'
> & {
	readonly period: string;
	readonly periodDateTime: string;
	readonly viewOrganizationLabel: string;
	readonly readMoreLabel: string;
	readonly readLessLabel: string;
};

const ExperienceCard = ({
	role,
	organization,
	location,
	description,
	logoIcon,
	iconVariant,
	organizationUrl,
	tech,
	period,
	periodDateTime,
	viewOrganizationLabel,
	readMoreLabel,
	readLessLabel,
}: ExperienceCardProps) => {
	const descriptionRef = useRef<HTMLParagraphElement>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [isTruncated, setIsTruncated] = useState(false);

	const measureTruncation = useCallback(() => {
		const descriptionElement = descriptionRef.current;
		if (!descriptionElement || isExpanded) {
			return;
		}

		setIsTruncated(
			descriptionElement.scrollHeight > descriptionElement.clientHeight + 1,
		);
	}, [isExpanded]);

	useLayoutEffect(() => {
		measureTruncation();

		const descriptionElement = descriptionRef.current;
		if (!descriptionElement) {
			return;
		}

		const resizeObserver = new ResizeObserver(measureTruncation);
		resizeObserver.observe(descriptionElement);

		return () => {
			resizeObserver.disconnect();
		};
	}, [description, measureTruncation]);

	useLayoutEffect(() => {
		if (!isExpanded) {
			measureTruncation();
		}
	}, [isExpanded, measureTruncation]);

	const showReadMoreButton = isTruncated || isExpanded;
	const toggleLabel = isExpanded ? readLessLabel : readMoreLabel;

	return (
		<article className={styles.card}>
			<header className={styles.header}>
				<Icon icon={logoIcon} variant={iconVariant} isSmall />
				<div className={styles['header-text']}>
					<h3 className={styles.role}>{role}</h3>
					<p className={styles.organization}>{organization}</p>
				</div>
			</header>

			<div className={styles.meta}>
				<time className={styles.period} dateTime={periodDateTime}>
					{period}
				</time>
				<span className={styles.location}>{location}</span>
			</div>

			<div className={styles['description-block']}>
				<p
					ref={descriptionRef}
					className={[
						styles.description,
						!isExpanded ? styles['description--clamped'] : '',
					]
						.filter(Boolean)
						.join(' ')}
				>
					{description}
				</p>
				{showReadMoreButton ? (
					<button
						type='button'
						className={[
							styles['read-more-button'],
							isExpanded ? styles['read-more-button--expanded'] : '',
						]
							.filter(Boolean)
							.join(' ')}
						onClick={() => {
							setIsExpanded((expanded) => !expanded);
						}}
						aria-expanded={isExpanded}
						aria-label={toggleLabel}
					>
						<span className={styles['read-more-icon']} aria-hidden='true'>
							<FaChevronDown />
						</span>
						<span className={styles['read-more-label']}>{readMoreLabel}</span>
					</button>
				) : null}
			</div>

			<footer className={styles.footer}>
				<ul className={styles.tech}>
					{tech.map((item, index) => (
						<li key={item}>
							<Badge
								skinVariant={ExperienceCardTechBadgeStyles.variantForIndex(
									index,
								)}
								size='small'
								className={styles['tech-badge']}
							>
								{item}
							</Badge>
						</li>
					))}
				</ul>
				{organizationUrl ? (
					<Link
						href={organizationUrl}
						target='_blank'
						className={styles['organization-link']}
					>
						{viewOrganizationLabel}
						<FaArrowUpRightFromSquare aria-hidden='true' />
					</Link>
				) : null}
			</footer>
		</article>
	);
};

export default ExperienceCard;
