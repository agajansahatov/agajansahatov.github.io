import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { PreferencesProvider } from './components/Preferences/PreferencesProvider';
import { useAOS } from './hooks/useAOS';
import { useHashScroll } from './hooks/useHashScroll';

const App = () => {
	useAOS();
	useHashScroll();

	return (
		<PreferencesProvider>
			<ScrollRestoration />
			<Outlet />
			<Toaster position='top-center' />
		</PreferencesProvider>
	);
};

export default App;
