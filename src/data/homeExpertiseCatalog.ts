import {
	SiMysql,
	SiNextdotjs,
	SiNodedotjs,
	SiReact,
	SiSpringboot,
	SiTypescript,
} from 'react-icons/si';
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
	},
	{
		id: 'react',
		kind: 'technology',
		label: 'React',
		icon: SiReact,
		officialUrl: 'https://react.dev/',
	},
	{
		id: 'nodejs',
		kind: 'technology',
		label: 'Node.js',
		icon: SiNodedotjs,
		officialUrl: 'https://nodejs.org/',
	},
	{
		id: 'nextjs',
		kind: 'technology',
		label: 'Next.js',
		icon: SiNextdotjs,
		officialUrl: 'https://nextjs.org/',
	},
	{
		id: 'spring-boot',
		kind: 'technology',
		label: 'Spring Boot',
		icon: SiSpringboot,
		officialUrl: 'https://spring.io/projects/spring-boot',
	},
	{
		id: 'mysql',
		kind: 'technology',
		label: 'MySQL',
		icon: SiMysql,
		officialUrl: 'https://www.mysql.com/',
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
