import { expect, Locator, Page } from "@playwright/test";

export class SignInPage{

    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.locator('.-email-input');
        this.passwordField = page.locator('.-pass-input');
        this.submitButton = page.locator('#submitLogin');
        this.errorMessage = page.locator('.js-signin-error-msg');
    }

    async login(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.submitButton.click();
    }

    async assertFailedLogin() {
        await expect(this.errorMessage)
            .toContainText('Please, check your email and password.');
    }

}