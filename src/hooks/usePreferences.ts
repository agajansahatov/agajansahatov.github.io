import { useContext } from 'react';
import { PreferencesContext } from '../components/Preferences/preferencesContext';

export const usePreferences = () => {
	const context = useContext(PreferencesContext);
	if (!context) {
		throw new Error('usePreferences must be used inside PreferencesProvider');
	}

	return context;
};
