import { IShowcase } from '../interfaces';

const showCases: IShowcase[] = [
	{
		heading: 'One Code, Multiple Platforms',
		iconName: 'web',
		imageUrl: '/images/cross-platform.svg',
		link: '#showcase2',
		content:
			'I design systems that maximize code reuse across platforms (web, mobile ios and android) while maintaining performance and flexibility.',
	},
	{
		heading: 'Easy to Maintain & Simply Fast Applications',
		iconName: 'easy',
		imageUrl: '/images/maintainable.svg',
		link: '#showcase3',
		content:
			'I design maintainable and extensible object-oriented softwares with reduced complexity. This helps us to develop the apps in a faster period, and give more focus on the speed of the applications.',
	},
	{
		heading: 'Minimum Cost and Quicker Development Process',
		iconName: 'efficiency',
		imageUrl: '/images/efficiency.svg',
		link: '#showcase4',
		content:
			'By using proven tools, frameworks and cross-platform solutions, I deliver my projects faster without sacrificing quality and time.',
	},
	{
		heading: 'Flexibility and Trusted Delivery',
		iconName: 'trust',
		imageUrl: '/images/trustworthy.svg',
		link: '#showcase5',
		content:
			'I provide multiple payment terms and flexible agreements to enable you to grow up your business the way you want. Additionally, I guarantee quality assurance by delivering stable and well-tested applications to have the most pleasant user experience.',
	},
	{
		heading: '24/7 Support & Communication',
		iconName: 'clock',
		imageUrl: '/images/support.svg',
		link: '#section-testimonials',
		content:
			'I communicate clearly, respond quickly, and stay involved throughout the development lifecycle. Also, I am always available to assist you with any questions or concerns you may have.',
	},
];

export function getShowCases() {
	return showCases;
}
