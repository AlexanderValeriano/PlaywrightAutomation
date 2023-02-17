// @ts-check
const { devices } = require("@playwright/test");

const config = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 100 * 1000,
  expect: {
    timeout: 5000,
  },

  // RUN DIFERENT CONFIGURATIONS
  // npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js --project=safari
  // npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js --project=chrome

  reporter: "html",
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: "on",
        trace: "on", // on,off or retain-on-failure
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromiun",
        headless: true,
        screenshot: "on",
        trace: "on", // on,off or retain-on-failure
      },
    },
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
};

module.exports = config;

// RUN with one config
// npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js
