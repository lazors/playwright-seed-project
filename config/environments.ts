export interface EnvironmentConfig {
  name: string;
  baseUrl: string;
  apiUrl?: string;
  timeout: number;
  retries: number;
  workers: number;
  headless: boolean;
  slowMo: number;
  video: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
  screenshot: 'off' | 'only-on-failure' | 'on';
  trace: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry';
}

const environments: Record<string, EnvironmentConfig> = {
  development: {
    name: 'development',
    baseUrl: 'http://localhost:3000',
    apiUrl: 'http://localhost:3001/api',
    timeout: 30000,
    retries: 0,
    workers: 1,
    headless: false,
    slowMo: 500,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  staging: {
    name: 'staging',
    baseUrl: 'https://staging.example.com',
    apiUrl: 'https://api-staging.example.com',
    timeout: 30000,
    retries: 1,
    workers: 2,
    headless: true,
    slowMo: 100,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  production: {
    name: 'production',
    baseUrl: 'https://playwright.dev',
    apiUrl: 'https://api.github.com',
    timeout: 30000,
    retries: 2,
    workers: 4,
    headless: true,
    slowMo: 0,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  ci: {
    name: 'ci',
    baseUrl: 'https://playwright.dev',
    apiUrl: 'https://api.github.com',
    timeout: 60000,
    retries: 3,
    workers: 2,
    headless: true,
    slowMo: 0,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  }
};

export function getEnvironmentConfig(envName?: string): EnvironmentConfig {
  const environment = envName || process.env.TEST_ENV || 'production';
  
  if (!environments[environment]) {
    throw new Error(`Environment configuration not found for: ${environment}. Available environments: ${Object.keys(environments).join(', ')}`);
  }
  
  return environments[environment];
}

export function getAllEnvironments(): string[] {
  return Object.keys(environments);
}

export function isValidEnvironment(envName: string): boolean {
  return Object.prototype.hasOwnProperty.call(environments, envName);
}