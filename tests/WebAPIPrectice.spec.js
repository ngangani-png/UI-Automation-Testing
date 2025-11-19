const { test, expect, request } = require("@playwright/test");

const { Apiwebutils } = require("./utils/Apiwebutils");
let orderId;
const logindata = {
  userEmail: "neelgangani@yopmail.com",
  userPassword: "Test@123",
};
const oderPayload = {
  orders: [
    {
      country: "India",
      productOrderedId: "68a961459320a140fe1ca57a",
    },
  ],
};

test.beforeAll("login API", async () => {
  const context = await request.newContext();
  const logintoken = new Apiwebutils(context, logindata);
  orderId = await logintoken.creatorder(oderPayload);
});

test("@Webst Client App login", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, orderId.token);

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.orderIndex.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.orderIndex.includes(orderIdDetails)).toBeTruthy();
});
