import { forwardRef } from 'react';
import Link from '../Link';
import styles from './Button.module.css';
import type { ButtonLayout, SkinVariant } from './types';

interface Props extends Omit<
	React.ComponentPropsWithoutRef<typeof Link>,
	'className'
> {
	variant?: SkinVariant;
	layout?: ButtonLayout;
	className?: string;
}

const ButtonLink = forwardRef<HTMLAnchorElement, Props>(
	({ variant = 'primary', layout = 'normal', className, ...rest }, ref) => {
		const classNames = [styles.btn, styles[`btn--${variant}`]];
		if (layout !== 'normal') classNames.push(styles[`btn--${layout}`]);
		if (className) classNames.push(className);

		return <Link ref={ref} className={classNames.join(' ')} {...rest} />;
	},
);

ButtonLink.displayName = 'ButtonLink';
export default ButtonLink;
