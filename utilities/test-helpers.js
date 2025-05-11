// utilities/test-helpers.js
const { expect } = require('@playwright/test');
const { NewArticlePage } = require('../pages/new-article.page');
const { LoginPage } = require('../pages/login.page');

async function testArticleFieldValidation({ page, fieldName, testData }) {
    const newArticlePage = new NewArticlePage(page);

    await newArticlePage.goto();
    await newArticlePage.fillTitle(testData.title);
    await newArticlePage.fillDescription(testData.description);
    await newArticlePage.fillBody(testData.body);
    await newArticlePage.clickPublish();

    await expect(page).toHaveURL('https://conduit.mate.academy/editor');
    await expect(page.locator('.error-messages')).toBeVisible();

    let errors;
    if (fieldName === 'title') {
        errors = await newArticlePage.getTitleErrors();
    } else if (fieldName === 'description') {
        errors = await newArticlePage.getDescriptionErrors();
    } else if (fieldName === 'body') {
        errors = await newArticlePage.getBodyErrors();
    }

    expect(errors).toContain(testData.expectedError);
}

async function testLoginValidation({ page, fieldName, testData }) {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.fillEmail(testData.email);
    await loginPage.fillPassword(testData.password);
    await loginPage.clickSignIn();
    await expect(page).toHaveURL('https://conduit.mate.academy/user/login');

    if (fieldName === 'email') {
        await expect(loginPage.emailErrors).toContainText(testData.expectedError);
    } else if (fieldName === 'password') {
        await expect(loginPage.passwordErrors).toContainText(testData.expectedError);
    } else if (fieldName === 'credentials') {
        await expect(loginPage.errorMessages.first()).toBeVisible();
    }
}

module.exports = {
    testArticleFieldValidation,
    testLoginValidation
};