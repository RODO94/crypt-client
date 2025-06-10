import { test, expect } from "@playwright/test";

test.describe("an example test", () => {
  test("a user ", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("h1");
    const header = await page.getByText(
      "The Crypt is a Warhammer gaming club in the East Neuk of Fife"
    );
    expect(header).toBeVisible();
  });
});
