import { test, expect } from "./fixtures";
import { recentStreamUpdates, myWorkChanges, updates, organizationData } from "../src/lib/demo-data";

test("change artifacts appear on the right and remain available in details", async ({ page }) => {
  await page.goto("/live-feed");
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  for (const service of ["github", "drive", "instagram"]) {
    await expect(page.locator(`.feed-panel .artifact-link.${service}`).first()).toBeVisible();
    const logo = page.locator(`.feed-panel .artifact-link.${service} img`).first();
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toHaveAttribute("src", `/service-logos/${service}.svg`);
    await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
  }
  const row = page.locator(".feed-panel .change-row").filter({ has: page.locator(".artifact-link.instagram") }).first();
  const link = row.locator(".artifact-link.instagram");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  await expect(link).toHaveAttribute("href", /^https:\/\/example.com\/artifacts\/instagram\//);
  const titleBox = await row.locator(".change-title").boundingBox();
  const linkBox = await link.boundingBox();
  expect(linkBox!.x).toBeGreaterThan(titleBox!.x + titleBox!.width);
  await row.locator(".change-title").click();
  await expect(page.getByRole("dialog").locator(".artifact-link.instagram")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 360, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/artifact-links-mobile.png" });
  await page.goto("/my-work");
  await expect(page.locator(".my-stream .artifact-link.drive").first()).toBeVisible();
});

test("my work includes the latest change and my last contribution only when different", () => {
  const mine = { ...updates[0], id: "mine", author: "min", createdAt: "2026-10-10T10:00:00Z" };
  const other = { ...mine, id: "other", author: "hana", createdAt: "2026-10-14T10:00:00Z" };
  expect(myWorkChanges([mine, other], mine.streamId, "min")).toEqual({ latest: other, mine });
  expect(myWorkChanges([other, mine], mine.streamId, "hana")).toEqual({ latest: other, mine: undefined });
  expect(myWorkChanges([other], mine.streamId, "min")).toEqual({ latest: other, mine: undefined });
  expect(myWorkChanges([other], "missing", "min")).toEqual({ latest: undefined, mine: undefined });
});

test("My Work shows latest team context alongside my last change", async ({ page }) => {
  await page.goto("/my-work");
  const shared = page.locator(".my-stream").filter({ hasText: "Voice experiments & evaluation" });
  await expect(shared.locator(".change-row")).toHaveCount(2);
  await expect(shared.locator(".my-last-change")).toContainText("Evaluation inputs frozen");
  const onboarding = page.locator(".my-stream").filter({ hasText: "Luma & Rin voice quality" });
  await expect(onboarding.locator(".change-row")).toHaveCount(1);
  await expect(onboarding.locator(".my-last-change")).toHaveCount(0);
  await shared.locator(".my-last-change .change-title").click();
  await expect(page.getByRole("dialog")).toContainText("Evaluation inputs frozen");
  await page.keyboard.press("Escape");
  await page.setViewportSize({ width: 360, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: "test-results/my-work-changes-mobile.png", fullPage: true });
});

test("workstream timelines select the newest two without mixing streams", () => {
  const items = Array.from({ length: 7 }, (_, index) => ({
    ...updates[0],
    id: `event-${index}`,
    createdAt: `2026-10-${String(index + 1).padStart(2, "0")}T09:00:00+09:00`,
  }));
  const unrelated = updates.find((item) => item.streamId !== updates[0].streamId)!;
  const input = [unrelated, ...items];
  expect(recentStreamUpdates(input, updates[0].streamId).map((item) => item.id))
    .toEqual(["event-6", "event-5"]);
  expect(input[0]).toBe(unrelated);
  expect(recentStreamUpdates(input, "missing")).toEqual([]);
  expect(recentStreamUpdates(input, unrelated.streamId)).toEqual([unrelated]);
});

test("shared navigation, detail, browser back, and locale stay connected", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveURL(/mission-control/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const nav = page.getByRole("navigation");
  for (const title of [
    "Mission Control",
    "My Work",
    "Live Feed",
    "Workstreams",
    "Team Focus",
  ]) {
    await nav.getByRole("link", { name: title, exact: true }).click();
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    await expect(nav.getByRole("link")).toHaveCount(5);
    await expect(page.locator("main")).not.toContainText(/[가-힣]/);
  }
  await page
    .getByRole("link", { name: "Luma & Rin voice quality", exact: true })
    .click();
  await expect(page).toHaveURL(/workstreams\/voice-quality/);
  await expect(
    page.getByRole("heading", { name: "Current State", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Discussion", exact: true }),
  ).toBeVisible();
  await page.goBack();
  await expect(
    page.getByRole("heading", { name: "Team Focus", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Display language", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "ko");
  await expect(
    page.getByText("MAKE AI VOICE TO FALL FOR"),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("sample playback continues past one minute on every page and can pause", async ({ page }) => {
  await page.clock.install();
  for (const route of ["/live-feed", "/mission-control", "/my-work", "/workstreams", "/team-focus", "/workstreams/voice-quality"]) {
    await page.goto(route);
    for (let i = 1; i <= 9; i++) {
      await page.clock.runFor(8000);
      await expect(page.locator(".demo-event .demo-arrival")).toBeVisible();
    }
    const label = await page.locator(".demo-event").textContent();
    await page.getByRole("button", { name: "Pause", exact: true }).click();
    await page.clock.runFor(16000);
    await expect(page.locator(".demo-event")).toHaveText(label!);
    expect(await page.locator(".demo-arrival").count()).toBeGreaterThan(0);
  }
  await page.goto("/live-feed");
  for (let i = 0; i < 20; i++) await page.clock.runFor(8000);
  await expect(page.locator(".feed-panel .change-row")).toHaveCount(organizationData("corridor").updates.length + 12);
  await page.goto("/mission-control");
  await expect(page.locator(".demo-event .demo-arrival")).toHaveCount(0);
  await page.clock.runFor(8000);
  await expect(page.locator(".demo-event")).toContainText("Luma & Rin voice quality");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".demo-event a")).toHaveCSS("animation-name", "none");
  await page.setViewportSize({ width: 360, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("workstream filters combine and reset", async ({ page }) => {
  await page.goto("/workstreams");
  await expect(page.locator(".workstream-card")).toHaveCount(13);
  await page.getByLabel("PIC", { exact: true }).selectOption("min");
  await expect(page.locator(".workstream-card")).toHaveCount(2);
  await page.getByLabel("Status", { exact: true }).selectOption("paused");
  await expect(page.getByText("No workstreams to show.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await page.getByLabel("Members", { exact: true }).selectOption("hana");
  await expect(page.locator(".workstream-card")).toHaveCount(6);
  await page.getByLabel("Team goal", { exact: true }).selectOption("g4");
  await expect(page.locator(".workstream-card")).toHaveCount(2);
});

test("search finds workspace notes and closes with Escape", async ({
  page,
}) => {
  await page.goto("/mission-control");
  await page.keyboard.press("Control+k");
  await page.getByRole("textbox", { name: "Global Search" }).fill("interview");
  await expect(
    page.getByRole("dialog").getByRole("link", { name: /Voice listening interview notes/ }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.getByLabel("Switch organization", { exact: true }).locator("option")).toHaveText(["Kitsch Labs"]);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Workstreams", exact: true })
    .click();
  await expect(page.locator(".workstream-card")).toHaveCount(13);
  await page.keyboard.press("Control+k");
  await page.getByRole("textbox", { name: "Global Search" }).fill("nonexistent-workstream");
  await expect(page.getByText("No matching results.")).toBeVisible();
});

test("attention opens source detail and private space shows no fabricated captures", async ({
  page,
}) => {
  await page.goto("/mission-control");
  await page.locator(".attention-card").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog").getByText("Reported context", { exact: true })).toBeVisible();
  await expect(page.getByRole("dialog").getByText("For the team to discuss", { exact: true })).toBeVisible();
  await expect(page.getByRole("dialog").getByRole("link")).toHaveCount(2);
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Luma & Rin voice quality", exact: true })
    .click();
  await expect(page).toHaveURL(/voice-quality#discussion/);
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "My Work", exact: true })
    .click();
  await expect(page.locator(".stream-row")).toHaveCount(5);
  await expect(page.getByText("No agent connected")).toBeVisible();
  await page
    .getByRole("button", { name: "Write a note", exact: true })
    .first()
    .click();
  await expect(
    page.getByText(
      "Layout preview. Your input is not saved or shared.",
    ),
  ).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("textbox", { name: "Markdown" })
    .fill("# Draft preview");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("360px navigation and every layout fit the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/mission-control");
  for (const title of [
    "My Work",
    "Workstreams",
    "Team Focus",
    "Mission Control",
  ]) {
    await page.getByRole("button", { name: "Open menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: title, exact: true })
      .click();
    await expect(
      page.getByRole("heading", { name: title, exact: true }),
    ).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.screenshot({
    path: "test-results/mission-control-mobile.png",
    fullPage: true,
  });
});

test("goal cards scope streams and attention across synthetic goals", async ({ page }) => {
  await page.goto("/mission-control");
  const data = organizationData("corridor");
  const goals = page.locator(".mission-goal");
  await expect(goals).toHaveCount(5);
  await expect(page.locator(".stream-timeline")).toHaveCount(13);
  await expect(goals.locator(".avatar")).toHaveCount(0);
  for (const [index, goal] of data.goals.entries()) {
    await goals.nth(index).click();
    await expect(goals.nth(index)).toHaveAttribute("aria-pressed", "true");
    const related = data.streams.filter((stream) => stream.goalId === goal.id);
    await expect(page.locator(".stream-timeline")).toHaveCount(related.length);
    await expect(page.locator(".change-row")).toHaveCount(related.length * 2);
    const signals = data.attention.filter((item) => item.streamIds.some((id) => related.some((stream) => stream.id === id)));
    await expect(page.locator(".attention-card")).toHaveCount(signals.length);
  }
  await goals.last().click();
  await expect(page.locator(".stream-timeline")).toHaveCount(13);
});

test("desktop layout screenshot", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1040 });
  await page.goto("/mission-control");
  await expect(
    page.getByRole("heading", { name: "Workstreams" }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/mission-control-desktop.png",
    fullPage: true,
  });
});

test("PIC columns scroll horizontally without overflowing the page", async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.goto("/mission-control");
  const board = page.getByRole("region", { name: "Workstreams by PIC" });
  await expect(board.locator(".pic-row")).toHaveCount(5);
  await expect(board.getByRole("region", { name: "PIC: Min", exact: true }).locator(".stream-timeline").first()).toContainText("Luma & Rin voice quality");
  const row = board.getByRole("region", { name: "Min Workstreams", exact: true });
  await board.getByRole("region", { name: "PIC: Min", exact: true }).getByRole("button", { name: "Scroll right", exact: true }).click();
  await expect.poll(() => row.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  await page.locator(".mission-goal").first().click();
  await expect(board.locator(".pic-row")).toHaveCount(2);
  await expect.poll(() => row.evaluate((el) => el.scrollLeft)).toBe(0);
  await page.setViewportSize({ width: 360, height: 800 });
  await row.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => row.evaluate((el) => el.scrollLeft)).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
