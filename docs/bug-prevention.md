# SmartFarm Bug Prevention Stack

## Overview

This document outlines the comprehensive bug prevention stack implemented for the SmartFarm project. The goal is to prevent runtime errors, accessibility violations, and API connection failures from reaching production.

## Architecture

- **Frontend**: Netlify (Static hosting)
- **Backend**: Railway (Node.js API)
- **CI/CD**: GitHub Actions
- **Testing**: Jest + Playwright + Lighthouse CI
- **Error Tracking**: Sentry (Optional)
- **Security**: npm audit + Dependabot

## Phase A — Code Quality & Formatting

### 1. ESLint Configuration

**File**: `web-project/.eslintrc.js`

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  plugins: [
    'jsx-a11y',
    'prettier',
  ],
  rules: {
    // Accessibility rules
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/aria-unsupported-elements': 'error',
    'jsx-a11y/click-events-have-key-events': 'error',
    'jsx-a11y/no-access-key': 'error',
    'jsx-a11y/no-autofocus': 'error',
    'jsx-a11y/tabindex-no-positive': 'error',
    
    // Code quality rules
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-template': 'error',
  },
};
```

**Key Features**:
- Accessibility rule enforcement
- Unused variable detection
- Console log warnings
- Modern JavaScript best practices

### 2. Prettier Configuration

**File**: `web-project/.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "endOfLine": "lf"
}
```

**Integration**: Works with ESLint to enforce consistent formatting

### 3. TypeScript Strict Mode

**File**: `web-project/tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true
  }
}
```

**Benefits**: Catches type errors at build time

## Phase B — Accessibility Tests

### 4. jest-axe Integration

**File**: `web-project/tests/unit/accessibility.test.js`

```javascript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should have no accessibility violations for open modal', async () => {
  const modal = testUtils.createMockModal();
  modal.classList.add('show');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('role', 'dialog');
  modal.removeAttribute('aria-hidden');

  const results = await axe(modal);
  expect(results).toHaveNoViolations();
});
```

**Key Tests**:
- Modal accessibility compliance
- ARIA attribute validation
- Focus management
- Color contrast
- Keyboard navigation

### 5. Lighthouse CI

**File**: `web-project/.lighthouserc.js`

```javascript
module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.8 }],
        
        // Accessibility specific
        'accessibility/aria-hidden-focus': 'error',
        'accessibility/color-contrast': 'error',
        'accessibility/heading-order': 'error',
      },
    },
  },
};
```

**Automated Checks**:
- Performance metrics
- Accessibility compliance
- SEO optimization
- Best practices

## Phase C — Testing

### 6. Jest Unit Tests

**File**: `web-project/tests/unit/api-service.test.js`

```javascript
describe('API Service Tests', () => {
  test('should fetch farms successfully', async () => {
    const mockFarms = [testUtils.createMockFarm()];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => testUtils.mockApiResponse(mockFarms),
    });

    const result = await window.SmartFarmAPI.getFarms();
    expect(result.success).toBe(true);
    expect(result.data).toEqual(mockFarms);
  });
});
```

**Coverage Areas**:
- API service functionality
- Modal accessibility
- Error handling
- Data validation

### 7. Playwright E2E Tests

**File**: `web-project/tests/e2e/modal-accessibility.spec.js`

```javascript
test('should open livestock modal without aria-hidden errors', async ({ page }) => {
  await page.goto('/livestock-management.html');
  await page.click('button[data-bs-target="#addLivestockModal"]');
  await page.waitForSelector('#addLivestockModal.show');
  
  const modal = page.locator('#addLivestockModal');
  await expect(modal).toBeVisible();
  
  const ariaHidden = await modal.getAttribute('aria-hidden');
  expect(ariaHidden).not.toBe('true');
});
```

**Test Scenarios**:
- Modal interactions
- Navigation flow
- API integration
- Accessibility compliance

## Phase D — Error Tracking

### 8. Sentry Integration

**File**: `web-project/public/js/error-tracking.js`

```javascript
class ErrorTracker {
  constructor() {
    this.setupGlobalErrorHandlers();
    this.setupAccessibilityMonitoring();
    this.setupApiErrorMonitoring();
  }

