const config = {
  require: [
    'ts-node/register',
    './features/support/hooks.ts',
    './features/support/world.ts',
    './features/step-definitions/**/*.ts'
  ],
  requireModule: ['ts-node/register'],
  format: [
    'progress-bar',
    'json:test-results/cucumber-report.json',
    'html:test-results/cucumber-report.html',
    '@cucumber/pretty-formatter'
  ],
  formatOptions: {
    snippetInterface: 'async-await'
  },
  publishQuiet: true,
  dryRun: false,
  failFast: false,
  strict: true,
  snippets: true,
  worldParameters: {
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO) || 0,
    timeout: parseInt(process.env.TIMEOUT) || 30000
  }
};

module.exports = {
  default: config
}; 