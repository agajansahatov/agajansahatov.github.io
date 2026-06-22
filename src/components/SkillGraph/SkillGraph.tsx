import type { CSSProperties } from 'react';
import type {
	ExpertiseCatalogPort,
	ExpertiseLabelKey,
	SkillGraphGroupNode,
	SkillGraphNode,
} from '../../types/expertise';
import SkillTile from '../SkillTile';
import styles from './SkillGraph.module.css';

type SkillGraphProps = {
	readonly root: SkillGraphGroupNode;
	readonly catalog: ExpertiseCatalogPort;
	readonly resolveLabel: (key: ExpertiseLabelKey) => string;
	readonly officialWebsiteLabel: (name: string) => string;
};

const SkillGraph = ({
	root,
	catalog,
	resolveLabel,
	officialWebsiteLabel,
}: SkillGraphProps) => (
	<div className={styles.graph}>
		<SkillGraphGroup
			node={root}
			catalog={catalog}
			resolveLabel={resolveLabel}
			officialWebsiteLabel={officialWebsiteLabel}
			isRoot
		/>
	</div>
);

type SkillGraphGroupProps = Omit<SkillGraphProps, 'root'> & {
	readonly node: SkillGraphGroupNode;
	readonly isRoot?: boolean;
};

const SkillGraphGroup = ({
	node,
	catalog,
	resolveLabel,
	officialWebsiteLabel,
	isRoot = false,
}: SkillGraphGroupProps) => {
	const containsOnlyItems = node.children.every(
		(child) => child.kind === 'item',
	);

	return (
		<div
			className={`${styles.group} ${isRoot ? styles['group--root'] : ''}`}
		>
			<div className={styles['group__label']}>{resolveLabel(node.labelKey)}</div>
			<ul
				className={`${styles.children} ${
					containsOnlyItems
						? styles['children--items']
						: styles['children--groups']
				}`}
				style={
					{
						'--branch-count': node.children.length,
					} as CSSProperties
				}
			>
				{node.children.map((child) => (
					<li className={styles.child} key={nodeKey(child)}>
						{child.kind === 'group' ? (
							<SkillGraphGroup
								node={child}
								catalog={catalog}
								resolveLabel={resolveLabel}
								officialWebsiteLabel={officialWebsiteLabel}
							/>
						) : (
							<SkillGraphItem
								node={child}
								catalog={catalog}
								resolveLabel={resolveLabel}
								officialWebsiteLabel={officialWebsiteLabel}
							/>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

type SkillGraphItemProps = Omit<SkillGraphProps, 'root'> & {
	readonly node: Extract<SkillGraphNode, { kind: 'item' }>;
};

const SkillGraphItem = ({
	node,
	catalog,
	resolveLabel,
	officialWebsiteLabel,
}: SkillGraphItemProps) => {
	const catalogItem = catalog.getItem(node.itemId);
	const label = catalogItem.labelKey
		? resolveLabel(catalogItem.labelKey)
		: (catalogItem.label ?? node.itemId);

	return (
		<SkillTile
			label={label}
			icon={catalogItem.icon}
			href={catalogItem.officialUrl}
			iconColor={catalogItem.iconColor}
			officialWebsiteLabel={
				catalogItem.officialUrl ? officialWebsiteLabel(label) : undefined
			}
		/>
	);
};

function nodeKey(node: SkillGraphNode): string {
	return node.kind === 'group' ? node.id : node.itemId;
}

export default SkillGraph;
