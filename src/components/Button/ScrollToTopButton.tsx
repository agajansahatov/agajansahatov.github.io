import { useEffect, useState } from 'react';
import Icon from '../Icon';
import styles from './ScrollToTopButton.module.css';
import { FaArrowUp } from 'react-icons/fa6';
import { useTranslation } from '../../i18n';

const ScrollToTopBtn = () => {
	const [display, setDisplay] = useState('none');
	const [scrollValue, setScrollValue] = useState(0);
	const { t } = useTranslation();

	useEffect(() => {
		const handleScroll = () => {
			const scrollElement = document.documentElement ?? document.body;
			const pos =
				window.pageYOffset !== undefined
					? window.pageYOffset
					: scrollElement.scrollTop;
			const height =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;

			setScrollValue(Math.round((pos * 100) / height));

			if (pos > 100) {
				setDisplay('grid');
			} else {
				setDisplay('none');
			}
		};

		window.addEventListener('scroll', handleScroll);
		window.addEventListener('onload', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const progress = `conic-gradient(#21f405 ${
		scrollValue + 1
	}%, #fff ${scrollValue}%)`;

	const handleClick = () => {
		window.scrollTo(0, 0);
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
	};

	return (
		<button
			id='scroll-progress'
			className={styles['scroll-to-top']}
			style={{ display: display, background: progress }}
			onClick={handleClick}
			type='button'
			aria-label={t.components.scrollToTop}
		>
			<Icon icon={FaArrowUp} className={styles['scroll-to-top__icon']} />
		</button>
	);
};

export default ScrollToTopBtn;
