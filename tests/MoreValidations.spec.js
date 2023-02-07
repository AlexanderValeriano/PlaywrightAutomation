const { test, expect } = require("@playwright/test");

test("Popup validations", async ({ page }) => {
  await page.goto("https://www.rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("https://www.google.com");
  //   await page.goBack();
  //   await page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  // PopUP or Dialog
  await page.pause();
  page.on("dialog", (dialog) => dialog.accept());
  //   page.on("dialog", (dialog) => dialog.dismiss());
  await page.locator("#confirmbtn").click();
  // Mouse hover in plywright
  await page.locator("#mousehover").hover();
});
