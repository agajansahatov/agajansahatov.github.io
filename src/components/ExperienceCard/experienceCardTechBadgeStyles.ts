import type { SkinVariant } from '../types';

export class ExperienceCardTechBadgeStyles {
	private static readonly variants: readonly SkinVariant[] = [
		'primary',
		'info',
		'accent',
		'success',
		'secondary',
		'warning',
	] as const;

	static variantForIndex(index: number): SkinVariant {
		return ExperienceCardTechBadgeStyles.variants[
			index % ExperienceCardTechBadgeStyles.variants.length
		];
	}
}
