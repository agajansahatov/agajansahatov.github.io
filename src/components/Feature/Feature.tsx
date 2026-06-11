import type { ReactNode } from 'react';
import styles from './Feature.module.css';
import ArrowLink from '../Link/ArrowLink';
import Picture from '../Picture';
import { useTranslation } from '../../i18n';

interface Props {
	children: ReactNode;
	heading: string;
	icon: ReactNode;
	imageUrl: string;
	link: string;
	linkLabel?: string;
	dataAos?: string;
	id?: string;
	isTheImageMultiSource?: boolean;
}

const Feature = ({
	children,
	heading,
	icon,
	imageUrl,
	link,
	linkLabel,
	dataAos = '',
	id,
	isTheImageMultiSource = false,
}: Props) => {
	const { t } = useTranslation();
	const AOSAttributes1 = dataAos ? { 'data-aos': dataAos } : {};
	const AOSAttributes2 = dataAos
		? {
				'data-aos':
					dataAos === 'fade-up-right' ? 'fade-up-left' : 'fade-up-right',
			}
		: {};
	const idAtrr = id ? { id } : {};

	return (
		<article
			className={`grid grid--cols-1 md:grid--cols-2 ${styles['feature']}`}
			{...idAtrr}
		>
			<div className={styles['feature__content']} {...AOSAttributes1}>
				{icon}
				<h3 className={styles['feature__heading']}>{heading}</h3>
				<p>{children}</p>
				<ArrowLink href={link}>{linkLabel ?? t.common.learnMore}</ArrowLink>
			</div>
			{/* Here Image Size should be: 1140x725 */}
			<div {...AOSAttributes2}>
				<Picture
					className={styles['feature__image']}
					type={isTheImageMultiSource ? 'multi-source' : 'regular'}
					src={imageUrl}
				/>
			</div>
		</article>
	);
};

export default Feature;
