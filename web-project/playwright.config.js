/**
 * Playwright Configuration for SmartFarm E2E Tests
 * Configures browser automation for comprehensive testing
 */

const { defineConfig, devices } = require('@playwright/test');

// Per-shard/job bound must stay below the GitHub Actions job timeout (45m).
// Full unsharded suite exceeds this; CI must run --project / --shard.
const CI_GLOBAL_TIMEOUT_MS = 35 * 60 * 1000;

module.exports = defineConfig({
  testDir: './tests/e2e',
  // Note: Tests should run from web-project directory
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  // Bound overall suite so one stuck click cannot hold a runner for hours.
  // Do not raise above CI job timeout; shard instead for full coverage.
  globalTimeout: process.env.CI ? CI_GLOBAL_TIMEOUT_MS : undefined,
  timeout: 45 * 1000,
  // Fail the job if any test only passed on retry (do not disable to go green)
  failOnFlakyTests: !!process.env.CI,
  reporter: process.env.CI
    ? [
        ['line'],
        ['html', { open: 'never' }],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/results.xml' }],
        ['blob', { outputDir: 'blob-report', fileName: `report-${process.env.PW_SHARD || 'local'}.zip` }],
      ]
    : [
        ['html'],
        ['json', { outputFile: 'test-results/results.json' }],
        ['junit', { outputFile: 'test-results/results.xml' }],
      ],
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 12 * 1000,
    navigationTimeout: 25 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    // Do NOT use `serve -s` (SPA fallback). Client routes like /analytics would
    // otherwise serve index.html and expose .preview-placeholder click intercepts.
    command: 'npx --yes serve public -l 8080',
    port: 8080,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
  expect: {
    toHaveScreenshot: { threshold: 0.2 },
    toMatchSnapshot: { threshold: 0.2 },
  },
  globalSetup: require.resolve('./tests/global-setup.js'),
  globalTeardown: require.resolve('./tests/global-teardown.js'),
});
