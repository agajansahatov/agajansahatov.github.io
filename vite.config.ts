import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rolldownOptions: {
			output: {
				codeSplitting: {
					minSize: 20_000,
					groups: [
						{
							name: 'react-vendor',
							test: /node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
						},
						{
							name: 'icons-vendor',
							test: /node_modules[\\/]react-icons[\\/]/,
						},
						{
							name: 'vendor',
							test: /node_modules[\\/]/,
						},
					],
				},
			},
		},
	},
});
