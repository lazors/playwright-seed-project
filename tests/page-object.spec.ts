import { test, expect } from '@playwright/test';
import { HomePage } from './pages/HomePage';

test.describe('Page Object Model Example', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.waitForLoad();
  });

  test('should verify home page elements', async () => {
    await homePage.verifyPageElements();
    
    const title = await homePage.getTitle();
    expect(title).toContain('Playwright');
  });

  test('should navigate using page object methods', async ({ page }) => {
    await homePage.clickGetStarted();
    
    // Verify navigation
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain('intro');
  });

  test('should search documentation', async ({ page }) => {
    await homePage.searchDocs('API testing');
    
    // Wait for search results
    await page.waitForTimeout(2000);
    
    // Verify search was performed (URL should change or results should appear)
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toContain('search') || expect(currentUrl).toContain('api');
  });

  test('should take screenshot on test completion', async () => {
    await homePage.takeScreenshot('home-page-test-complete');
  });
}); 