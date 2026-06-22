import Badge from '../Badge';
import ButtonLink from '../Button/ButtonLink';
import Card from '../Card';
import Picture from '../Picture';
import type { ResolvedHomeProject } from '../../types/project';
import { ProjectCardToolBadgeStyles } from './projectCardToolBadgeStyles';
import styles from './ProjectCard.module.css';

type ProjectCardProps = Pick<
	ResolvedHomeProject,
	'name' | 'description' | 'tools' | 'image' | 'imageAlt' | 'projectUrl'
> & {
	readonly viewProjectLabel: string;
};

const ProjectCard = ({
	name,
	description,
	tools,
	image,
	imageAlt,
	projectUrl,
	viewProjectLabel,
}: ProjectCardProps) => {
	return (
		<Card
			className={styles['project-card']}
			variant='default'
			isScalableOnHover
			header={<Picture src={image} alt={imageAlt} className={styles.image} />}
			headerClassName={styles['media-header']}
		>
			<main className={styles.content}>
				<h3 className={styles.name}>{name}</h3>
				<ul className={styles.tools}>
					{tools.map((tool, index) => (
						<li key={tool}>
							<Badge
								skinVariant={ProjectCardToolBadgeStyles.variantForIndex(index)}
								size='small'
								className={styles['tool-badge']}
							>
								{tool}
							</Badge>
						</li>
					))}
				</ul>
				<p className={styles.description}>{description}</p>
				<footer className={styles.actions}>
					<ButtonLink
						href={projectUrl}
						layout='block'
						variant='primary'
						className={styles.action}
					>
						{viewProjectLabel}
					</ButtonLink>
				</footer>
			</main>
		</Card>
	);
};

export default ProjectCard;
