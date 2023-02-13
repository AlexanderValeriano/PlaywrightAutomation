// Comment from GITHUB for a pull request
const { test, expect } = require("@playwright/test");
const { use } = require("../playwright.config");

test.only("Browser Context Playwright Test", async ({ browser }) => {
  //chrome - plugins / cookies;

  const context = await browser.newContext();
  const page = await context.newPage();
  //REGEX
  //page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
  //page.route("**/*.css", (route) => route.abort());

  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status())
  );

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  //css, xpath
  await userName.type("rahulshetty");
  await page.locator("#password").type("learning");
  await signIn.click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  //type - fill
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await Promise.all([page.waitForNavigation(), signIn.click()]);

  //   console.log(await cardTitles.first().textContent());
  //   console.log(await cardTitles.nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});

// test("Page Playwright Test", async ({ page }) => {
//   await page.goto("https://www.google.com");
//   // get title assertion
//   console.log(await page.title());
//   await expect(page).toHaveTitle("Google");
// });

test("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  // // await page.pause();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("Child windows handling", async ({ browser }) => {
  const context = await browser.newContext();

  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  // It returs in form of array mayve not just one page but 2 or more pages will be return
  //Playwright inspector and how debug playwright script
  //npx playwright test tests/UIBasicsTest.spec.js --debug
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  let text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("#username").type(domain);
  await page.pause();
  console.log(await page.locator("#username").textContent());
});
// RECORDING
// npx playwright codegen http://google.com
test("test", async ({ page }) => {
  await page.goto("https://www.google.com/?gws_rd=ssl");
  await page.getByRole("button", { name: "Tout accepter" }).click();
  await page.getByRole("combobox", { name: "Rech." }).click();
  await page.getByRole("combobox", { name: "Rech." }).fill("rahul shetty");
  await page.getByRole("combobox", { name: "Rech." }).press("Enter");
  await page
    .getByRole("link", {
      name: "Rahul Shetty Academy: Selenium, API Testing, Software ... https://rahulshettyacademy.com",
    })
    .click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Courses" })
    .click();
});

test("Client App login", async ({ page }) => {
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

  for (let i = 0; i < (await rows.count()); i++) {
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
