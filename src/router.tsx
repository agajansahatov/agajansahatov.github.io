import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './Layout';
import LanguageHomeRedirect from './components/Language/LanguageHomeRedirect';
import LanguageRoute from './components/Language/LanguageRoute';
import RootRedirect from './components/Language/RootRedirect';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{ index: true, element: <RootRedirect /> },
			{
				path: ':lang',
				element: <LanguageRoute />,
				children: [
					{
						element: <Layout />,
						children: [
							{ index: true, element: <HomePage /> },
							{
								path: 'pricing',
								lazy: async () => ({
									Component: (await import('./pages/PricingPage')).default,
								}),
							},
							{
								path: 'experience',
								lazy: async () => ({
									Component: (await import('./pages/ExperiencePage')).default,
								}),
							},
							{
								path: 'expertise',
								lazy: async () => ({
									Component: (await import('./pages/ExpertisePage')).default,
								}),
							},
							{
								path: 'projects',
								lazy: async () => ({
									Component: (await import('./pages/ProjectsPage')).default,
								}),
							},
							{
								path: 'resume-cv',
								lazy: async () => ({
									Component: (await import('./pages/ResumeCvPage')).default,
								}),
							},
							{
								path: 'contact',
								lazy: async () => ({
									Component: (await import('./pages/ContactPage')).default,
								}),
							},
							{
								path: 'about',
								lazy: async () => ({
									Component: (await import('./pages/AboutPage')).default,
								}),
							},
							{
								path: 'settings',
								lazy: async () => ({
									Component: (await import('./pages/SettingsPage')).default,
								}),
							},
							{ path: 'docs', element: <LanguageHomeRedirect /> },
							{ path: 'explore', element: <LanguageHomeRedirect /> },
							{
								path: 'explore-features',
								element: <LanguageHomeRedirect />,
							},
							{ path: '*', element: <NotFoundPage /> },
						],
					},
				],
			},
		],
	},
]);

export default router;
