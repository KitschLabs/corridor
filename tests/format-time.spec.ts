import { test, expect } from "./fixtures";
import { formatTime } from "../src/lib/format-time";

test("timestamps use calendar days and localized relative times", () => {
  const now = new Date(2026, 9, 14, 15, 0);
  const at = (day: number, hour: number, minute: number) => new Date(2026, 9, day, hour, minute).toISOString();
  expect(formatTime(at(14, 15, 0), "ko", now)).toBe("방금");
  expect(formatTime(at(14, 14, 59), "ko", now)).toBe("1분 전");
  expect(formatTime(at(14, 14, 1), "ko", now)).toBe("59분 전");
  expect(formatTime(at(14, 14, 0), "ko", now)).toBe("1시간 전");
  expect(formatTime(at(13, 13, 51), "ko", now)).toBe("어제 13:51");
  expect(formatTime(at(12, 13, 51), "ko", now)).toBe("2026.10.12 13:51");
  expect(formatTime(at(14, 16, 0), "ko", now)).toBe("2026.10.14 16:00");
  expect(formatTime(at(14, 14, 30), "en", now)).toBe("30m ago");
  expect(formatTime(at(14, 13, 0), "en", now)).toBe("2h ago");
  expect(formatTime(at(13, 13, 51), "en", now)).toBe("Yesterday 13:51");
  expect(formatTime(at(13, 23, 59), "ko", new Date(2026, 9, 14, 0, 1))).toBe("어제 23:59");
  expect(formatTime(new Date(2025, 11, 31, 23, 59).toISOString(), "ko", new Date(2026, 0, 1, 0, 1))).toBe("어제 23:59");
  expect(formatTime("invalid", "ko", now)).toBe("—");
});

test("visible timestamps refresh as time passes", async ({ page }) => {
  await page.clock.install({ time: new Date("2026-10-14T09:30:00+09:00") });
  await page.goto("/my-work");
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await page.clock.runFor(1);
  const stamp = page.locator('time[datetime="2026-10-14T09:00:00+09:00"]').first();
  await expect(stamp).toHaveText("30m ago");
  await page.clock.fastForward(60_000);
  await expect(stamp).toHaveText("31m ago");
});
