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
  //   await page.pause();
  page.on("dialog", (dialog) => dialog.accept());
  //   page.on("dialog", (dialog) => dialog.dismiss());
  await page.locator("#confirmbtn").click();
  // Mouse hover in plywright
  await page.locator("#mousehover").hover();

  // FRAMES

  const framesPage = page.frameLocator("#courses-iframe");
  await framesPage.locator(" li a[href*='lifetime-access']:visible").click();

  const textCheck = await framesPage.locator(".text h2").textContent();
  console.log(textCheck.split(" ")[1]);
});
