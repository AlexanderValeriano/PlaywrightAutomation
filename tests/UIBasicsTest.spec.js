const { test, expect } = require("@playwright/test");

test("Browser Context Playwright Test", async ({ browser }) => {
  //chrome - plugins / cookies;
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //css, xpath
  page.locator("#username").type("rahulshetty");
  page.locator("#password").type("learning");
  page.locator("#signInBtn").click();
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://www.google.com");
  // get title assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
