# 🤝 Contributing to SmartFarm

Thank you for your interest in contributing to SmartFarm! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Issue Guidelines](#issue-guidelines)
- [Pull Request Guidelines](#pull-request-guidelines)

## 📜 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ and npm
- **Git** for version control
- **Android Studio** (for Android development)
- **VS Code** or your preferred editor

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/smartfarm-app.git
   cd smartfarm-app
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/Warusi2023/smartfarm-app.git
   ```

## 🛠️ Development Setup

### Web Application
```bash
cd web-project
npm install
npm run dev
```

### Backend API
```bash
cd railway-minimal
npm install
npm start
```

### Android Application
```bash
cd android-project
./gradlew assembleDebug
```

## 🔄 Contributing Process

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 2. Make Changes
- Write your code following our [coding standards](#coding-standards)
- Add tests for new functionality
- Update documentation as needed

### 3. Test Your Changes
```bash
# Web application
cd web-project
npm test

# Backend API
cd railway-minimal
npm test

# Android
cd android-project
./gradlew test
```

### 4. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature description"
```

**Commit Message Format:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

## 📝 Coding Standards

### JavaScript/TypeScript
- Use **ESLint** configuration
- Follow **Prettier** formatting
- Use **meaningful variable names**
- Add **JSDoc comments** for functions
- Write **unit tests** for new features

### Kotlin (Android)
- Follow **Kotlin coding conventions**
- Use **meaningful class and function names**
- Add **KDoc comments**
- Write **unit tests** with JUnit

### General Guidelines
- **Keep functions small** and focused
- **Use descriptive names** for variables and functions
- **Add comments** for complex logic
- **Follow existing code style**
- **Handle errors gracefully**

## 🧪 Testing

### Test Requirements
- **All new features** must have tests
- **Bug fixes** must include regression tests
- **Maintain test coverage** above 80%

### Running Tests
```bash
# Web application
npm test
npm run test:coverage

# Backend API
npm test
npm run test:coverage

# Android
./gradlew test
./gradlew jacocoTestReport
```

### Test Structure
```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data
```

## 📚 Documentation

### Documentation Requirements
- **Update README.md** for significant changes
- **Add JSDoc/KDoc comments** for new functions
- **Update API documentation** for backend changes
- **Include examples** in documentation

### Documentation Structure
```
docs/
├── API.md              # API documentation
├── DEPLOYMENT.md       # Deployment guide
├── USER_MANUAL.md      # User manual
├── DEVELOPER_GUIDE.md  # Developer guide
└── CONTRIBUTING.md     # This file
```

## 🐛 Issue Guidelines

### Before Creating an Issue
1. **Search existing issues** to avoid duplicates
2. **Check if it's already fixed** in the latest version
3. **Provide clear reproduction steps**

### Issue Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., 1.0.0]

**Additional Context**
Any other context about the problem.
```

## 🔀 Pull Request Guidelines

### Before Submitting
- [ ] **Tests pass** locally
- [ ] **Code follows** style guidelines
- [ ] **Documentation updated**
- [ ] **No merge conflicts**
- [ ] **Commit messages** follow format

### PR Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

## 🏷️ Release Process

### Version Numbering
We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist
- [ ] **Update version numbers**
- [ ] **Update CHANGELOG.md**
- [ ] **Run full test suite**
- [ ] **Update documentation**
- [ ] **Create release notes**

## 🆘 Getting Help

### Resources
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/Warusi2023/smartfarm-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Warusi2023/smartfarm-app/discussions)

### Contact
- **Email**: dev@smartfarm.app
- **Discord**: [SmartFarm Community](https://discord.gg/smartfarm)

## 🎉 Recognition

Contributors will be recognized in:
- **README.md** contributors section
- **Release notes**
- **Project documentation**

## 📄 License

By contributing to SmartFarm, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

**Thank you for contributing to SmartFarm! 🌱**
