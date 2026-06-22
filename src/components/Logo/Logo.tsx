import { useTranslation } from '../../i18n';
import Avatar from '../Avatar';
import Link from '../Link';
import styles from './Logo.module.css';

interface Props {
	href?: string;
	shouldHideTitleOnSmallScreens?: boolean;
	onClick?: () => void;
	className?: string;
	titleClassName?: string;
	iconClassName?: string;
}

const Logo = ({
	href = '/',
	onClick,
	shouldHideTitleOnSmallScreens,
	className,
	titleClassName,
	iconClassName,
}: Props) => {
	const { portfolioName, t } = useTranslation();

	return (
		<Link
			aria-label={portfolioName}
			className={`${styles.logo} ${className || ''}`}
			href={href}
			onClick={onClick}
		>
			<Avatar
				className={`${styles.logo__icon} ${iconClassName || ''}`}
				size='md'
				aria-label={t.components.logoAlt}
			/>
			<span
				className={`${styles.logo__title} ${
					shouldHideTitleOnSmallScreens ? styles['logo__title--hideable'] : ''
				} ${titleClassName || ''}`}
			>
				{portfolioName}
			</span>
		</Link>
	);
};

export default Logo;

