import type { ReactElement } from 'react';
import {
	FaMobileScreen,
	FaMobileScreenButton,
	FaServer,
} from 'react-icons/fa6';
import { TbWorldWww } from 'react-icons/tb';
import Block from '../../../../components/Block';
import BlockHeader from '../../../../components/Block/BlockHeader';
import Feature from '../../../../components/Feature';
import Icon from '../../../../components/Icon';
import type { SkinVariant } from '../../../../components/types';
import { useTranslation } from '../../../../i18n';

const ServicesSection = () => {
	const { t } = useTranslation();

	return (
		<Block variant='inverted' direction='right' id='services-section'>
			<BlockHeader>
				<h2>{t.explore.servicesTitle}</h2>
				<p>{t.explore.servicesText}</p>
			</BlockHeader>

			{t.explore.services.map((service, index) => {
				const asset = serviceAssets[index];
				if (!asset) return null;

				return (
					<Feature
						key={service.id}
						heading={service.heading}
						icon={createServiceIcon(index, asset.iconVariant)}
						imageUrl={asset.imageUrl}
						link={asset.link}
						isTheImageMultiSource={asset.isTheImageMultiSource}
						dataAos={index % 2 === 0 ? 'fade-up-right' : 'fade-up-left'}
						id={service.id}
					>
						{service.body}
					</Feature>
				);
			})}
		</Block>
	);
};

export default ServicesSection;

type ServiceAsset = {
	readonly imageUrl: string;
	readonly link: string;
	readonly iconVariant: SkinVariant;
	readonly isTheImageMultiSource?: boolean;
};

const serviceAssets: readonly ServiceAsset[] = [
	{
		imageUrl: '/images/web.svg',
		link: '#services2',
		iconVariant: 'primary',
	},
	{
		imageUrl: '/images/server.svg',
		link: '#services3',
		iconVariant: 'secondary',
	},
	{
		imageUrl: '/images/mobile.svg',
		link: '#services4',
		iconVariant: 'success',
	},
	{
		imageUrl: '/images/devices.png',
		link: '#section-expertise',
		iconVariant: 'info',
		isTheImageMultiSource: true,
	},
] as const;

const serviceIconComponents = [
	TbWorldWww,
	FaServer,
	FaMobileScreen,
	FaMobileScreenButton,
] as const;

function createServiceIcon(index: number, variant: SkinVariant): ReactElement {
	const IconComponent = serviceIconComponents[index];
	return <Icon icon={IconComponent} variant={variant} />;
}
