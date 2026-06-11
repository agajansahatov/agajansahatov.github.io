import { forwardRef } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	activeClassName?: string;
}

const Link = forwardRef<HTMLAnchorElement, Props>(
	({ href, activeClassName, className, target = '_self', ...rest }, ref) => {
		const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
			window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

			if (rest.onClick) rest.onClick(e);
		};

		// External or hash → normal <a>
		if (isExternal(href) || isHash(href)) {
			return (
				<a
					ref={ref}
					href={href}
					target={target}
					rel={target === '_blank' ? 'noopener noreferrer' : undefined}
					className={className}
					{...rest}
				/>
			);
		}

		// Active link
		if (activeClassName) {
			return (
				<NavLink
					ref={ref}
					to={href}
					target={target}
					className={({ isActive }) =>
						isActive
							? `${className ?? ''} ${activeClassName}`.trim()
							: (className ?? '')
					}
					onClick={handleClick}
					{...rest}
				/>
			);
		}

		// Normal internal link
		return (
			<RouterLink
				ref={ref}
				to={href}
				target={target}
				className={className}
				onClick={handleClick}
				{...rest}
			/>
		);
	},
);

Link.displayName = 'Link';

function isExternal(to: string) {
	return /^https?:\/\//i.test(to);
}

function isHash(to: string) {
	return to.startsWith('#') || to.includes('#');
}

export default Link;
