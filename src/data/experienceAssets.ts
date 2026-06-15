import {
	FaCode,
	FaGraduationCap,
	FaLanguage,
	FaReact,
	FaTruck,
	FaVrCardboard,
} from 'react-icons/fa6';
import type {
	EducationId,
	ExperienceAsset,
	ExperienceContent,
	ResolvedExperience,
	WorkExperienceId,
} from '../types/experience';

const workExperienceAssets: readonly ExperienceAsset<WorkExperienceId>[] = [
	{
		id: 'xcargo',
		logoIcon: FaTruck,
		iconVariant: 'accent',
		companyUrl: 'http://xcargo.com.tm/',
		tech: [
			'MySQL',
			'Workbench',
			'Prisma',
			'TypeScript',
			'Next.js',
			'Tailwind',
			'DaisyUI',
			'React Native',
		],
		startDate: '2025-05',
		endDate: '2026-05',
	},
	{
		id: 'smart-walnut',
		logoIcon: FaReact,
		iconVariant: 'primary',
		tech: ['TypeScript', 'React', 'Ant Design', 'Git'],
		startDate: '2024-11',
		endDate: '2024-12',
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
		tech: ['MySQL', 'PHP', 'Spring Boot', 'React.js', 'Bootstrap'],
		startDate: '2023-06',
		endDate: '2023-07',
	},
	{
		id: 'tut-cpp',
		logoIcon: FaCode,
		iconVariant: 'secondary',
		companyUrl: 'https://www.tyut.edu.cn/',
		tech: ['C++', 'Embarcadero RAD Studio'],
		startDate: '2022-05',
		endDate: '2022-05',
	},
	{
		id: 'jinzhong-vr-volunteer',
		logoIcon: FaVrCardboard,
		iconVariant: 'info',
		tech: ['C++', 'Unity', 'VR'],
		startDate: '2022-08',
		endDate: '2022-08',
	},
] as const;

const educationAssets: readonly ExperienceAsset<EducationId>[] = [
	{
		id: 'ncu-masters',
		logoIcon: FaGraduationCap,
		iconVariant: 'info',
		companyUrl: 'https://www.ncu.edu.cn/',
		tech: ['Software Engineering'],
		startDate: '2024-09',
		endDate: '2027-07',
	},
	{
		id: 'tut-bachelors',
		logoIcon: FaGraduationCap,
		iconVariant: 'secondary',
		companyUrl: 'https://www.tyut.edu.cn/',
		tech: ['Computer Science and Technology'],
		startDate: '2020-09',
		endDate: '2024-07',
	},
	{
		id: 'xisu-chinese',
		logoIcon: FaLanguage,
		iconVariant: 'warning',
		companyUrl: 'https://www.xisu.edu.cn/',
		tech: ['Chinese Language'],
		startDate: '2019-03',
		endDate: '2020-07',
	},
] as const;

function parseIsoMonth(isoMonth: string): number {
	const [year, month] = isoMonth.split('-').map(Number);
	return year * 12 + month;
}

function compareExperiencesByRecency(
	left: ResolvedExperience,
	right: ResolvedExperience,
): number {
	const leftEnd = left.endDate
		? parseIsoMonth(left.endDate)
		: Number.POSITIVE_INFINITY;
	const rightEnd = right.endDate
		? parseIsoMonth(right.endDate)
		: Number.POSITIVE_INFINITY;

	if (leftEnd !== rightEnd) {
		return rightEnd - leftEnd;
	}

	return parseIsoMonth(right.startDate) - parseIsoMonth(left.startDate);
}

function sortExperiencesByRecency<T extends ResolvedExperience>(
	experiences: T[],
): T[] {
	return [...experiences].sort(compareExperiencesByRecency);
}

function resolveExperiences<TId extends WorkExperienceId | EducationId>(
	entries: readonly ExperienceContent<TId>[],
	assets: readonly ExperienceAsset<TId>[],
): ResolvedExperience<TId>[] {
	const experiences = assets.flatMap((asset) => {
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

export function resolveWorkExperiences(
	entries: readonly ExperienceContent<WorkExperienceId>[],
): ResolvedExperience<WorkExperienceId>[] {
	return resolveExperiences(entries, workExperienceAssets);
}

export function resolveEducationEntries(
	entries: readonly ExperienceContent<EducationId>[],
): ResolvedExperience<EducationId>[] {
	return resolveExperiences(entries, educationAssets);
}

export function resolveLatestWorkExperiences(
	entries: readonly ExperienceContent<WorkExperienceId>[],
	count: number,
): ResolvedExperience<WorkExperienceId>[] {
	return resolveWorkExperiences(entries).slice(0, count);
}
