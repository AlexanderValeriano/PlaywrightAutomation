const { test, expect } = require("@playwright/test");
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("valerianoalexander@gmail.com");
  await page.locator("#userPassword").type("Petit_22$");
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("Client App login", async () => {
  const email = "";
  const productName = "zara coat 3";
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
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
  await expect(page.locator(".user__name [style*='color']")).toHaveText(
    "valerianoalexander@gmail.com"
  );
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

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test("@API Test case 2", async () => {
  const email = "";
  const productName = "zara coat 3";
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
