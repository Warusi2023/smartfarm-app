/**
 * Playwright Configuration for SmartFarm E2E Tests
 * Configures browser automation for comprehensive testing
 */

const { defineConfig, devices } = require('@playwright/test');
const { getE2EApiBase } = require('./tests/e2e/helpers/api-base');

// Per-shard/job bound must stay below the GitHub Actions job timeout (45m).
// Full unsharded suite exceeds this; CI must run --project / --shard.
const CI_GLOBAL_TIMEOUT_MS = 35 * 60 * 1000;

const API_BASE = getE2EApiBase();
const API_PORT = Number(process.env.PLAYWRIGHT_API_PORT || 3099);
const API_HOST = process.env.PLAYWRIGHT_API_HOST || '127.0.0.1';

/** Browser matrix must not run live Railway smoke. */
const BROWSER_TEST_IGNORE = [/railway-smoke\.spec\.js/];

module.exports = defineConfig({
  testDir: './tests/e2e',
  // Note: Tests should run from web-project directory
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  // Shared mock API is process-global; keep a single worker so mutations cannot race.
  workers: 1,
  // Bound overall suite so one stuck click cannot hold a runner for hours.
  // Do not raise above CI job timeout; shard instead for full coverage.
  globalTimeout: process.env.CI ? CI_GLOBAL_TIMEOUT_MS : undefined,
  // Keep the global per-test bound at 45s; WebKit/Mobile Safari may raise in CI only.
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
    navigationTimeout: process.env.CI ? 45 * 1000 : 25 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: BROWSER_TEST_IGNORE,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: BROWSER_TEST_IGNORE,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: BROWSER_TEST_IGNORE,
      use: { ...devices['Desktop Safari'] },
      // CI-only: WebKit is slower under GHA; do not raise the global matrix timeout.
      ...(process.env.CI ? { timeout: 90 * 1000 } : {}),
    },
    {
      name: 'Mobile Chrome',
      testIgnore: BROWSER_TEST_IGNORE,
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      testIgnore: BROWSER_TEST_IGNORE,
      use: { ...devices['iPhone 12'] },
      ...(process.env.CI ? { timeout: 90 * 1000 } : {}),
    },
    {
      // Separate from the multi-browser UI matrix. Run:
      //   RAILWAY_API_BASE=... npx playwright test --project=railway-smoke
      name: 'railway-smoke',
      testMatch: /railway-smoke\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'node tests/e2e/tee-server.js mock-api.log node tests/e2e/mock-api-server.js',
      url: `http://${API_HOST}:${API_PORT}/api/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
      env: {
        ...process.env,
        PLAYWRIGHT_API_PORT: String(API_PORT),
        PLAYWRIGHT_API_HOST: API_HOST === 'localhost' || API_HOST === '127.0.0.1'
          ? API_HOST
          : '127.0.0.1',
        RAILWAY_API_BASE: '',
        SMARTFARM_RAILWAY_API_BASE: '',
      },
    },
    {
      // Do NOT use `serve -s` (SPA fallback). Client routes like /analytics would
      // otherwise serve index.html and expose .preview-placeholder click intercepts.
      command: 'node tests/e2e/tee-server.js frontend-static.log node ./node_modules/serve/build/main.js public -l 8080',
      url: 'http://localhost:8080',
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
      env: {
        ...process.env,
        // Force mock origin for the static server process; clear live Railway vars
        // so inherited CI/local env cannot redirect the browser matrix.
        SMARTFARM_API_BASE: API_BASE,
        PLAYWRIGHT_API_BASE: API_BASE,
        VITE_API_BASE_URL: API_BASE,
        VITE_API_URL: API_BASE,
        RAILWAY_API_BASE: '',
        SMARTFARM_RAILWAY_API_BASE: '',
      },
    },
  ],
  expect: {
    toHaveScreenshot: { threshold: 0.2 },
    toMatchSnapshot: { threshold: 0.2 },
  },
  globalSetup: require.resolve('./tests/global-setup.js'),
  globalTeardown: require.resolve('./tests/global-teardown.js'),
});
