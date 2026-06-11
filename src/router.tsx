import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Layout from './Layout';
import LanguageHomeRedirect from './components/Language/LanguageHomeRedirect';
import LanguageRoute from './components/Language/LanguageRoute';
import RootRedirect from './components/Language/RootRedirect';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PricingPage from './pages/PricingPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import ExpertisePage from './pages/ExpertisePage';
import ResumeCvPage from './pages/ResumeCvPage';
import SettingsPage from './pages/SettingsPage';

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
							{ path: 'pricing', element: <PricingPage /> },
							{ path: 'experience', element: <ExperiencePage /> },
							{ path: 'expertise', element: <ExpertisePage /> },
							{ path: 'projects', element: <ProjectsPage /> },
							{ path: 'resume-cv', element: <ResumeCvPage /> },
							{ path: 'contact', element: <ContactPage /> },
							{ path: 'about', element: <AboutPage /> },
							{ path: 'settings', element: <SettingsPage /> },
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
