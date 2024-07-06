import { expect, Locator , Page } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly signupButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator('#menuItem5');
        this.signupButton = page.locator('#menuItem_1638551161296_4211');
    }
    
    async visit() {
        await this.page.goto('https://nikitas.learnworlds.com');
    }

    async clickSignUpButton() {
        await this.signupButton.click();
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async assertHomePage() {
        await expect(this.page).toHaveURL('https://nikitas.learnworlds.com');
        await expect(this.signInButton).toBeVisible();
        await expect(this.signupButton).toBeVisible();
    }

}
