// pages/new-article.page.js
class NewArticlePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Define element locators using input types rather than classes
        this.titleInput = page.locator('input[type="text"][placeholder="Article Title"]');
        this.descriptionInput = page.locator('input[type="text"][placeholder="What\'s this article about?"]');
        this.bodyInput = page.locator('textarea[placeholder="Write your article (in markdown)"]');
        this.tagsInput = page.locator('input[type="text"][placeholder="Enter tags"]');
        this.publishButton = page.locator('button[type="button"]', { hasText: 'Publish Article' });
        this.tagList = page.locator('.tag-list');

        // Error messages
        this.errorMessages = page.locator('.error-messages li');
    }

    /**
     * Navigate to the new article editor
     */
    async goto() {
        await this.page.goto('https://conduit.mate.academy/editor');
    }

    /**
     * Fill in the article title
     * @param {string} title
     */
    async fillTitle(title) {
        await this.titleInput.fill(title);
    }

    /**
     * Fill in the article description
     * @param {string} description
     */
    async fillDescription(description) {
        await this.descriptionInput.fill(description);
    }

    /**
     * Fill in the article body
     * @param {string} body
     */
    async fillBody(body) {
        await this.bodyInput.fill(body);
    }

    /**
     * Add a tag to the article
     * @param {string} tag
     */
    async addTag(tag) {
        await this.tagsInput.fill(tag);
        await this.page.keyboard.press('Enter');
    }

    /**
     * Click the publish button
     */
    async clickPublish() {
        // Make sure the button is visible
        await this.publishButton.waitFor({ state: 'visible' });

        // Click the button
        await this.publishButton.click();

        // Wait for network to be idle
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Create a new article with provided content
     * @param {Object} article
     * @param {string} article.title
     * @param {string} article.description
     * @param {string} article.body
     * @param {string[]} article.tagList
     */
    async createArticle({ title, description, body, tagList = [] }) {
        await this.goto();
        await this.fillTitle(title);
        await this.fillDescription(description);
        await this.fillBody(body);

        // Add tags
        for (const tag of tagList) {
            await this.addTag(tag);
        }

        // Publish the article
        await this.clickPublish();
    }
}

module.exports = { NewArticlePage };