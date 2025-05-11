class NewArticlePage {
    constructor(page) {
        this.page = page;
        this.titleInput = page.locator('input[type="text"][placeholder="Article Title"]');
        this.descriptionInput = page.locator('input[type="text"][placeholder="What\'s this article about?"]');
        this.bodyInput = page.locator('textarea[placeholder="Write your article (in markdown)"]');
        this.tagsInput = page.locator('input[type="text"][placeholder="Enter tags"]');
        this.publishButton = page.locator('button[type="button"]', { hasText: 'Publish Article' });
        this.tagList = page.locator('.tag-list');
    }

    async goto() {
        await this.page.goto('https://conduit.mate.academy/editor');
    }

    async fillTitle(title) {
        await this.titleInput.fill(title);
    }

    async fillDescription(description) {
        await this.descriptionInput.fill(description);
    }

    async fillBody(body) {
        await this.bodyInput.fill(body);
    }

    async addTag(tag) {
        await this.tagsInput.fill(tag);
        await this.page.keyboard.press('Enter');
    }

    async clickPublish() {
        await this.publishButton.waitFor({ state: 'visible' });
        await this.publishButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async createArticle({ title, description, body, tagList = [] }) {
        await this.goto();
        await this.fillTitle(title);
        await this.fillDescription(description);
        await this.fillBody(body);
        for (const tag of tagList) {
            await this.addTag(tag);
        }
        await this.clickPublish();
    }

    async getTitleErrors() {
        const errors = this.page.locator('.error-messages li:has-text("title") li');
        return errors.allTextContents();
    }

    async getDescriptionErrors() {
        const errors = this.page.locator('.error-messages li:has-text("description") li');
        return errors.allTextContents();
    }

    async getBodyErrors() {
        const errors = this.page.locator('.error-messages li:has-text("body") li');
        return errors.allTextContents();
    }
}

module.exports = { NewArticlePage };