const { test, expect } = require('../fixtures/auth.fixture');
const { LoginPage } = require('../pages/login.page');
const { invalidLoginData } = require('../utilities/test-data');
const { testLoginValidation } = require('../utilities/test-helpers');

test.describe('Login Functionality', () => {
    test('should login successfully with valid credentials', async ({ page, newUser }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(newUser.email, newUser.password);
        await expect(page).toHaveURL('https://conduit.mate.academy/');
        const userNav = page.locator('.nav-link', { hasText: newUser.username });
        await expect(userNav).toBeVisible();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await testLoginValidation({
            page,
            fieldName: 'credentials',
            testData: invalidLoginData.wrongCredentials
        });
    });

    test('should validate empty password', async ({ page }) => {
        await testLoginValidation({
            page,
            fieldName: 'password',
            testData: invalidLoginData.emptyPassword
        });
    });

    test('should validate empty email', async ({ page }) => {
        await testLoginValidation({
            page,
            fieldName: 'email',
            testData: invalidLoginData.emptyEmail
        });
    });
});