import {
	SiMysql,
	SiNextdotjs,
	SiNodedotjs,
	SiReact,
	SiSpringboot,
	SiTypescript,
} from 'react-icons/si';
import { resolveExpertiseIconColor } from './expertiseIconColors';
import type {
	ExpertiseCatalogItem,
	ExpertiseItemCatalogPort,
	ExpertiseItemId,
} from '../types/expertise';

export const HOME_EXPERTISE_ITEMS: readonly ExpertiseCatalogItem[] = [
	{
		id: 'typescript',
		kind: 'technology',
		label: 'TypeScript',
		icon: SiTypescript,
		officialUrl: 'https://www.typescriptlang.org/',
		iconColor: resolveExpertiseIconColor('typescript'),
	},
	{
		id: 'react',
		kind: 'technology',
		label: 'React',
		icon: SiReact,
		officialUrl: 'https://react.dev/',
		iconColor: resolveExpertiseIconColor('react'),
	},
	{
		id: 'nodejs',
		kind: 'technology',
		label: 'Node.js',
		icon: SiNodedotjs,
		officialUrl: 'https://nodejs.org/',
		iconColor: resolveExpertiseIconColor('nodejs'),
	},
	{
		id: 'nextjs',
		kind: 'technology',
		label: 'Next.js',
		icon: SiNextdotjs,
		officialUrl: 'https://nextjs.org/',
		iconColor: resolveExpertiseIconColor('nextjs'),
	},
	{
		id: 'spring-boot',
		kind: 'technology',
		label: 'Spring Boot',
		icon: SiSpringboot,
		officialUrl: 'https://spring.io/projects/spring-boot',
		iconColor: resolveExpertiseIconColor('spring-boot'),
	},
	{
		id: 'mysql',
		kind: 'technology',
		label: 'MySQL',
		icon: SiMysql,
		officialUrl: 'https://www.mysql.com/',
		iconColor: resolveExpertiseIconColor('mysql'),
	},
] as const;

const homeItemsById = new Map(
	HOME_EXPERTISE_ITEMS.map((item) => [item.id, item] as const),
);

export class HomeExpertiseCatalog implements ExpertiseItemCatalogPort {
	static readonly instance: ExpertiseItemCatalogPort =
		new HomeExpertiseCatalog();

	getItem(id: ExpertiseItemId): ExpertiseCatalogItem {
		const item = homeItemsById.get(id);
		if (!item) throw new Error(`Unknown home expertise item: ${id}`);
		return item;
	}
}
