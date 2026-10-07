import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { coreConfig } from './tooling/lint-configs/core.js';
import { browserConfig } from './tooling/lint-configs/browser.js';

export default defineConfig([
	{
		files: ['**/*.js'],
		extends: [coreConfig],
		languageOptions: {
			globals: { ...globals.browser },
		},
		rules: {
			'comma-dangle': ['warn', 'always-multiline'],
		},
	},
	{
		files: ['src/assets/js/**/*.js'],
		extends: [browserConfig],
		rules: {
			// custom rules
		},
	},
]);
