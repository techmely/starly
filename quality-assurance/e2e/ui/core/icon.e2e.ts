import { expect, test } from "@playwright/test";

test("Page has title", async ({ page }) => {
  await page.goto("/icon");
  await expect(page).toHaveTitle(/Icon/);
});

test("Check valid icon render on page with system icon and spreadsheet", async ({ page }) => {
  await page.goto("/icon");
  const systemIcon = page.getByTestId("icon-system");
  const techmelyIcon = page.getByTestId("icon-techmely");

  await expect(systemIcon).toBeVisible();
  await expect(techmelyIcon).toBeVisible();

  const svgUse = page.locator("t-icon").nth(1).locator("use");
  await expect(svgUse).toBeVisible();
  await expect(svgUse).toHaveAttribute(
    "href",
    "/assets/svg/sprite-sheets.svg#chevron-right-outline",
  );
});
