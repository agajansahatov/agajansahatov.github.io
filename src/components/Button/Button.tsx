import { forwardRef } from 'react';
import styles from './Button.module.css';
import type { ButtonLayout, SkinVariant } from './types';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	layout?: ButtonLayout;
	variant?: SkinVariant;
}

const Button = forwardRef<HTMLButtonElement, Props>(
	(
		{
			className,
			variant = 'primary',
			layout = 'normal',
			type = 'button',
			children,
			...rest
		},
		ref,
	) => {
		const classNames = [styles.btn, styles[`btn--${variant}`]];
		if (layout !== 'normal') classNames.push(styles[`btn--${layout}`]);
		if (className) classNames.push(className);

		return (
			<button ref={ref} type={type} className={classNames.join(' ')} {...rest}>
				{children}
			</button>
		);
	},
);

Button.displayName = 'Button';
export default Button;
