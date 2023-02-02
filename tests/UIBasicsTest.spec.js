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
  await Promise.all([page.waitForNavigation(), signIn.click()]);

  //   console.log(await cardTitles.first().textContent());
  //   console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

// test("Page Playwright Test", async ({ page }) => {
//   await page.goto("https://www.google.com");
//   // get title assertion
//   console.log(await page.title());
//   await expect(page).toHaveTitle("Google");
// });

test("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  // // await page.pause();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test.only("Child windows handling", async ({ browser }) => {
  const context = await browser.newContext();

  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  // It returs in form of array mayve not just one page but 2 or more pages will be return
  //Playwright inspector and how debug playwright script
  //npx playwright test tests/UIBasicsTest.spec.js --debug
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  let text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").type(domain);
  await page.pause();
  console.log(await page.locator("#username").textContent());
});
