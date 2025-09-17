# Playwright Seed Project

A comprehensive Playwright test automation seed project with TypeScript, ESLint 9+, Prettier, and Cucumber BDD support.

## 🚀 Features

- **Playwright** - Modern browser automation
- **TypeScript** - Type-safe testing
- **ESLint 9+** - Latest linting with flat config and comma-never rule
- **Prettier** - Code formatting
- **Cucumber BDD** - Behavior-driven development with Gherkin
- **Page Object Model** - Scalable test architecture
- **pnpm** - Fast, disk space efficient package manager

## 📦 Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Install Playwright browsers:**
   ```bash
   pnpm run install:browsers
   ```

## 🧪 Running Tests

### Playwright Tests
```bash
# Run all tests
pnpm test

# Run tests in headed mode
pnpm run test:headed

# Run tests with UI mode
pnpm run test:ui

# Debug tests
pnpm run test:debug

# Generate test report
pnpm run test:report
```

### Cucumber BDD Tests
```bash
# Run Cucumber tests
pnpm run test:cucumber
```

## 🔧 Code Quality

### Linting
```bash
# Check for linting errors
pnpm run lint

# Fix linting errors
pnpm run lint:fix
```

### Formatting
```bash
# Check formatting
pnpm run format:check

# Fix formatting
pnpm run format
```

### Type Checking
```bash
# Check TypeScript types
pnpm run type-check
```

## 📁 Project Structure

```
├── tests/                    # Playwright tests
│   ├── pages/               # Page Object Model classes
│   ├── example.test.ts      # Example Playwright tests
│   └── page-object.test.ts  # POM example usage
├── features/                # Cucumber BDD tests
│   ├── example.feature      # Gherkin feature files
│   ├── step-definitions/    # Step definition files
│   └── support/            # Cucumber support files
├── utils/                   # Test utilities and helpers
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── eslint.config.js        # ESLint 9+ flat configuration
├── .prettierrc             # Prettier configuration
└── cucumber.config.js      # Cucumber configuration
```

## ⚙️ Configuration

### ESLint Rules
- **Comma-never** rule enforced
- TypeScript-specific rules
- Playwright plugin rules
- Prettier integration

### Prettier Settings
- No trailing commas
- Single quotes
- 2-space indentation
- 100 character line width

## 🎯 Usage Examples

### Basic Test
```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});
```

### Page Object Model
```typescript
import { HomePage } from './pages/HomePage';

test('using page objects', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.verifyPageElements();
});
```

### BDD Feature
```gherkin
Feature: Example Feature
  Scenario: Example Scenario
    Given I am on the homepage
    When I click a button
    Then I should see results
```

## 🛠️ Development

### Adding New Tests
1. Create test files in `tests/` directory
2. Use Page Object Model for reusable components
3. Follow TypeScript and ESLint rules

### Adding BDD Tests
1. Create `.feature` files in `features/` directory
2. Implement step definitions in `features/step-definitions/`
3. Use the custom World class for browser management

## 📊 Reporting

Test results are generated in:
- `test-results/` - Test artifacts
- `playwright-report/` - HTML reports
- Screenshots and videos on failures

## 🤝 Contributing

1. Follow the established code style
2. Run linting and formatting before commits
3. Ensure all tests pass
4. Add tests for new features

## 📄 License

ISC 