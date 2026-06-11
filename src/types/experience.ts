import type { ComponentType } from 'react';
import type { SkinVariant } from '../components/types';

export type ExperienceId =
	| 'xcargo'
	| 'ncu-masters'
	| 'smart-walnut'
	| 'tut-bachelors'
	| 'zhilin'
	| 'tut-web-dev'
	| 'tut-cpp';

export type ExperienceContent = {
	readonly id: ExperienceId;
	readonly role: string;
	readonly company: string;
	readonly location: string;
	readonly description: string;
};

export type ExperienceAsset = {
	readonly id: ExperienceId;
	readonly logoIcon: ComponentType;
	readonly iconVariant: SkinVariant;
	readonly companyUrl?: string;
	readonly tech: readonly string[];
	readonly startDate: string;
	readonly endDate: string | null;
};

export type ResolvedExperience = ExperienceContent &
	Pick<
		ExperienceAsset,
		'logoIcon' | 'iconVariant' | 'companyUrl' | 'tech' | 'startDate' | 'endDate'
	>;
