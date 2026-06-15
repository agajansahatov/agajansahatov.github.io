import type { ComponentType } from 'react';
import type { SkinVariant } from '../components/types';

export type WorkExperienceId =
	| 'xcargo'
	| 'smart-walnut'
	| 'zhilin'
	| 'tut-web-dev'
	| 'tut-cpp'
	| 'jinzhong-vr-volunteer';

export type EducationId = 'xisu-chinese' | 'tut-bachelors' | 'ncu-masters';

export type ExperienceId = WorkExperienceId | EducationId;

export type ExperienceContent<TId extends ExperienceId = ExperienceId> = {
	readonly id: TId;
	readonly role: string;
	readonly organization: string;
	readonly location: string;
	readonly description: string;
};

export type ExperienceAsset<TId extends ExperienceId = ExperienceId> = {
	readonly id: TId;
	readonly logoIcon: ComponentType;
	readonly iconVariant: SkinVariant;
	readonly organizationUrl?: string;
	readonly tech: readonly string[];
	readonly startDate: string;
	readonly endDate: string | null;
};

export type ResolvedExperience<TId extends ExperienceId = ExperienceId> =
	ExperienceContent<TId> &
		Pick<
			ExperienceAsset<TId>,
			| 'logoIcon'
			| 'iconVariant'
			| 'organizationUrl'
			| 'tech'
			| 'startDate'
			| 'endDate'
		>;
