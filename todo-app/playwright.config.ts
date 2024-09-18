import { defineConfig, devices } from '@playwright/test';

const vitePort = 5173;

export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Run your local dev server before starting the tests
  // webServer: {
  //   command: 'npm run start',
  //   url: `http://localhost:${vitePort}`,
  //   reuseExistingServer: !process.env.CI,
  //   stdout: 'ignore',
  //   stderr: 'pipe',
  // },
  use: {
    baseURL: `http://localhost:${vitePort}`,
  },
});
