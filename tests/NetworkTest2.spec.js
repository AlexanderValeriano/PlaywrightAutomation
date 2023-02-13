const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");
const loginPayload = {
  userEmail: "perou.hexagone@gmail.com",
  userPassword: "Petit_22$",
};
const orderPayLoad = {
  orders: [{ country: "Cuba", productOrderedId: "6262e95ae26b7e1a10e89bf0" }],
};
const fakePayLoadOrders = { data: [], message: "No Orders" };
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
  await page.locator("button[routerlink*='myorders']").click();
  await page.route("https://www.rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63ea493f568c3e9fb114c206",
    route=> route.continue({url: 'https://www.rahulshettyacademy.com/api/ecom/order/get-orders-details?id=63ea33bf568c3e9fb114ab37'})
  );
  await page.locator("button:has-text('View')").first().click();
  await page.pause();
});
