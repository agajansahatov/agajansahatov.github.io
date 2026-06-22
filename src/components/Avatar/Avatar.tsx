import { getPortfolioInitials } from '../../config/portfolio';
import styles from './Avatar.module.css';

interface Props {
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	'aria-label'?: string;
}

const Avatar = ({ className, size = 'md', 'aria-label': ariaLabel }: Props) => {
	const classNames = [styles.avatar, styles[`avatar--${size}`]];
	if (className) classNames.push(className);

	return (
		<span className={classNames.join(' ')} aria-label={ariaLabel} role='img'>
			{getPortfolioInitials()}
		</span>
	);
};

export default Avatar;
