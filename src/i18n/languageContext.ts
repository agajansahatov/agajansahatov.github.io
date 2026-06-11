import { createContext } from 'react';
import { DEFAULT_LANGUAGE_CODE } from '../config/preferences';
import type { LanguageCode } from '../types/preferences';

export const LanguageContext = createContext<LanguageCode>(
	DEFAULT_LANGUAGE_CODE,
);
