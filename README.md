# Conduit Test Automation Framework

A **Playwright-based** test automation framework for [Conduit](https://conduit.mate.academy/), implementing the **Page Object Model (POM)** pattern.

---

## 📁 Project Structure

```text
├── fixtures/
│   └── auth.fixture.js         # Authentication fixtures
├── pages/
│   ├── login.page.js           # Login page object
│   └── new-article.page.js     # Article creation page object
├── tests/
│   ├── login.spec.js           # Login tests
│   └── new-article.spec.js     # Article creation tests
├── utilities/
│   ├── api.js                  # API helper functions
│   ├── test-data.js            # Test data generation
│   └── test-helpers.js         # Common test helper functions
└── .github/workflows/          # GitHub Actions configuration
```
---
## 🔧 Setup
Install dependencies:
```bash
  npm install
```
Install Playwright browsers:
```bash
  npx playwright install
```
---
## ▶️ Running Tests
Run all tests:

```bash
  npx playwright test
```
Run a specific test file:
```bash
  npx playwright test tests/login.spec.js
```
Run with UI:
```bash
  npx playwright test --headed
```
Debug tests:
```bash
  npx playwright test --debug
```

---
## 🧪 Test Coverage

### 🔐 Login

- 🟢 Login with valid credentials
- 🔴 Login with invalid credentials
- 🔴 Login with empty fields

### 📝 Article Creation

- 🟢 Create article with valid data
- 🔴 Create article with empty title/description/body

---

## 🧩 Key Components

### 📄 Page Objects

- `LoginPage`: Login form interactions and validations
- `NewArticlePage`: Article editor interactions and validations

### 🧪 Fixtures

- `newUser`: Creates user via API for login tests
- `authenticatedPage`: Pre-authenticated page for protected areas

### 🛠️ Utilities

- API registration
- Dynamic test data generation
- Validation helper functions

---

## 🔄 CI/CD

GitHub Actions automatically runs tests on:

- Pushes to the `main` branch
- Pull requests
- Manual workflow triggers  
