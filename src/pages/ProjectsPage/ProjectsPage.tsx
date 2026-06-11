import Block from '../../components/Block';
import BlockHeader from '../../components/Block/BlockHeader';
import ButtonLink from '../../components/Button/ButtonLink';
import ProjectCard from '../../components/ProjectCard';
import { GITHUB_PROFILE } from '../../config/github';
import { useTranslation } from '../../i18n';
import TopProjectsSection from '../HomePage/sections/TopProjectsSection/TopProjectsSection';
import Footer from '../../sections/Footer';
import styles from './ProjectsPage.module.css';

const ProjectsPage = () => {
	const { t } = useTranslation();
	const projects = TopProjectsSection.resolveAllProjects(t.explore.topProjects);

	return (
		<>
			<Block id='projects-page' className={styles.section}>
				<BlockHeader>
					<h1 className={styles['section__heading']}>{t.projects.title}</h1>
					<p className={styles['section__tagline']}>{t.projects.tagline}</p>
				</BlockHeader>

				<ul
					className={`grid grid--cols-1 md:grid--cols-2 lg:grid--cols-3 ${styles.projects}`}
				>
					{projects.map((project) => (
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
						href={`https://github.com/${GITHUB_PROFILE.username}/`}
						target='_blank'
						layout='stretched'
						variant='accent'
						className={styles['github-profile']}
					>
						{t.projects.viewGitHubProfile}
					</ButtonLink>
				</footer>
			</Block>
			<Footer />
		</>
	);
};

export default ProjectsPage;
