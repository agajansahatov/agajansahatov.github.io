/** Public GitHub profile used for live contribution stats on the home page. */
export const GITHUB_PROFILE = {
	username: 'agajansahatov',
	/** Account creation date from https://api.github.com/users/agajansahatov */
	accountCreatedAt: '2022-12-20T00:00:00.000Z',
	/**
	 * All-time contributions fallback when the GitHub API is unreachable.
	 * Sum of public contribution years (2023–2026) as of 2026-05-29; refresh periodically.
	 */
	contributionsFallback: 1049,
} as const;
