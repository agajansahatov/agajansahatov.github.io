import { GITHUB_PROFILE } from '../config/github';
import contributionsData from '../generated/githubContributions.json';

type ContributionsData = {
	count: number;
	fetchedAt: string;
	source: 'github-api' | 'fallback';
};

const contributions = contributionsData as ContributionsData;

export function useGitHubContributions() {
	return {
		count: contributions.count ?? GITHUB_PROFILE.contributionsFallback,
		isLive: contributions.source === 'github-api',
	};
}
