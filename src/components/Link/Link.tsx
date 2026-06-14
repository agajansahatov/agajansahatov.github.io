import { forwardRef } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { useLanguage } from '../../i18n/useLanguage';
import { localizeHref, stripLanguagePrefix } from '../../i18n/languagePath';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
	href: string;
	activeClassName?: string;
}

const Link = forwardRef<HTMLAnchorElement, Props>(
	({ href, activeClassName, className, target = '_self', ...rest }, ref) => {
		const language = useLanguage();

		// External or same-page hash anchor → normal <a>
		if (isExternal(href) || href.startsWith('#')) {
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

		const localizedHref = localizeHref(href, language);

		// Active link
		if (activeClassName) {
			return (
				<NavLink
					ref={ref}
					to={localizedHref}
					end={stripLanguagePrefix(href) === '/'}
					target={target}
					className={({ isActive }) =>
						isActive
							? `${className ?? ''} ${activeClassName}`.trim()
							: (className ?? '')
					}
					{...rest}
				/>
			);
		}

		// Normal internal link
		return (
			<RouterLink
				ref={ref}
				to={localizedHref}
				target={target}
				className={className}
				{...rest}
			/>
		);
	},
);

Link.displayName = 'Link';

function isExternal(to: string) {
	// Any URI scheme (http:, https:, mailto:, tel:, sms:, ...) or a
	// protocol-relative URL is handled by a plain anchor, not the router.
	return /^[a-z][a-z0-9+.-]*:/i.test(to) || to.startsWith('//');
}

export default Link;
