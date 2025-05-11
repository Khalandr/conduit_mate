// tests/new-article.spec.js
const { test, expect } = require('../fixtures/auth.fixture');
const { NewArticlePage } = require('../pages/new-article.page');
const { generateArticleData } = require('../utilities/test-data');

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