import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private readonly getStartedLink: Locator;
  private readonly docsLink: Locator;
  private readonly searchInput: Locator;
  private readonly mainHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.url = 'https://playwright.dev/';
    
    // Locators
    this.getStartedLink = page.getByRole('link', { name: 'Get started' });
    this.docsLink = page.getByRole('link', { name: 'Docs' });
    this.searchInput = page.getByPlaceholder('Search docs');
    this.mainHeading = page.getByRole('heading', { level: 1 });
  }

  async clickGetStarted(): Promise<void> {
    await this.clickElement(this.getStartedLink);
  }

  async clickDocs(): Promise<void> {
    await this.clickElement(this.docsLink);
  }

  async searchDocs(searchTerm: string): Promise<void> {
    await this.fillInput(this.searchInput, searchTerm);
    await this.page.keyboard.press('Enter');
  }

  async getMainHeadingText(): Promise<string> {
    return await this.getText(this.mainHeading);
  }

  async verifyPageElements(): Promise<void> {
    await this.expectElementToBeVisible(this.getStartedLink);
    await this.expectElementToBeVisible(this.docsLink);
    await this.expectElementToBeVisible(this.mainHeading);
  }
} 