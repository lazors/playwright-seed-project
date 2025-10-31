import { defineConfig, devices } from '@playwright/test';
import { getEnvironmentConfig } from './config/environments';

const envConfig = getEnvironmentConfig();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry configuration from environment */
  retries: envConfig.retries,
  /* Worker configuration from environment */
  workers: envConfig.workers,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL from environment configuration */
    baseURL: envConfig.baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: envConfig.trace,
    
    /* Take screenshot on failure */
    screenshot: envConfig.screenshot,
    
    /* Record video on failure */
    video: envConfig.video,

    /* Action timeout */
    actionTimeout: envConfig.timeout / 6,
    
    /* Navigation timeout */
    navigationTimeout: envConfig.timeout / 2
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' }
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' }
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  
  /* Global setup and teardown */
  // globalSetup: require.resolve('./global-setup'),
  // globalTeardown: require.resolve('./global-teardown'),
  
  /* Test timeout */
  timeout: 30 * 1000,
  
  /* Expect timeout */
  expect: {
    timeout: 5 * 1000
  }
}); 