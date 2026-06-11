import { FaArrowUpRightFromSquare } from 'react-icons/fa6';
import Badge from '../Badge';
import Icon from '../Icon';
import Link from '../Link';
import type { ResolvedExperience } from '../../types/experience';
import { ExperienceCardTechBadgeStyles } from './experienceCardTechBadgeStyles';
import styles from './ExperienceCard.module.css';

type ExperienceCardProps = Pick<
	ResolvedExperience,
	| 'role'
	| 'company'
	| 'location'
	| 'description'
	| 'logoIcon'
	| 'iconVariant'
	| 'companyUrl'
	| 'tech'
> & {
	readonly period: string;
	readonly periodDateTime: string;
	readonly viewCompanyLabel: string;
};

const ExperienceCard = ({
	role,
	company,
	location,
	description,
	logoIcon,
	iconVariant,
	companyUrl,
	tech,
	period,
	periodDateTime,
	viewCompanyLabel,
}: ExperienceCardProps) => {
	return (
		<article className={styles.card}>
			<header className={styles.header}>
				<Icon icon={logoIcon} variant={iconVariant} isSmall />
				<div className={styles['header-text']}>
					<h3 className={styles.role}>{role}</h3>
					<p className={styles.company}>{company}</p>
				</div>
			</header>

			<div className={styles.meta}>
				<time className={styles.period} dateTime={periodDateTime}>
					{period}
				</time>
				<span className={styles.location}>{location}</span>
			</div>

			<p className={styles.description}>{description}</p>

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
				{companyUrl ? (
					<Link
						href={companyUrl}
						target='_blank'
						className={styles['company-link']}
					>
						{viewCompanyLabel}
						<FaArrowUpRightFromSquare aria-hidden='true' />
					</Link>
				) : null}
			</footer>
		</article>
	);
};

export default ExperienceCard;
