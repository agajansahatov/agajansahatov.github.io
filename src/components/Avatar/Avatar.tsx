import { getPortfolioInitials } from '../../config/portfolio';
import styles from './Avatar.module.css';

interface Props {
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	'aria-label'?: string;
	isDecorative?: boolean;
}

const Avatar = ({
	className,
	size = 'md',
	'aria-label': ariaLabel,
	isDecorative = false,
}: Props) => {
	const classNames = [styles.avatar, styles[`avatar--${size}`]];
	if (className) classNames.push(className);

	return (
		<span
			className={classNames.join(' ')}
			aria-hidden={isDecorative ? true : undefined}
			aria-label={isDecorative ? undefined : ariaLabel}
			role={isDecorative ? undefined : 'img'}
		>
			{getPortfolioInitials()}
		</span>
	);
};

export default Avatar;
