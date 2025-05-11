// tests/new-article.spec.js
const { test, expect } = require('../fixtures/auth.fixture');
const { NewArticlePage } = require('../pages/new-article.page');
const { generateArticleData, invalidArticleData } = require('../utilities/test-data');
const { testArticleFieldValidation } = require('../utilities/test-helpers');

test.describe('Article Creation', () => {
    test('should create article successfully', async ({ authenticatedPage }) => {
        const page = authenticatedPage;
        const newArticlePage = new NewArticlePage(page);
        const articleData = generateArticleData();
        await newArticlePage.createArticle(articleData);
        await expect(page).toHaveURL(/\/article\/.+/);
        await expect(page.locator('h1')).toContainText(articleData.title);
        await expect(page.locator('.article-content')).toContainText(articleData.body.substring(0, 50));
    });
});

test.describe('Article Creation Validation', () => {
    test('should validate empty title', async ({ authenticatedPage }) => {
        await testArticleFieldValidation({
            page: authenticatedPage,
            fieldName: 'title',
            testData: invalidArticleData.emptyTitle
        });
    });

    test('should validate empty body', async ({ authenticatedPage }) => {
        await testArticleFieldValidation({
            page: authenticatedPage,
            fieldName: 'body',
            testData: invalidArticleData.emptyBody
        });
    });

    test('should validate empty description', async ({ authenticatedPage }) => {
        await testArticleFieldValidation({
            page: authenticatedPage,
            fieldName: 'description',
            testData: invalidArticleData.emptyDescription
        });
    });
});