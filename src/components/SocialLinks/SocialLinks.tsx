import { FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa6';
import type { ComponentType } from 'react';
import { useSocialAccounts } from '../../hooks/useSocialAccounts';
import type { SocialPlatform } from '../../config/socialAccounts';
import Link from '../Link';
import styles from './SocialLinks.module.css';

type Props = {
	readonly variant?: 'inverted' | 'default';
	readonly note?: string;
	readonly className?: string;
};

const SOCIAL_ICONS: Record<
	SocialPlatform,
	ComponentType<{ size?: number }>
> = {
	instagram: FaInstagram,
	tiktok: FaTiktok,
	youtube: FaYoutube,
};

const SOCIAL_ICON_SIZES: Record<SocialPlatform, number> = {
	instagram: 28,
	tiktok: 25,
	youtube: 26,
};

const SocialLinks = ({
	variant = 'default',
	note,
	className,
}: Props) => {
	const profiles = useSocialAccounts();

	return (
		<div className={className}>
			<div className={styles.links} data-variant={variant}>
				{profiles.map((profile) => {
					const Icon = SOCIAL_ICONS[profile.platform];

					return (
						<Link
							key={profile.platform}
							href={profile.href}
							target='_blank'
							className={styles.link}
							aria-label={profile.label}
							title={`${profile.label} (@${profile.handle})`}
						>
							<Icon size={SOCIAL_ICON_SIZES[profile.platform]} />
						</Link>
					);
				})}
			</div>

			{note ? <p className={styles.note}>{note}</p> : null}
		</div>
	);
};

export default SocialLinks;
