const { test: base } = require('@playwright/test');
const { registerNewUser } = require('../utilities/api');

exports.test = base.extend({
    newUser: async ({}, use) => {
        const user = await registerNewUser();
        await use(user);
    },

    authenticatedPage: async ({ page }, use) => {
        const user = await registerNewUser();

        await page.goto('https://conduit.mate.academy/user/login');
        await page.fill('input[type="email"]', user.email);
        await page.fill('input[type="password"]', user.password);
        await page.click('button[type="submit"]');

        await page.waitForLoadState('networkidle');

        page.user = user;
        await use(page);
    }
});

exports.expect = base.expect;