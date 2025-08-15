import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	workers: 1,
	reporter: 'list',
	use: {
		baseURL: 'http://localhost:8080',
		trace: 'on-first-retry',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
	],
});


