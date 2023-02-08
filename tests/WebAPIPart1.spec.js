// Declare variables
const { test, expect, request } = require("@playwright/test");
const loginPayload = {
  userEmail: "valerianoalexander@gmail.com",
  userPassword: "Petit_22$",
};
const orderPayLoad = {orders: [{country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0"}]}
let token;
let orderId;
// ------------//// ------------//// ------------//// ------------//// ------------//// ------------//

test.beforeAll(async () => {
  // Login API
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
  //
  const orderResponse = await apiContext.post("https://www.rahulshettyacademy.com/api/ecom/order/create-order",
  {
    data:orderPayLoad,
    headers:{'Authorization':token,
    'Content-Type': 'application/json'}
  })
  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];
});

test.beforeEach(() => {});

// test1, test2, test3

test("Client App login", async ({ page }) => {
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

  for (let i = 0; i < rows.count(); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  await page.pause();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});


// Verify if order created is showing in history page
// Precondition - create order 