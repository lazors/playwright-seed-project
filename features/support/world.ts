import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

export interface ICustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  testName?: string;
  startTime?: Date;
}

export class CustomWorld extends World implements ICustomWorld {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  testName?: string;
  startTime?: Date;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async openBrowser(): Promise<void> {
    this.browser = await chromium.launch({
      headless: this.parameters.headless ?? true,
      slowMo: this.parameters.slowMo ?? 0
    });
  }

  async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }

  async createContext(): Promise<void> {
    if (!this.browser) {
      await this.openBrowser();
    }
    
    this.context = await this.browser!.createContext({
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      acceptDownloads: true
    });
  }

  async createPage(): Promise<void> {
    if (!this.context) {
      await this.createContext();
    }
    
    this.page = await this.context!.newPage();
    
    // Set default timeout
    this.page.setDefaultTimeout(this.parameters.timeout ?? 30000);
  }

  async closeContext(): Promise<void> {
    if (this.context) {
      await this.context.close();
    }
  }

  async takeScreenshot(name: string): Promise<void> {
    if (this.page) {
      const screenshot = await this.page.screenshot({
        path: `test-results/screenshots/${name}-${Date.now()}.png`,
        fullPage: true
      });
      this.attach(screenshot, 'image/png');
    }
  }

  async getCurrentUrl(): Promise<string> {
    return this.page?.url() || '';
  }

  async getPageTitle(): Promise<string> {
    return this.page?.title() || '';
  }
}

setWorldConstructor(CustomWorld); 