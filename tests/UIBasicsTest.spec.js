const { test, expect } = require("@playwright/test");

test.only("Browser Context Playwright Test", async ({ browser }) => {
  //chrome - plugins / cookies;
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //css, xpath
  await page.locator("#username").type("rahulshetty");
  await page.locator("#password").type("learning");
  await page.locator("#signInBtn").click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://www.google.com");
  // get title assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
