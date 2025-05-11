// pages/login.page.js
class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('.form-control[type="email"]');
        this.passwordInput = page.locator('.form-control[type="password"]');
        this.signInButton = page.locator('button.btn-primary[type="submit"]');
        this.errorMessages = page.locator('.error-messages li');
        this.passwordErrors = page.locator('.error-messages > li:has-text("password") li');
        this.emailErrors = page.locator('.error-messages > li:has-text("email") li');
        this.signUpLink = page.locator('a[href="/user/register"]');
    }

    async goto() {
        await this.page.goto('https://conduit.mate.academy/user/login');
    }

    async fillEmail(email) {
        await this.emailInput.fill(email);
    }

    async fillPassword(password) {
        await this.passwordInput.fill(password);
    }

    async clickSignIn() {
        await this.signInButton.click();
    }

    async login(email, password) {
        await this.goto();
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickSignIn();
    }

    async getErrorMessages() {
        return this.page.locator('.error-messages li li').allTextContents();
    }
}

module.exports = { LoginPage };