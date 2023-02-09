// Declare variables
const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/ApiUtils");
const loginPayload = {
  userEmail: "valerianoalexander@gmail.com",
  userPassword: "Petit_22$",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};
let token;
let orderId;
// ------------//// ------------//// ------------//// ------------//// ------------//// ------------//

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  apiUtils.createOrder(orderPayLoad);
  // const loginResponse = await apiContext.post(
  //   "https://rahulshettyacademy.com/api/ecom/auth/login",
  //   {
  //     data: loginPayload,
  //   }
  // );
  // response code 200,201,2.02
  // expect(loginResponse.ok()).toBeTruthy();
  // const loginResponseJson = await loginResponse.json();
  // token = loginResponseJson.token;
});

// create order in success
test("Place the order", async ({ page }) => {
  const apiUtils = new APIUtils(apiContext, loginPayload);
  const orderId = createOrder(orderPayLoad);
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  await page.goto("https://rahulshettyacademy.com/client/");
  // const products = page.locator(".card-body");
  // const titles = await page.locator(".card-body b").allTextContents();
  // console.log(titles);
  // const count = await products.count();
  // for (let index = 0; index < count; index++) {
  //   if (
  //     (await products.nth(index).locator("b").textContent()) === productName
  //   ) {
  //     // add to cart
  //     await products.nth(index).locator("text= Add To Cart").click();
  //     break;
  //   }
  // }

  console.log(orderId);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();

    if (orderId.includes(rowOrderId)) {
      await page.pause();
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  await page.pause();
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

// Verify if order created is showing in history page
// Precondition - create order
