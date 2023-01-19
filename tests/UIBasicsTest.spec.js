const { test } = require("@playwright/test");

test("Browser Context Playwright Test", async ({ browser }) => {
  //chrome - plugins / cookies;
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://www.google.com");
});
