import { test, expect } from '@playwright/test';

test.describe('Example Test Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Setup that runs before each test
    await page.goto('https://playwright.dev/');
  });

  test('should have correct title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('should navigate to getting started', async ({ page }) => {
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
  });

  test('should display installation section', async ({ page }) => {
    await page.getByRole('link', { name: 'Get started' }).click();
    
    // Check for installation section
    const installationSection = page.getByText('Installation');
    await expect(installationSection).toBeVisible();
  });
});

test.describe('API Testing Example', () => {
  test('should make API request', async ({ request }) => {
    const response = await request.get('https://api.github.com/repos/microsoft/playwright');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.name).toBe('playwright');
  });
}); 