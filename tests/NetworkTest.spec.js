const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");
const loginPayload = {
  userEmail: "valerianoalexander@gmail.com",
  userPassword: "Petit_22$",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};
const fakePayLoadOrders = { data: [], message: "No Orders" };
let token;
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("Place the order", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client/");
  await page.route(
    "https://www.rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63dbcfa5568c3e9fb10a34e2",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = fakePayLoadOrders;
      route.fulfill({
        response,
        body,
      });
      // intercepting response - API response => {playwright fake response } =>  => render data on the front end
    }
  );
  await page.pause();
  await page.locator("button[routerlink*='myorders']").click();
  console.log(await page.locator(".mt-4").textContent());
});
