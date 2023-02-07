const { test, expect, request } = require("@playwright/test");
const loginPayload = {
  userEmail: "valerianoalexander@gmail.com",
  userPassword: "Petit_22$",
};
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  // response code 200,201,2.02
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log(token);
});

test.beforeEach(() => {});

// test1, test2, test3

test.only("Client App login", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  const email = "valerianoalexander@gmail.com";
  const productName = "zara coat 3";
  await page.goto("https://rahulshettyacademy.com/client/");
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
  // await page.pause();
  // const orderIdDetails = await page.locator(".col-text").textContent();
  // expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
