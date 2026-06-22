export type HomeProjectId =
	| 'xcargo'
	| 'game-hub'
	| 'sada'
	| 'home-guardian'
	| 'uds'
	| 'abms'
	| 'circle'
	| 'utopia';

export type ProjectContent = {
	readonly id: HomeProjectId;
	readonly name: string;
	readonly description: string;
	readonly tools: readonly string[];
	readonly imageAlt: string;
};

export type ResolvedHomeProject = ProjectContent & {
	readonly image: string;
	readonly projectUrl: string;
	readonly createdDate: string;
};
