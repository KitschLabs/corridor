import { test, expect } from "./fixtures";

test("Connect shows client instructions, copies commands, and works on mobile", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/my-work");
  await page.getByRole("link", { name: "Connect", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Connect", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Connect", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.locator("pre")).toContainText("codex plugin add corridor@");
  await page.getByRole("button", { name: "Claude Code", exact: true }).click();
  await page.getByRole("button", { name: "Copy commands" }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("claude plugin install corridor@");
  await expect(page.getByRole("status")).toHaveText("Copied");
  await page.screenshot({ path: "test-results/connect-desktop.png", fullPage: true });
  await page.getByRole("button", { name: "Display language" }).click();
  await expect(page.getByRole("heading", { name: "에이전트와 업무를 연결하세요" })).toBeVisible();
  await page.getByRole("button", { name: "표시 언어" }).click();
  await page.clock.install();
  await page.clock.fastForward(16_000);
  await expect(page.locator(".demo-playback")).toHaveCount(0);
  await page.setViewportSize({ width: 360, height: 800 });
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("link", { name: "Connect", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Connect", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/connect-mobile.png", fullPage: true });
});
