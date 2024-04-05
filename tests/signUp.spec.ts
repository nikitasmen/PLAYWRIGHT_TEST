import { test, expect } from '@playwright/test';

test.describe.parallel('SignUp tests', () => {

    test.beforeEach(async ({ page }) => {
        //go to the page
        await page.goto('https://nikitas.learnworlds.com/');
    });

    test('Sign up without credentials', async ({ page }) => {    
        //click on the sign up form and submit the form without credentials
        await page.click('#menuItem_1638551161296_4211');
        await page.click('.signup-btn');
        
        //assert that the error messages are displayed
        const errorMes = await page.locator('.error-msg');
            await expect(errorMes).toHaveCount(3);
            await expect(errorMes.nth(0)).toContainText('This field should have a minimum of 4 characters.');
            await expect(errorMes.nth(1)).toContainText('This field, is required.');
            await expect(errorMes.nth(2)).toContainText('Password cannot be the same as email address');
    });

    test('Sign up with wrong password credentials', async ({ page }) => {
        //click on the sign up form and fill the fields with wrong credentials
        await page.click('#menuItem_1638551161296_4211');
        await page.fill('#username', 'nikitas');
        await page.fill('#email', 'menounosnikitas@gmail.com'); 
        await page.getByRole('textbox', { name: 'Password' }).fill('fakepassword');        
        //submit the form
        //try the below for signup button 
        await page.getByText('Sign up to nikitas! or click').click();
        await page.click('.signup-btn');

        //assert that the error message is displayed
        const errorMes = await page.locator('.error-msg');
            await expect(errorMes).toContainText('Password does not follow the rules');
    }); 

    test('Sign up with existing email', async ({ page }) => {
        //click on the sign up form and fill the fields with wrong credentials
        await page.click('#menuItem_1638551161296_4211');
        await page.fill('#username', 'nikitarakos');
        await page.fill('#email', 'menounosnikitas@gmail.com'); 
        //check this approach for filling the password field
        await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1E!');
        //submit the form
        await page.click('.signup-btn');

        //assert that the error message is displayed
        const errorMes = await page.locator('.error-wrapper-notif').first();
            await expect(errorMes).toHaveText('Already exists');
    }); 

    //After the test the account is created and the email is already in use so the test will fail
    test.skip('Sign up with correct credentials', async ({ page }) => {
        //create a unique fake email for the test
        const timestamp = Date.now();
        const email = `tl20412+${timestamp}@edu.hmu.gr`;

        //click on the sign up form and fill the fields with correct credentials
        await page.click('#menuItem_1638551161296_4211');
        await page.fill('#username', 'menounos');
        await page.fill('#email', email);
        await page.getByRole('textbox', { name: 'Password' }).fill('Qwerty1E!');

        //submit the form
        await page.click('.signup-btn');
        
        //assert that the user is logged in and the correct page is displayed
        await expect(page).toHaveURL('https://nikitas.learnworlds.com/start');
        await expect(page).toHaveTitle('After Login');
        const pageTittle = await page.locator('h1');
        await expect(pageTittle).toBeVisible();
        await expect(pageTittle).toHaveText('Hi, menounos');
    
        const signupButton = await page.locator('#menuItem_1638551161296_4211');
            await expect(signupButton).not.toBeVisible();
    }); 
});