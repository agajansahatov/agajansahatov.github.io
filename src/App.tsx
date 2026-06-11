import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAOS } from './hooks/useAOS';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { useHashScroll } from './hooks/useHashScroll';

const App = () => {
	useAOS();
	useDocumentTitle();
	useHashScroll();

	return (
		<>
			<Outlet />
			<Toaster position='top-center' />
		</>
	);
};

export default App;