  setupGlobalErrorHandlers() {
    window.addEventListener('error', (event) => {
      this.captureError({
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });
  }
}
```

**Monitoring**:
- JavaScript errors
- Unhandled promise rejections
- Accessibility violations
- API errors

## Phase E — Security & Dependencies

### 9. npm Audit

**CI Integration**:
```yaml
- name: Audit dependencies
  run: npm audit --audit-level=moderate
```

### 10. Dependabot

**File**: `.github/dependabot.yml`

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/web-project"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    open-pull-requests-limit: 10
    groups:
      security-updates:
        patterns: ["*"]
        update-types: ["security"]
```

## Phase F — CI/CD Workflow

### 11. GitHub Actions

**File**: `.github/workflows/ci.yml`

```yaml
name: SmartFarm CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  frontend-quality:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint:check
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Run E2E tests
        run: npm run e2e
      
      - name: Run Lighthouse CI
        run: npm run lhci

  build-and-deploy:
    needs: [frontend-quality, backend-quality, security-audit, lighthouse-ci]
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v3.0
        with:
          publish-dir: './web-project/public'
          production-branch: main
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      
      - name: Deploy to Railway
        uses: bervProject/railway-deploy@v1.0.7
        with:
          railway_token: ${{ secrets.RAILWAY_TOKEN }}
          service: ${{ secrets.RAILWAY_SERVICE_ID }}
```

**Workflow Steps**:
1. Code quality checks (ESLint, Prettier)
2. Unit tests with coverage
3. E2E tests
4. Accessibility tests (jest-axe)
5. Performance tests (Lighthouse CI)
6. Security audit
7. Build and deploy

## Phase G — Developer Workflow

### 12. Husky + lint-staged

**File**: `web-project/.husky/pre-commit`

```bash
#!/usr/bin/env sh
echo "🔧 Running pre-commit checks..."

# Run lint-staged
npx lint-staged

# Run unit tests
npm run test

# Check test coverage
npm run test:coverage

echo "✅ Pre-commit checks passed!"
```

**Pre-commit Hooks**:
- ESLint fixes
- Prettier formatting
- Unit tests
- Coverage checks

**Pre-push Hooks**:
- Full linting
- All tests
- Security audit
- E2E tests

## Phase H — Documentation

### 13. Bug Prevention Checklist

#### Before Committing:
- [ ] ESLint passes without errors
- [ ] Prettier formatting is consistent
- [ ] Unit tests pass
- [ ] Test coverage ≥ 80%
- [ ] No console errors in browser

#### Before Pushing:
- [ ] All pre-commit checks pass
- [ ] E2E tests pass
- [ ] Accessibility tests pass
- [ ] Security audit passes
- [ ] Performance tests pass

#### Before Merging:
- [ ] CI/CD pipeline passes
- [ ] Lighthouse CI passes
- [ ] Code review completed
- [ ] Documentation updated

## Error Prevention Strategies

### 1. Runtime Errors
- **Global error handlers** capture uncaught exceptions
- **API error monitoring** tracks failed requests
- **Input validation** prevents invalid data
- **Type checking** catches type mismatches

### 2. Accessibility Violations
- **jest-axe** detects ARIA violations
- **Lighthouse CI** enforces accessibility standards
- **Modal accessibility** prevents focus conflicts
- **Keyboard navigation** testing

### 3. API Connection Failures
- **Retry logic** handles temporary failures
- **Error boundaries** prevent cascade failures
- **Health checks** monitor API status
- **Fallback mechanisms** provide graceful degradation

## Monitoring and Alerting

### Error Tracking
- **Sentry integration** for production errors
- **Console error monitoring** for development
- **API error tracking** for backend issues
- **Accessibility violation alerts**

### Performance Monitoring
- **Lighthouse CI** for performance metrics
- **Core Web Vitals** tracking
- **Bundle size monitoring**
- **Load time optimization**

### Security Monitoring
- **Dependency vulnerability scanning**
- **npm audit** in CI/CD
- **Dependabot** for automatic updates
- **Security headers** validation

## Best Practices

### Code Quality
1. **Always run linting** before committing
2. **Write tests** for new features
3. **Maintain test coverage** above 80%
4. **Use TypeScript** for type safety
5. **Follow accessibility guidelines**

### Testing
1. **Unit tests** for individual functions
2. **Integration tests** for API interactions
3. **E2E tests** for user workflows
4. **Accessibility tests** for compliance
5. **Performance tests** for optimization

### Deployment
1. **Never skip CI/CD** checks
2. **Test in staging** environment first
3. **Monitor deployment** for errors
4. **Rollback plan** for failures
5. **Document changes** thoroughly

## Troubleshooting

### Common Issues

#### ESLint Errors
```bash
# Fix auto-fixable issues
npm run lint

# Check specific file
npx eslint public/js/filename.js
```

#### Test Failures
```bash
# Run specific test
npm test -- --testNamePattern="specific test"

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

#### E2E Test Issues
```bash
# Run in headed mode
npm run e2e:headed

# Run with UI
npm run e2e:ui

# Debug specific test
npx playwright test --debug
```

#### Lighthouse CI Failures
```bash
# Run locally
npm run lhci

# Check specific URL
npx lhci autorun --url=http://localhost:8080/dashboard.html
```

## Conclusion

This comprehensive bug prevention stack ensures that:

- **Code quality** is maintained through linting and formatting
- **Accessibility** is enforced through automated testing
- **Performance** is monitored through Lighthouse CI
- **Security** is maintained through dependency scanning
- **Errors** are tracked and prevented from reaching production
- **Deployment** is automated and reliable

The system provides multiple layers of protection, from pre-commit hooks to production monitoring, ensuring a robust and reliable SmartFarm application.

## Quick Start

1. **Install dependencies**:
   ```bash
   cd web-project
   npm install
   ```

2. **Run tests**:
   ```bash
   npm test
   npm run e2e
   npm run lhci
   ```

3. **Start development**:
   ```bash
   npm run dev
   ```

4. **Check code quality**:
   ```bash
   npm run lint:check
   npm run format:check
   ```

5. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push
   ```

The CI/CD pipeline will automatically run all checks and deploy if everything passes.