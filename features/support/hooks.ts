import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { ICustomWorld } from './world';

BeforeAll(async function () {
  console.log('🚀 Starting Cucumber test suite with Playwright');
});

AfterAll(async function () {
  console.log('✅ Cucumber test suite completed');
});

Before(async function (this: ICustomWorld, scenario) {
  this.testName = scenario.pickle.name;
  this.startTime = new Date();
  
  console.log(`📋 Starting scenario: ${this.testName}`);
  
  // Create browser, context, and page for each scenario
  await this.createPage();
});

After(async function (this: ICustomWorld, scenario) {
  const endTime = new Date();
  const duration = endTime.getTime() - (this.startTime?.getTime() || 0);
  
  // Take screenshot on failure
  if (scenario.result?.status === Status.FAILED) {
    console.log(`❌ Scenario failed: ${this.testName}`);
    await this.takeScreenshot(`failed-${this.testName?.replace(/\s+/g, '-')}`);
    
    // Attach page source on failure
    if (this.page) {
      const pageSource = await this.page.content();
      this.attach(pageSource, 'text/html');
    }
  } else {
    console.log(`✅ Scenario passed: ${this.testName} (${duration}ms)`);
  }
  
  // Clean up browser resources
  await this.closeContext();
  await this.closeBrowser();
  
  console.log(`🧹 Cleanup completed for: ${this.testName}`);
}); 