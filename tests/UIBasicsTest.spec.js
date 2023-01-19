const { test, expect } = require("@playwright/test");
const { use } = require("../playwright.config");

test("Browser Context Playwright Test", async ({ browser }) => {
  //chrome - plugins / cookies;

  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //css, xpath
  await userName.type("rahulshetty");
  await page.locator("#password").type("learning");
  await signIn.click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  //type - fill
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await Promise.all(
    [
        page.waitForNavigation(), 
        signIn.click()
    ]
    );

  //   console.log(await cardTitles.first().textContent());
  //   console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://www.google.com");
  // get title assertion
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
