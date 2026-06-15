import { useEffect, useMemo, useState } from 'react';
import {
	getSocialProfiles,
	resolveSocialRegion,
	type SocialProfile,
	type SocialRegion,
} from '../config/socialAccounts';
import { getCachedCountryCode } from '../services/preferences/cachedGeoCountryService';

export function useSocialAccounts(): readonly SocialProfile[] {
	const [region, setRegion] = useState<SocialRegion>('international');

	useEffect(() => {
		let isCancelled = false;

		void getCachedCountryCode().then((countryCode) => {
			if (!isCancelled) {
				setRegion(resolveSocialRegion(countryCode));
			}
		});

		return () => {
			isCancelled = true;
		};
	}, []);

	return useMemo(() => getSocialProfiles(region), [region]);
}
