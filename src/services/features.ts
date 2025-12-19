import { IFeature } from '../interfaces';

const features: IFeature[] = [
	{
		heading: 'WEB Development',
		iconName: 'web',
		imageUrl: '/images/web.svg',
		link: '#services2',
		content:
			'I build modern, beautiful, responsive and incredibly fast websites and web apps. From planning to design and development – my goal is to build high-performing, usable, maintainable and award-winning web applications. Get a perfect website or web app to start or to keep your business moving forward with my skills.',
	},
	{
		heading: 'Backend & API Development',
		iconName: 'server',
		imageUrl: '/images/server.svg',
		link: '#services3',
		content:
			'I design secure and scalable backend systems that power real-world applications. This includes APIs, authentication systems, database design, and business logic built for long-term growth. To create incredible user experiences, I offer the perfect back-end solution for your business ambitions.',
	},
	{
		heading: 'Mobile App Development',
		iconName: 'mobile',
		imageUrl: '/images/mobile.svg',
		link: '#services4',
		content:
			'I create fast and reliable mobile applications for both Android and iOS. My approach focuses on performance, clean architecture, and a smooth user experience. I use the latest technologies to create a seamless experience for your users, and I am committed to delivering high-quality, reliable software that meets your business needs.',
	},
	{
		heading: 'Cross-Platform Solutions',
		iconName: 'devices',
		imageUrl: '/images/devices.png',
		link: '#section-expertise',
		content:
			"Get a multi-device app faster with a single strike, because I develop beautiful applications that run across web and mobile platforms from a shared codebase. This approach reduces development time while maintaining native-like performance and quality, that's why it is a perfect solution for companies that face budget or time constraints.",
	},
];

export function getFeatures() {
	return features;
}
