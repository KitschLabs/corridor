import { test as base, expect } from "@playwright/test";
import { pageSteps, tourKey } from "../src/components/workspace/onboarding-steps";

export const test = base.extend({
  page: async ({ page }, run) => {
    await page.addInitScript(({ routes, key }) => {
      for (const route of routes) localStorage.setItem(key + route, "seen");
    }, { routes: ["navigation", ...Object.keys(pageSteps)], key: tourKey });
    await run(page);
  },
});
export { expect };
