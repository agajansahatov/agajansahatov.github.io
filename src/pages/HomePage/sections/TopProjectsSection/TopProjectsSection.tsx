import type { FC } from 'react';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import ButtonLink from '../../../../components/Button/ButtonLink';
import ProjectCard from '../../../../components/ProjectCard';
import type { TranslationDictionary } from '../../../../i18n/translations';
import { useTranslation } from '../../../../i18n';
import type { HomeProjectId, ResolvedHomeProject } from '../../../../types/project';
import styles from './TopProjectsSection.module.css';

function TopProjectsSectionComponent() {
	const { t } = useTranslation();
	const featuredProjects = resolveFeaturedProjects(t.explore.topProjects);

	return (
		<Block id='section-top-projects' className={styles.section}>
			<BlockHeader>
				<h2 className={styles['section__heading']}>
					{t.explore.topProjectsTitle}
				</h2>
				<p className={styles['section__tagline']}>
					{t.explore.topProjectsTagline}
				</p>
			</BlockHeader>

			<ul
				className={`grid grid--cols-1 md:grid--cols-2 lg:grid--cols-3 ${styles.projects}`}
			>
				{featuredProjects.map((project) => (
					<li key={project.id} className={styles['project-item']}>
						<ProjectCard
							name={project.name}
							description={project.description}
							tools={project.tools}
							image={project.image}
							imageAlt={project.imageAlt}
							projectUrl={project.projectUrl}
							viewProjectLabel={t.explore.viewProject}
						/>
					</li>
				))}
			</ul>

			<footer className={styles.footer}>
				<ButtonLink
					href='/projects'
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

type ProjectAsset = {
	readonly id: HomeProjectId;
	readonly image: string;
	readonly projectUrl: string;
};

const projectAssets: readonly ProjectAsset[] = [
	{
		id: 'xcargo',
		image: '/images/projects/Xcargo.jpg',
		projectUrl: 'http://xcargo.com.tm/',
	},
	{
		id: 'game-hub',
		image: '/images/projects/GameHub.jpg',
		projectUrl: 'https://game-hub-three-kohl.vercel.app/',
	},
	{
		id: 'sada',
		image: '/images/projects/SADA.jpg',
		projectUrl: 'https://agajansahatov.github.io/sada/',
	},
] as const;

const featuredProjectCount = 3;

function resolveAllProjects(
	projects: TranslationDictionary['explore']['topProjects'],
): ResolvedHomeProject[] {
	return projects.flatMap((content) => {
		const asset = projectAssets.find((entry) => entry.id === content.id);
		if (!asset) return [];

		return [
			{
				id: asset.id,
				name: content.name,
				description: content.description,
				tools: content.tools,
				imageAlt: content.imageAlt,
				image: asset.image,
				projectUrl: asset.projectUrl,
			},
		];
	});
}

function resolveFeaturedProjects(
	projects: TranslationDictionary['explore']['topProjects'],
): ResolvedHomeProject[] {
	return resolveAllProjects(projects).slice(0, featuredProjectCount);
}

type TopProjectsSectionType = FC & {
	readonly resolveAllProjects: typeof resolveAllProjects;
};

const TopProjectsSection = Object.assign(TopProjectsSectionComponent, {
	resolveAllProjects,
}) as TopProjectsSectionType;

export default TopProjectsSection;
