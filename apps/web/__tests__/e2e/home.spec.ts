import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the main heading', async ({ page }) => {
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check if the main heading is visible
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Hello World');
  });

  test('should display the description', async ({ page }) => {
    await page.goto('/');

    await page.waitForLoadState('networkidle');

    const description = page.locator('p');
    await expect(description).toBeVisible();
    await expect(description).toContainText('Reasoning Graph');
  });
});
