import { Page, Locator, expect } from '@playwright/test';

export class TestHelpers {
  /**
   * Wait for element to be visible with custom timeout
   */
  static async waitForElement(
    locator: Locator, 
    timeout = 10000,
    errorMessage?: string
  ): Promise<void> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
    } catch (error) {
      throw new Error(errorMessage || `Element not visible within ${timeout}ms: ${locator}`);
    }
  }

  /**
   * Scroll element into view and click
   */
  static async scrollAndClick(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
    await locator.click();
  }

  /**
   * Fill input with delay between characters (useful for reactive inputs)
   */
  static async typeWithDelay(
    locator: Locator, 
    text: string, 
    delay = 100
  ): Promise<void> {
    await locator.clear();
    for (const char of text) {
      await locator.type(char, { delay });
    }
  }

  /**
   * Wait for network to be idle
   */
  static async waitForNetworkIdle(page: Page, timeout = 5000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeTimestampedScreenshot(
    page: Page, 
    name: string,
    fullPage = true
  ): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({
      path: `test-results/screenshots/${name}-${timestamp}.png`,
      fullPage
    });
  }

  /**
   * Generate random string
   */
  static generateRandomString(length = 8): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static generateRandomEmail(): string {
    const username = this.generateRandomString(8);
    const domain = this.generateRandomString(6);
    return `${username}@${domain}.com`;
  }

  /**
   * Wait for condition with timeout
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout = 10000,
    interval = 500
  ): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    
    throw new Error(`Condition not met within ${timeout}ms`);
  }

  /**
   * Retry action with exponential backoff
   */
  static async retryWithBackoff<T>(
    action: () => Promise<T>,
    maxAttempts = 3,
    baseDelay = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await action();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt === maxAttempts) {
          throw lastError;
        }
        
        const delay = baseDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw lastError!;
  }

  /**
   * Check if element exists without throwing error
   */
  static async elementExists(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'attached', timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get element count
   */
  static async getElementCount(locator: Locator): Promise<number> {
    return await locator.count();
  }

  /**
   * Select random option from dropdown
   */
  static async selectRandomOption(selectLocator: Locator): Promise<string> {
    const options = await selectLocator.locator('option').all();
    if (options.length === 0) {
      throw new Error('No options found in select element');
    }
    
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    const value = await selectedOption.getAttribute('value') || '';
    
    await selectLocator.selectOption(value);
    return value;
  }

  /**
   * Verify text contains expected value (case insensitive)
   */
  static async verifyTextContains(
    locator: Locator, 
    expectedText: string,
    caseSensitive = false
  ): Promise<void> {
    const actualText = await locator.textContent() || '';
    const actual = caseSensitive ? actualText : actualText.toLowerCase();
    const expected = caseSensitive ? expectedText : expectedText.toLowerCase();
    
    expect(actual).toContain(expected);
  }
} 