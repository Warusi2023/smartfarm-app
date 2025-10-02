# Contributing to SmartFarm

Thank you for your interest in contributing to SmartFarm! This guide will help you get started and ensure your contributions follow our standards.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Git
- A code editor (VS Code recommended)

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/smartfarm-app.git`
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`

## 📋 Development Guidelines

### Code Standards
- **No console errors/warnings** - All code must pass console error tests
- **Use unified logging** - Use `SmartFarmLogger` instead of `console.log`
- **Error handling** - Always wrap API calls in try-catch blocks
- **Null checks** - Check for element existence before DOM manipulation
- **Async/await** - Use modern JavaScript patterns

### File Structure
```
web-project/public/
├── js/
│   ├── log.js              # Unified logging system
│   ├── error-boundary.js   # Error boundary for JS errors
│   ├── api-utils.js        # API utilities with error handling
│   └── [feature].js        # Feature-specific JavaScript
├── [page].html             # HTML pages
└── images/                 # Static assets

backend-api/
├── routes/                 # API route handlers
├── controllers/            # Business logic
├── database/              # Database operations
└── lib/                   # Utilities
```

## 🧪 Testing

### Console Error Tests
**CRITICAL:** All routes must pass console error tests.

```bash
# Run console error tests
npx playwright test tests/console.spec.js

# Test specific route
npx playwright test tests/console.spec.js -g "dashboard"
```

### Test Requirements
- ✅ No `console.error` messages
- ✅ No `console.warn` messages  
- ✅ No unhandled promise rejections
- ✅ No network errors
- ✅ No JavaScript runtime errors

### Adding New Routes
When adding new routes, update `tests/console.spec.js`:

```javascript
const routes = [
    '/',
    '/dashboard.html',
    '/your-new-page.html', // Add here
    // ... other routes
];
```

## 🔧 Error Handling

### API Calls
Always use the unified API utilities:

```javascript
// ❌ Bad - Direct fetch without error handling
fetch('/api/data').then(response => response.json())

// ✅ Good - Using SmartFarmAPI
const result = await window.SmartFarmAPI.get('/data');
if (result.success) {
    // Handle success
} else {
    // Handle error
    window.SmartFarmLogger.error('API call failed:', result.error);
}
```

### DOM Manipulation
Always check for element existence:

```javascript
// ❌ Bad - No null check
document.getElementById('element').value = 'test';

// ✅ Good - With null check
const element = document.getElementById('element');
if (element) {
    element.value = 'test';
} else {
    window.SmartFarmLogger.warn('Element not found: element');
}
```

### Logging
Use the unified logging system:

```javascript
// ❌ Bad - Direct console usage
console.log('Debug info');
console.error('Error occurred');

// ✅ Good - Using SmartFarmLogger
window.SmartFarmLogger.debug('Debug info');
window.SmartFarmLogger.error('Error occurred');
```

## 🚫 Common Mistakes to Avoid

### 1. Console Statements in Production
```javascript
// ❌ Bad
console.log('User logged in');

// ✅ Good
window.SmartFarmLogger.info('User logged in');
```

### 2. Unhandled Promise Rejections
```javascript
// ❌ Bad
async function loadData() {
    const data = await fetch('/api/data');
    return data.json();
}

// ✅ Good
async function loadData() {
    try {
        const result = await window.SmartFarmAPI.get('/data');
        return result.success ? result.data : null;
    } catch (error) {
        window.SmartFarmLogger.error('Failed to load data:', error);
        return null;
    }
}
```

### 3. Missing Error Boundaries
```javascript
// ❌ Bad - No error handling
function riskyOperation() {
    // Code that might throw
}

// ✅ Good - With error boundary
function riskyOperation() {
    try {
        // Code that might throw
    } catch (error) {
        window.SmartFarmLogger.error('Operation failed:', error);
        return null;
    }
}
```

## 📝 Pull Request Process

### Before Submitting
1. **Run tests**: `npx playwright test tests/console.spec.js`
2. **Check console**: Open browser dev tools, navigate all pages
3. **Build check**: `npm run build` (if applicable)
4. **Lint check**: `npm run lint` (if available)

### PR Requirements
- [ ] All console error tests pass
- [ ] No new console errors/warnings introduced
- [ ] Error handling added for new features
- [ ] Documentation updated if needed
- [ ] Code follows established patterns

### PR Title Format
```
fix: resolve console errors in [component]
feat: add [feature] with proper error handling
refactor: improve error handling in [component]
```

## 🐛 Bug Reports

When reporting bugs, include:
1. **Console output** - Screenshot of browser console
2. **Steps to reproduce** - Detailed reproduction steps
3. **Expected behavior** - What should happen
4. **Actual behavior** - What actually happens
5. **Environment** - Browser, OS, etc.

## 💡 Feature Requests

When requesting features:
1. **Use case** - Why is this feature needed?
2. **Implementation** - How should it work?
3. **Error handling** - How should errors be handled?
4. **Testing** - How can it be tested?

## 🔍 Code Review Checklist

### For Reviewers
- [ ] No console errors/warnings
- [ ] Proper error handling
- [ ] Uses unified logging
- [ ] Follows established patterns
- [ ] Tests pass
- [ ] Documentation updated

### For Contributors
- [ ] Self-review completed
- [ ] Tests written/updated
- [ ] Console errors checked
- [ ] Error handling implemented
- [ ] Logging standardized

## 📚 Resources

### Documentation
- [Console Error Report](docs/console-errors-report.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](DEPLOYMENT_CHECKLIST.md)

### Tools
- [Playwright Testing](https://playwright.dev/)
- [SmartFarm Logger](web-project/public/js/log.js)
- [Error Boundary](web-project/public/js/error-boundary.js)

## 🤝 Community

- **Issues**: Use GitHub Issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: All PRs require review before merging

## 📄 License

By contributing to SmartFarm, you agree that your contributions will be licensed under the same license as the project.

---

**Remember: Zero console errors is not optional - it's required!** 🚫🐛