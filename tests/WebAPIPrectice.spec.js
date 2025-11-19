const { test, expect, request } = require("@playwright/test");
let orderId;
let token;
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
  const loginstatus = await context.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: logindata,
    }
  );
  expect(loginstatus.ok()).toBeTruthy();
  const resposeJson = await loginstatus.json();
  token = await resposeJson.token;
});

test("@Webst Client App login", async ({ page, request }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);

  // second test case
  const responseoder = await request.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: oderPayload,
      headers: {
        Authorization: token,
        "content-type": "application/json",
      },
    }
  );
  const resposnejson = await responseoder.json();
  orderId = resposnejson.orders[0];
  expect(orderId).toBeTruthy();

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for (let i = 0; i < (await rows.count()); ++i) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
