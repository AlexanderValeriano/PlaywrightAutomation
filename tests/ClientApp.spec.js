const { test, expect } = require("@playwright/test");

test("Browser Context-Validation Error Login", async ({ page }) => {
  const userName = page.locator("#userEmail");
  const signIn = page.locator("#login");
  const titles = page.locator(".card-body b");

  await page.goto("https://rahulshettyacademy.com/client");
  await userName.fill("alexander.valeriano@sogeti.com");
  await page.locator("#userPassword").type("Petit_22");
  await signIn.click();
  await page.waitForLoadState("networkidle");

  const allTitles = await titles.allTextContents();
  console.log(allTitles);
});
