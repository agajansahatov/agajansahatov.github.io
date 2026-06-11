import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import 'aos/dist/aos.css';
import './globals.css';
import { RouterProvider } from 'react-router-dom';
import { PreferencesProvider } from './components/Preferences/PreferencesProvider';
import router from './router';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<PreferencesProvider>
			<RouterProvider router={router} />
		</PreferencesProvider>
	</StrictMode>,
);
