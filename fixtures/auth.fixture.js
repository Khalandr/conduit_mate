// fixtures/auth.fixture.js
const { test: base } = require('@playwright/test');
const { registerNewUser } = require('../utilities/api');

exports.test = base.extend({
    // New user fixture for login tests
    newUser: async ({}, use) => {
        const user = await registerNewUser();
        await use(user);
    },

    // Authenticated page fixture for tests that require a logged-in user
    authenticatedPage: async ({ page }, use) => {
        // Register a new user
        const user = await registerNewUser();

        // Login via UI (reliable approach)
        await page.goto('https://conduit.mate.academy/user/login');
        await page.fill('input[type="email"]', user.email);
        await page.fill('input[type="password"]', user.password);
        await page.click('button[type="submit"]');

        await page.waitForLoadState('networkidle');

        // Verify we're logged in
        const isLoggedIn = await page.locator('a', { hasText: 'Settings' }).isVisible();
        if (!isLoggedIn) {
            throw new Error('Failed to authenticate via UI login');
        }

        // Attach user info to the page for reference
        page.user = user;

        // Make the authenticated page available to the test
        await use(page);
    }
});

exports.expect = base.expect;