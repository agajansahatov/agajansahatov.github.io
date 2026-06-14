import { FaCode, FaGraduationCap, FaReact, FaTruck } from 'react-icons/fa6';
import type { FC } from 'react';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import ButtonLink from '../../../../components/Button/ButtonLink';
import ExperienceTimeline from '../../../../components/ExperienceTimeline';
import { useTranslation } from '../../../../i18n';
import type {
	ExperienceAsset,
	ExperienceContent,
	ResolvedExperience,
} from '../../../../types/experience';
import styles from './LastExperiencesSection.module.css';

const featuredExperienceCount = 3;

function LastExperiencesSectionComponent() {
	const { t, language } = useTranslation();
	const experiences = resolveLatestExperiences(
		t.experience.entries,
		featuredExperienceCount,
	);

	return (
		<Block id='section-last-experiences' className={styles.section}>
			<BlockHeader>
				<h2 className={styles['section__heading']}>
					{t.explore.experiencesTitle}
				</h2>
				<p className={styles['section__tagline']}>
					{t.explore.experiencesTagline}
				</p>
			</BlockHeader>

			<ExperienceTimeline
				experiences={experiences}
				language={language}
				presentLabel={t.experience.present}
				viewCompanyLabel={t.experience.viewCompany}
				readMoreLabel={t.experience.readMore}
				readLessLabel={t.experience.readLess}
			/>

			<footer className={styles.footer}>
				<ButtonLink
					href='/experience'
					layout='stretched'
					variant='accent'
					className={styles['view-more']}
				>
					{t.explore.viewMore}
				</ButtonLink>
			</footer>
		</Block>
	);
}

const experienceAssets: readonly ExperienceAsset[] = [
	{
		id: 'xcargo',
		logoIcon: FaTruck,
		iconVariant: 'accent',
		companyUrl: 'http://xcargo.com.tm/',
		tech: ['TypeScript', 'Next.js', 'React Native', 'Tailwind', 'MySQL'],
		startDate: '2025-01',
		endDate: null,
	},
	{
		id: 'ncu-masters',
		logoIcon: FaGraduationCap,
		iconVariant: 'info',
		companyUrl: 'https://www.ncu.edu.cn/',
		tech: ['Software Engineering'],
		startDate: '2024-09',
		endDate: null,
	},
	{
		id: 'smart-walnut',
		logoIcon: FaReact,
		iconVariant: 'primary',
		tech: ['React', 'JavaScript'],
		startDate: '2024-11',
		endDate: '2024-12',
	},
	{
		id: 'tut-bachelors',
		logoIcon: FaGraduationCap,
		iconVariant: 'secondary',
		companyUrl: 'https://www.tyut.edu.cn/',
		tech: ['Computer Science'],
		startDate: '2020-09',
		endDate: '2024-07',
	},
	{
		id: 'zhilin',
		logoIcon: FaCode,
		iconVariant: 'primary',
		tech: ['Python', 'Arduino', 'Deep Learning'],
		startDate: '2024-04',
		endDate: '2024-04',
	},
	{
		id: 'tut-web-dev',
		logoIcon: FaCode,
		iconVariant: 'success',
		companyUrl: 'https://www.tyut.edu.cn/',
		tech: ['Java', 'Spring Boot', 'React', 'MySQL', 'PHP'],
		startDate: '2023-06',
		endDate: '2023-07',
	},
	{
		id: 'tut-cpp',
		logoIcon: FaCode,
		iconVariant: 'secondary',
		companyUrl: 'https://www.tyut.edu.cn/',
		tech: ['C++'],
		startDate: '2022-05',
		endDate: '2022-05',
	},
] as const;

function resolveExperiences(
	entries: readonly ExperienceContent[],
): ResolvedExperience[] {
	const experiences = experienceAssets.flatMap((asset) => {
		const content = entries.find((entry) => entry.id === asset.id);
		if (!content) return [];

		return [
			{
				...content,
				logoIcon: asset.logoIcon,
				iconVariant: asset.iconVariant,
				companyUrl: asset.companyUrl,
				tech: asset.tech,
				startDate: asset.startDate,
				endDate: asset.endDate,
			},
		];
	});

	return sortExperiencesByRecency(experiences);
}

function resolveLatestExperiences(
	entries: readonly ExperienceContent[],
	count: number,
): ResolvedExperience[] {
	return resolveExperiences(entries).slice(0, count);
}

function parseIsoMonth(isoMonth: string): number {
	const [year, month] = isoMonth.split('-').map(Number);
	return year * 12 + month;
}

function compareExperiencesByRecency(
	left: ResolvedExperience,
	right: ResolvedExperience,
): number {
	const leftEnd = left.endDate ? parseIsoMonth(left.endDate) : Number.POSITIVE_INFINITY;
	const rightEnd = right.endDate
		? parseIsoMonth(right.endDate)
		: Number.POSITIVE_INFINITY;

	if (leftEnd !== rightEnd) {
		return rightEnd - leftEnd;
	}

	return parseIsoMonth(right.startDate) - parseIsoMonth(left.startDate);
}

function sortExperiencesByRecency(
	experiences: ResolvedExperience[],
): ResolvedExperience[] {
	return [...experiences].sort(compareExperiencesByRecency);
}

type LastExperiencesSectionType = FC & {
	readonly resolveExperiences: typeof resolveExperiences;
	readonly resolveLatestExperiences: typeof resolveLatestExperiences;
};

const LastExperiencesSection = Object.assign(LastExperiencesSectionComponent, {
	resolveExperiences,
	resolveLatestExperiences,
}) as LastExperiencesSectionType;

export default LastExperiencesSection;
