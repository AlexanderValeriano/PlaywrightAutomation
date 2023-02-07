const { test, expect } = require("@playwright/test");

test("Popup validations", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://www.google.com");
  //   await page.goBack();
  //   await page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
});