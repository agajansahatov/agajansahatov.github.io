import type { LanguageCode } from '../../types/preferences';
import type { ResolvedExperience } from '../../types/experience';
import ExperienceCard from '../ExperienceCard';
import styles from './ExperienceTimeline.module.css';

type ExperienceTimelineProps = {
	readonly experiences: readonly ResolvedExperience[];
	readonly language: LanguageCode;
	readonly presentLabel: string;
	readonly viewCompanyLabel: string;
};

const ExperienceTimeline = ({
	experiences,
	language,
	presentLabel,
	viewCompanyLabel,
}: ExperienceTimelineProps) => {
	return (
		<ol className={styles.timeline}>
			{experiences.map((experience, index) => {
				const period = formatExperiencePeriod(
					experience.startDate,
					experience.endDate,
					language,
					presentLabel,
				);
				const periodDateTime = experience.endDate
					? `${experience.startDate}/${experience.endDate}`
					: `${experience.startDate}/present`;

				return (
					<li
						key={experience.id}
						className={styles['timeline-item']}
						{...(index > 0 ? { 'data-aos': 'fade-up' } : {})}
					>
						<span className={styles.marker} aria-hidden='true' />
						<ExperienceCard
							role={experience.role}
							company={experience.company}
							location={experience.location}
							description={experience.description}
							logoIcon={experience.logoIcon}
							iconVariant={experience.iconVariant}
							companyUrl={experience.companyUrl}
							tech={experience.tech}
							period={period}
							periodDateTime={periodDateTime}
							viewCompanyLabel={viewCompanyLabel}
						/>
					</li>
				);
			})}
		</ol>
	);
};

export default ExperienceTimeline;

const DATE_LOCALES: Record<LanguageCode, string> = {
	en: 'en-US',
	tk: 'tk-TM',
	tr: 'tr-TR',
	zh: 'zh-CN',
	ru: 'ru-RU',
} as const;

const dateFormatterCache = new Map<string, Intl.DateTimeFormat>();

function getDateFormatter(language: LanguageCode): Intl.DateTimeFormat {
	const locale = DATE_LOCALES[language];
	const cached = dateFormatterCache.get(locale);

	if (cached) {
		return cached;
	}

	const formatter = new Intl.DateTimeFormat(locale, {
		month: 'short',
		year: 'numeric',
	});
	dateFormatterCache.set(locale, formatter);
	return formatter;
}

function formatDate(isoMonth: string, language: LanguageCode): string {
	const [year, month] = isoMonth.split('-').map(Number);
	const date = new Date(year, month - 1, 1);
	return getDateFormatter(language).format(date);
}

function formatExperiencePeriod(
	startDate: string,
	endDate: string | null,
	language: LanguageCode,
	presentLabel: string,
): string {
	const start = formatDate(startDate, language);
	const end = endDate ? formatDate(endDate, language) : presentLabel;
	return `${start} – ${end}`;
}
