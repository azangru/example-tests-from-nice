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
  webServer: {
    command: 'echo HELLO && npm run start',
    url: `http://localhost:${vitePort}`,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
