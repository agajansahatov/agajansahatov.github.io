import type { ComponentType, ReactElement } from 'react';
import {
	SiHtml5,
	SiJavascript,
	SiMysql,
	SiNodedotjs,
	SiReact,
	SiTypescript,
} from 'react-icons/si';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import Icon from '../../../../components/Icon';
import Media from '../../../../components/Media';
import type { SkinVariant } from '../../../../components/types';
import { useTranslation } from '../../../../i18n';
import styles from './ExpertiseSection.module.css';

const ExpertiseSection = () => {
	const { t } = useTranslation();

	return (
		<Block
			variant='inverted'
			direction='left'
			id='section-expertise'
			className={styles['section__expertise']}
		>
			<BlockHeader className={styles['section__header']}>
				<h2>{t.explore.expertiseTitle}</h2>
			</BlockHeader>
			<ul>
				<div
					className={`grid grid--cols-1 md:grid--cols-2 ${styles['expertise-grid']}`}
				>
					{t.explore.expertises.map((expertise) => {
						const assetIndex = expertiseAssets.findIndex(
							(entry) => entry.id === expertise.id,
						);
						const asset = expertiseAssets[assetIndex];
						if (!asset) return null;

						return (
							<li key={expertise.id} className={styles['expertise-item']}>
								<Media
									className={styles['expertise-media']}
									image={createExpertiseIcon(
										assetIndex,
										asset.iconVariant,
										asset.iconForegroundColor,
									)}
									title={expertise.title}
									titleStyles={styles['expertise-title']}
								>
									<p>{expertise.body}</p>
								</Media>
							</li>
						);
					})}
				</div>
			</ul>
		</Block>
	);
};

export default ExpertiseSection;

type ExpertiseId =
	| 'html-css'
	| 'javascript'
	| 'typescript'
	| 'react'
	| 'nodejs'
	| 'mysql';

type ExpertiseAsset = {
	readonly id: ExpertiseId;
	readonly iconVariant: SkinVariant;
	readonly iconForegroundColor?: string;
};

const javascriptBrandColor = '#F7DF1E' as const;
const typescriptBrandColor = 'var(--color-primary)' as const;

const expertiseAssets: readonly ExpertiseAsset[] = [
	{ id: 'html-css', iconVariant: 'primary' },
	{
		id: 'javascript',
		iconVariant: 'accent',
		iconForegroundColor: javascriptBrandColor,
	},
	{
		id: 'typescript',
		iconVariant: 'secondary',
		iconForegroundColor: typescriptBrandColor,
	},
	{ id: 'react', iconVariant: 'success' },
	{ id: 'nodejs', iconVariant: 'info' },
	{ id: 'mysql', iconVariant: 'primary' },
] as const;

const expertiseIconComponents: readonly ComponentType[] = [
	SiHtml5,
	SiJavascript,
	SiTypescript,
	SiReact,
	SiNodedotjs,
	SiMysql,
] as const;

function createExpertiseIcon(
	index: number,
	variant: SkinVariant,
	foregroundColor?: string,
): ReactElement {
	const IconComponent = expertiseIconComponents[index];
	return (
		<Icon
			icon={IconComponent}
			variant={variant}
			foregroundColor={foregroundColor}
		/>
	);
}
