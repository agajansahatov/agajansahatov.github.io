import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const INITIAL_DELAY_MS = 100;
const RETRY_INTERVAL_MS = 50;
const MAX_RETRY_MS = 2000;

export const useHashScroll = () => {
	const { hash } = useLocation();

	useEffect(() => {
		if (!hash) return;

		let retryTimeoutId: ReturnType<typeof setTimeout> | undefined;
		const startedAt = Date.now();

		const scrollToHashTarget = () => {
			const element = document.querySelector(hash);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
				return;
			}

			if (Date.now() - startedAt < MAX_RETRY_MS) {
				retryTimeoutId = setTimeout(scrollToHashTarget, RETRY_INTERVAL_MS);
			}
		};

		const initialTimeoutId = setTimeout(scrollToHashTarget, INITIAL_DELAY_MS);

		return () => {
			clearTimeout(initialTimeoutId);
			if (retryTimeoutId) clearTimeout(retryTimeoutId);
		};
	}, [hash]);
};
