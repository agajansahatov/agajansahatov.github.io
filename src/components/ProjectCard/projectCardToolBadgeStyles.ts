import type { SkinVariant } from '../types';

export class ProjectCardToolBadgeStyles {
	private static readonly variants: readonly SkinVariant[] = [
		'primary',
		'info',
		'accent',
		'success',
		'secondary',
		'warning',
	] as const;

	static variantForIndex(index: number): SkinVariant {
		return ProjectCardToolBadgeStyles.variants[
			index % ProjectCardToolBadgeStyles.variants.length
		];
	}
}
