import { TURKMENISTAN_COUNTRY_CODE } from './preferences';

export type SocialRegion = 'turkmenistan' | 'international';

export type SocialPlatform = 'instagram' | 'tiktok' | 'youtube';

export type SocialProfile = {
	readonly platform: SocialPlatform;
	readonly handle: string;
	readonly href: string;
	readonly label: string;
};

const ACCOUNT_HANDLES = {
	turkmenistan: {
		instagram: 'agajan_sahatow',
		tiktok: 'agajansahatow',
		youtube: 'kodplusplus',
	},
	international: {
		instagram: 'agajansahatov',
		tiktok: 'agajansahatov',
		youtube: 'coderplusplus',
	},
} as const satisfies Record<SocialRegion, Record<SocialPlatform, string>>;

const SOCIAL_PLATFORMS: readonly SocialPlatform[] = [
	'instagram',
	'tiktok',
	'youtube',
];

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
	instagram: 'Instagram',
	tiktok: 'TikTok',
	youtube: 'YouTube',
};

export function resolveSocialRegion(
	countryCode: string | null | undefined,
): SocialRegion {
	return countryCode?.toUpperCase() === TURKMENISTAN_COUNTRY_CODE
		? 'turkmenistan'
		: 'international';
}

function buildSocialUrl(platform: SocialPlatform, handle: string): string {
	switch (platform) {
		case 'instagram':
			return `https://www.instagram.com/${handle}/`;
		case 'tiktok':
			return `https://www.tiktok.com/@${handle}`;
		case 'youtube':
			return `https://www.youtube.com/@${handle}`;
	}
}

export function getSocialProfiles(
	region: SocialRegion,
): readonly SocialProfile[] {
	const handles = ACCOUNT_HANDLES[region];

	return SOCIAL_PLATFORMS.map((platform) => {
		const handle = handles[platform];

		return {
			platform,
			handle,
			href: buildSocialUrl(platform, handle),
			label: SOCIAL_LABELS[platform],
		};
	});
}
