import { expect, Locator , Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class SignUpPage extends HomePage{
    readonly page: Page;
    readonly username: Locator; 
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly signUpButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page); 
        this.page = page;
        this.username = page.locator('#username');
        this.emailField = page.locator('#email');
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.signUpButton = page.locator('.signup-btn'); 
        this.errorMessage = page.locator('.error-msg');
    }
    
    async signUp(username: string, email: string, password: string) {
        await this.username.fill(username);
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        //click somewhere else to remove the focus from the password field
        await this.username.click(); 
        await this.signUpButton.click();
    }

    async assertEmptyFormErrorMessages() {
        await expect(this.errorMessage).toHaveCount(3);
        await expect(this.errorMessage.nth(0)).toContainText('This field should have a minimum of 4 characters.');
        await expect(this.errorMessage.nth(1)).toContainText('This field, is required.');
        await expect(this.errorMessage.nth(2)).toContainText('Password cannot be the same as email address');
    }

    async assertEmailExistsErrorMessage() {
        await expect(this.errorMessage).toHaveText('Already exists');
    }
    
    async assertPasswordError() {
        await expect(this.errorMessage).toHaveText('Password does not follow the rules');
    }

}