import { test, expect } from "@playwright/test";
import { pageSteps, tourKey } from "../src/components/workspace/onboarding-steps";

test("first root visit tours navigation and regions, then remembers each page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/mission-control/);
  const tour = page.getByRole("dialog");
  await expect(tour.getByRole("heading")).toHaveText("My Work");
  await expect.poll(async () => (await page.locator(".tour-ring").boundingBox())?.width ?? 0).toBeGreaterThan(100);
  await page.screenshot({ path: "test-results/onboarding-desktop.png" });
  for (let index = 0; index < 8; index++) {
    await tour.getByRole("button", { name: "Next", exact: true }).click();
  }
  await expect(tour.getByRole("heading")).toHaveText("Workstreams");
  await tour.getByRole("button", { name: "Back", exact: true }).click();
  await expect(tour.getByRole("heading")).toHaveText("Attention Needed");
  await tour.getByRole("button", { name: "Next", exact: true }).click();
  await tour.getByRole("button", { name: "Get started" }).click();
  await page.reload();
  await expect(tour).toHaveCount(0);
  for (const path of Object.keys(pageSteps).filter((path) => path !== "/mission-control" && path !== "/workstreams/detail")) {
    await page.goto(path);
    await expect(tour).toBeVisible();
    await tour.getByRole("button", { name: "Next", exact: true }).click();
    await expect(tour.getByRole("heading")).toHaveText(pageSteps[path][0].title);
    await page.keyboard.press("Escape");
    await expect(tour).toHaveCount(0);
    expect(await page.evaluate((key) => localStorage.getItem(key), tourKey + path)).toBe("seen");
  }
});

test("mobile tour highlights the tab and fits the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.addInitScript((key) => localStorage.setItem(key + "navigation", "seen"), tourKey);
  await page.goto("/my-work");
  const tour = page.getByRole("dialog");
  await expect(tour.getByRole("heading")).toHaveText("My Work");
  await expect(page.locator(".sidebar")).toHaveClass(/open/);
  await expect.poll(async () => (await page.locator(".tour-ring").boundingBox())?.width ?? 0).toBeGreaterThan(100);
  await page.screenshot({ path: "test-results/onboarding-mobile-tab.png" });
  await tour.getByRole("button", { name: "Next", exact: true }).click();
  await expect(tour.getByRole("heading")).toHaveText("My Workstreams");
  await expect(page.locator(".sidebar")).not.toHaveClass(/open/);
  await expect.poll(async () => (await page.locator(".tour-ring").boundingBox())?.width ?? 0).toBeGreaterThan(280);
  await expect.poll(async () => {
    const box = await page.locator(".tour-bubble").boundingBox();
    return !!box && box.x >= 0 && box.x + box.width <= 360 && box.y >= 0 && box.y + box.height <= 800;
  }).toBe(true);
  await page.screenshot({ path: "test-results/onboarding-mobile-content.png" });
  await tour.getByRole("button", { name: "Skip" }).click();
  await expect(tour).toHaveCount(0);
});
