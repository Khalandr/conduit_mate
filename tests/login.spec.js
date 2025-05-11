// tests/login.spec.js
const { test, expect } = require('../fixtures/auth.fixture');
const { LoginPage } = require('../pages/login.page');
const { invalidLoginData } = require('../utilities/test-data');

test.describe('Login Functionality', () => {
    test('should login successfully with valid credentials', async ({ page, newUser }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(newUser.email, newUser.password);

        await expect(page).toHaveURL('https://conduit.mate.academy/');

        const userNav = page.locator('.nav-link', { hasText: newUser.username });
        await expect(userNav).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const { email, password } = invalidLoginData.wrongCredentials;

        await loginPage.goto();
        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.clickSignIn();

        await expect(loginPage.errorMessages.first()).toBeVisible();
        await expect(page).toHaveURL('https://conduit.mate.academy/user/login');
    });

    test('should validate empty password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const { email, password, expectedError } = invalidLoginData.emptyPassword;

        await loginPage.goto();
        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.clickSignIn();

        // Check for the specific password error
        await expect(loginPage.passwordErrors).toContainText(expectedError);
        await expect(page).toHaveURL('https://conduit.mate.academy/user/login');
    });

    test('should validate empty email', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const { email, password, expectedError } = invalidLoginData.emptyEmail;

        await loginPage.goto();
        await loginPage.fillEmail(email);
        await loginPage.fillPassword(password);
        await loginPage.clickSignIn();

        // Check for the specific email error
        await expect(loginPage.emailErrors).toContainText(expectedError);
        await expect(page).toHaveURL('https://conduit.mate.academy/user/login');
    });
});