const { test, expect } = require("@playwright/test");

test("files upload testing", async ({ page }) => {
  await page.goto("https://practice.expandtesting.com/upload");
  await page.waitForSelector('//input[@id="fileInput"]');
  await page
    .locator('//input[@id="fileInput"]')
    .setInputFiles("imgtest/1763621963591_mountrushmore.jpg");
  await page.locator('//button[@id="fileSubmit"]').click();
});
