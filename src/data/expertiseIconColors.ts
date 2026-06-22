import type { ExpertiseItemId } from '../types/expertise';

/** Official or thematic brand colors for linkable expertise technologies. */
const EXPERTISE_ICON_COLORS: Partial<Record<ExpertiseItemId, string>> = {
	typescript: '#3178C6',
	react: '#61DAFB',
	nodejs: '#5FA04E',
	nextjs: '#000000',
	'spring-boot': '#6DB33F',
	mysql: '#4479A1',
	c: '#A8B9CC',
	cpp: '#00599C',
	java: '#007396',
	python: '#3776AB',
	php: '#777BB4',
	html: '#E34F26',
	css: '#1572B6',
	javascript: '#F7DF1E',
	sql: '#336791',
	'react-native': '#61DAFB',
	express: '#000000',
	django: '#092E20',
	laravel: '#FF2D20',
	vue: '#4FC08D',
	uniapp: '#2A983E',
	expo: '#000020',
	tailwind: '#06B6D4',
	bootstrap: '#7952B3',
	daisyui: '#5A0FC8',
	'ant-design': '#0170FE',
	'chakra-ui': '#319795',
	jotai: '#ED8936',
	'react-testing-library': '#E33332',
	git: '#F05032',
	github: '#181717',
	docker: '#2496ED',
	postman: '#FF6C37',
	photoshop: '#31A8FF',
	'mysql-workbench': '#4479A1',
	excel: '#217346',
	prisma: '#2D3748',
	arduino: '#00878F',
	'rad-studio': '#E62429',
	unity: '#000000',
};

export function resolveExpertiseIconColor(
	id: ExpertiseItemId,
): string | undefined {
	return EXPERTISE_ICON_COLORS[id];
}
