import {
	FaGithub,
	FaLanguage,
	FaLayerGroup,
	FaLaptopCode,
} from 'react-icons/fa6';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import Icon from '../../../../components/Icon';
import Media from '../../../../components/Media';
import { useGitHubContributions } from '../../../../hooks/useGitHubContributions';
import { useTranslation } from '../../../../i18n';
import { formatStatTitle } from '../../../../utils/formatStatTitle';
import styles from './StatsSection.module.css';

const statIconVariants = ['info', 'primary', 'accent', 'success'] as const;
const statIconComponents = [
	FaGithub,
	FaLaptopCode,
	FaLanguage,
	FaLayerGroup,
] as const;

const StatsSection = () => {
	const { t, language } = useTranslation();
	const { count: githubContributions } = useGitHubContributions();

	return (
		<Block
			id='stats-section'
			variant='inverted'
			className={styles['stats-section']}
		>
			<BlockHeader>
				<h2 className={styles['section__heading']}>{t.explore.statsTitle}</h2>
			</BlockHeader>
			<ul>
				<div
					className={`grid grid--cols-1 md:grid--cols-2 lg:grid--cols-4 ${styles['stats-grid']}`}
				>
					{t.explore.stats.map((stat, index) => {
						const statValue =
							index === 0
								? githubContributions
								: 'value' in stat
									? stat.value
									: 0;
						const statTitle = formatStatTitle(
							statValue,
							language,
							'exactDisplay' in stat && stat.exactDisplay === true,
						);

						return (
							<li
								key={'id' in stat ? stat.id : `stat-${index}`}
								className={styles['stat-item']}
							>
								<Media
									className={styles['stat-media']}
									image={
										<Icon
											icon={statIconComponents[index]}
											variant={statIconVariants[index]}
										/>
									}
									title={statTitle}
									titleStyles={styles['stat__title']}
								>
									<p>{stat.body}</p>
								</Media>
							</li>
						);
					})}
				</div>
			</ul>
		</Block>
	);
};

export default StatsSection;
