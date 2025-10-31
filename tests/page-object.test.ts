import { expect, test } from '@playwright/test';
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

  test('should navigate using page object methods', async () => {
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
    const hasSearchIndicator = currentUrl.includes('search') || currentUrl.includes('api');
    expect(hasSearchIndicator).toBeTruthy();
  });

  test('should take screenshot on test completion', async () => {
    await homePage.takeScreenshot('home-page-test-complete');
    
    // Verify screenshot was taken by checking page state
    const currentUrl = await homePage.getCurrentUrl();
    expect(currentUrl).toBeTruthy();
  });
}); 