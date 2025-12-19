import { IExpertise } from '../interfaces';

const expertises: IExpertise[] = [
	{
		title: 'HTML & CSS',
		icon: 'htmlcss',
		body: "Core technologies for building accessible, responsive, and well-structured web user interfaces. HTML provides the page's structure, and CSS the layout for various devices.",
	},
	{
		title: 'JavaScript',
		icon: 'javascript',
		body: "JavaScript is the world's most popular programming language. It is used to build web/mobile apps, real-time networking apps, command line tools and sometimes games. ",
	},
	{
		title: 'TypeScript',
		icon: 'typescript',
		body: "TypeScript is build on top of JavaScript and when it is compiled, under the hood, it is converted to JavaScript. It is used to build large-scale applications with strong typing, reliability, and better developer experience. That's why it's my primary programming language for building interactive web and mobile applications",
	},
	{
		title: 'React & React Native',
		icon: 'react',
		body: 'Both of these two technologies are JavaScript frameworks developed by Facebook. Reactjs is used for building modern web interfaces and React Native for cross-platform mobile applications.',
	},
	{
		title: 'Node.js',
		icon: 'node',
		body: 'Node.js is a free, open-sourced, cross-platform JavaScript run-time environment that lets developers write command line tools and server-side scripts outside of a browser. I use it to build fast, scalable backend services and APIs.',
	},
	{
		title: 'MySQL',
		icon: 'mysql',
		body: 'MySQL is an open-source relational database management system used for adding, accessing, and processing data stored in the server computer.',
	},
];

export function getExpertises() {
	return expertises;
}
