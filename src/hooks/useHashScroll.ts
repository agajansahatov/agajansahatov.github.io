import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useHashScroll = () => {
	const { hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const timeoutId = setTimeout(() => {
				const element = document.querySelector(hash);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth' });
				}
			}, 100);
			return () => clearTimeout(timeoutId);
		}
	}, [hash]);
};
