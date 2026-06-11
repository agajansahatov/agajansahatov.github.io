import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUTPUT_PATH = join(ROOT, 'src/generated/githubContributions.json');

/** Keep in sync with src/config/github.ts */
const GITHUB_PROFILE = {
	username: 'agajansahatov',
	accountCreatedAt: '2022-12-20T00:00:00.000Z',
	contributionsFallback: 1049,
};

const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

const CONTRIBUTIONS_QUERY = `
	query ($login: String!, $from: DateTime!, $to: DateTime!) {
		user(login: $login) {
			contributionsCollection(from: $from, to: $to) {
				contributionCalendar {
					totalContributions
				}
			}
		}
	}
`;

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

function buildContributionYearRanges(accountCreatedAt, until = new Date()) {
	const ranges = [];
	let rangeStart = new Date(accountCreatedAt);
	const end = new Date(until);

	while (rangeStart < end) {
		const rangeEnd = new Date(
			Math.min(rangeStart.getTime() + ONE_YEAR_MS - 1, end.getTime()),
		);
		ranges.push({
			from: rangeStart.toISOString(),
			to: rangeEnd.toISOString(),
		});
		rangeStart = new Date(rangeEnd.getTime() + 1);
	}

	return ranges;
}

async function fetchContributionsForRange(login, from, to, token) {
	const response = await fetch(GITHUB_GRAPHQL_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			query: CONTRIBUTIONS_QUERY,
			variables: { login, from, to },
		}),
	});

	if (!response.ok) {
		throw new Error(`GitHub API responded with ${response.status}`);
	}

	const payload = await response.json();

	if (payload.errors?.length) {
		throw new Error(payload.errors[0]?.message ?? 'GitHub GraphQL error');
	}

	return (
		payload.data?.user?.contributionsCollection?.contributionCalendar
			?.totalContributions ?? 0
	);
}

async function fetchTotalGitHubContributions(login, accountCreatedAt, token) {
	const ranges = buildContributionYearRanges(accountCreatedAt);
	const counts = await Promise.all(
		ranges.map(({ from, to }) =>
			fetchContributionsForRange(login, from, to, token),
		),
	);
	return counts.reduce((sum, count) => sum + count, 0);
}

function writeContributionsFile({ count, source }) {
	mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
	writeFileSync(
		OUTPUT_PATH,
		`${JSON.stringify(
			{
				count,
				fetchedAt: new Date().toISOString(),
				source,
			},
			null,
			'\t',
		)}\n`,
	);
}

async function main() {
	const token = process.env.GITHUB_TOKEN;

	if (!token) {
		console.warn(
			'GITHUB_TOKEN is not set. Writing fallback GitHub contribution count.',
		);
		writeContributionsFile({
			count: GITHUB_PROFILE.contributionsFallback,
			source: 'fallback',
		});
		return;
	}

	try {
		const count = await fetchTotalGitHubContributions(
			GITHUB_PROFILE.username,
			GITHUB_PROFILE.accountCreatedAt,
			token,
		);
		writeContributionsFile({ count, source: 'github-api' });
		console.log(`Fetched ${count} GitHub contributions for ${GITHUB_PROFILE.username}.`);
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.warn(
			`Failed to fetch GitHub contributions (${message}). Writing fallback count.`,
		);
		writeContributionsFile({
			count: GITHUB_PROFILE.contributionsFallback,
			source: 'fallback',
		});
	}
}

await main();
