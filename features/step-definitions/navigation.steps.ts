import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../support/world';

Given('I am on the Playwright homepage', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  await this.page.goto('https://playwright.dev/');
  await this.page.waitForLoadState('networkidle');
  
  // Verify we're on the correct page
  const title = await this.page.title();
  expect(title).toContain('Playwright');
});

Given('I am using a mobile device', async function (this: ICustomWorld) {
  if (!this.context) {
    await this.createContext();
  }
  
  // Create a new page with mobile viewport
  this.page = await this.context.newPage();
  await this.page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
});

When('I click on the {string} link', async function (this: ICustomWorld, linkText: string) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  const link = this.page.getByRole('link', { name: new RegExp(linkText, 'i') });
  await link.click();
  await this.page.waitForLoadState('networkidle');
});

When('I search for {string}', async function (this: ICustomWorld, searchTerm: string) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  const searchInput = this.page.getByPlaceholder('Search docs');
  await searchInput.fill(searchTerm);
  await this.page.keyboard.press('Enter');
  await this.page.waitForTimeout(2000); // Wait for search results
});

When('I navigate to the homepage', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  await this.page.goto('https://playwright.dev/');
  await this.page.waitForLoadState('networkidle');
});

Then('I should be on the getting started page', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  const url = this.page.url();
  expect(url).toContain('intro');
});

Then('I should be on the {string} page', async function (this: ICustomWorld, expectedPage: string) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  const url = this.page.url();
  expect(url).toContain(expectedPage);
});

Then('the page should contain installation instructions', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  const installationText = this.page.getByText('Installation');
  await expect(installationText).toBeVisible();
});

Then('the page title should contain {string}', async function (this: ICustomWorld, titleText: string) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  const title = await this.page.title();
  expect(title).toContain(titleText);
});

Then('I should see search results', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  // Wait for search results to load
  await this.page.waitForTimeout(2000);
  
  // Check if URL changed to indicate search was performed
  const url = this.page.url();
  const hasSearchResults = url.includes('search') || url.includes('?q=');
  expect(hasSearchResults).toBeTruthy();
});

Then('the results should contain relevant API information', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  // Look for API-related content in the page
  const pageContent = await this.page.content();
  const hasApiContent = pageContent.toLowerCase().includes('api') || 
                       pageContent.toLowerCase().includes('testing');
  expect(hasApiContent).toBeTruthy();
});

Then('the mobile menu should be accessible', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  // Look for mobile menu button or navigation
  const mobileNav = this.page.locator('[aria-label*="menu"], [data-testid*="menu"], .mobile-menu, button[aria-expanded]');
  await expect(mobileNav.first()).toBeVisible();
});

Then('all navigation elements should be visible', async function (this: ICustomWorld) {
  if (!this.page) {
    throw new Error('Page not initialized');
  }
  
  // Check that main navigation is accessible (either visible or in mobile menu)
  const navigation = this.page.locator('nav, [role="navigation"]');
  await expect(navigation.first()).toBeVisible();
}); 