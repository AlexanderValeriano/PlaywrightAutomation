const { test, expect } = require("@playwright/test");

test.skip("Client App login", async ({ page }) => {
  //js file - Login.js, DashboardPAge
  const email = "valerianoalexander@gmail.com";
  const productName = "zara coat 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill(email);
  await page.locator("#userPassword").type("Petit_22$");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
  const count = await products.count();
  for (let index = 0; index < count; index++) {
    if (
      (await products.nth(index).locator("b").textContent()) === productName
    ) {
      // add to cart
      await products.nth(index).locator("text= Add To Cart").click();
      break;
    }
  }
  // await page.pause();
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor(); // method for wait 30 seconds for this element
  const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.locator("[placeholder*='Country']").type("ind", { delay: 100 });
  const dropdown = page.locator(".ta-results");
  await dropdown.waitFor();
  let optionsCount = await dropdown.locator("button").count();
  for (let i = 0; i < optionsCount; ++i) {
    let text = await dropdown.locator("button").nth(i).textContent();

    // text.trim() or text.includes("India") two solutions to match the result search
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  // Use assertion
  await expect(page.locator(".user__name [style*='color']")).toHaveText(email);
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. "
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  // await page.pause();
});

// test("Browser Context-Validation Error Login", async ({ page }) => {
//   const userName = page.locator("#userEmail");
//   const signIn = page.locator("#login");
//   const titles = page.locator(".card-body b");

//   await page.goto("https://rahulshettyacademy.com/client");
//   await userName.fill("alexander.valeriano@sogeti.com");
//   await page.locator("#userPassword").type("Petit_22");
//   await signIn.click();
//   await page.waitForLoadState("networkidle");

//   const allTitles = await titles.allTextContents();
//   console.log(allTitles);
// });
