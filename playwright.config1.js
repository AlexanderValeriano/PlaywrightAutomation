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
        //Ouvrir in responsive iphene 11
        browserName: "webkit",
        headless: false,
        screenshot: "on",
        trace: "on", // on,off or retain-on-failure
        ...devices["iPhone 11"],
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        video: "retain-on-failure",
        //SSL Certification and Geolocalisation permission
        ignoreHttpsErrors: true,
        permissions: ["geolocation"],
        trace: "on", // on,off or retain-on-failure
        viewport: { width: 720, height: 720 },
        // ...devices['Galaxy Note 3']
      },
    },
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
};

module.exports = config;

// RUN with one config
// npx playwright test tests/ClientAppPO.spec.js --config playwright.config1.js
