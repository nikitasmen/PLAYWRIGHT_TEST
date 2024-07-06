import { expect, Locator , Page } from "@playwright/test";

export class StartPage{
    readonly page: Page;
    readonly pageTittle: Locator;
    readonly accountButton: Locator;
    readonly signupButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTittle = page.locator('h1');
        this.accountButton = page.locator('#menuItem16');
        this.signupButton = page.locator('#menuItem_1638551161296_4211');
        this.logoutButton = page.getByRole('link', { name: 'SIGN OUT' })
    }
    
    async assertStartPage(username: string ) {
        await expect(this.pageTittle).toBeVisible();
        await expect(this.pageTittle).toHaveText('Hi, '+ username);
        await expect(this.signupButton).not.toBeVisible();
        await expect(this.accountButton).toBeVisible();
        
    }

    async logout() {
        await this.accountButton.click();
        await this.logoutButton.click();
    }

}