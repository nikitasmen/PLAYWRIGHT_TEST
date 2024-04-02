import { test, expect } from '@playwright/test';


test('Sign up without credentials', async ({ page }) => {
    //go to the page
    await page.goto('https://nikitas.learnworlds.com/');
    
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
    //go to the page
    await page.goto('https://nikitas.learnworlds.com/');
    
    //click on the sign up form and fill the fields with wrong credentials
    await page.click('#menuItem_1638551161296_4211');
    await page.fill('#username', 'nikitas');
    await page.fill('#email', 'menounosnikitas@gmail.com'); 
    
    //submit the form
    await page.click('.signup-btn');

    //assert that the error message is displayed
    const errorMes = await page.locator('.error-msg');
        await expect(errorMes).toContainText('Password does not follow the rules');
}); 

test('Sign up with existing email', async ({ page }) => {
    //go to the page
    await page.goto('https://nikitas.learnworlds.com/');
    
    //click on the sign up form and fill the fields with wrong credentials
    await page.click('#menuItem_1638551161296_4211');
    await page.fill('#username', 'nikitarakos');
    await page.fill('#email', 'menounosnikitas@gmail.com'); 
    //page.fill does not work for password fields, so we use page.type
    //although password is correct return an error message on password field and not email field
    await page.fill('#signUpForm > div.form-input-group > div.-form-inputs > div.password-meter-container.password-meter-signup-container.login-form-input-wrapper.mb-15.member-input-wrapper > div > div.form-control-wrapper > input', 'Qwerty1E!');
    
    //submit the form
    await page.click('.signup-btn');

    //assert that the error message is displayed
    const errorMes = await page.locator('.error-wrapper-notif').first();
        await expect(errorMes).toHaveText('Already exists');
}); 

test.skip('Sign up with correct credentials', async ({ page }) => {
    //go to the page
    await page.goto('https://nikitas.learnworlds.com/');
    
    //click on the sign up form and fill the fields with correct credentials
    await page.click('#menuItem_1638551161296_4211');
    await page.fill('#username', 'menounos');
    await page.fill('#email', 'tl20412@edu.hmu.gr.com');
    await page.fill('#signUpForm > div.form-input-group > div.-form-inputs > div.password-meter-container.password-meter-signup-container.login-form-input-wrapper.mb-15.member-input-wrapper > div > div.form-control-wrapper > input', 'Qwerty1E!');

    //submit the form
    await page.click('text=Start your learning journey');
    
    //assert that the user is logged in and the correct page is displayed
    await expect(page).toHaveURL('https://nikitas.learnworlds.com/start');
    await expect(page).toHaveTitle('After Login');
    const pageTittle = await page.locator('h1');
      await expect(pageTittle).toBeVisible();
      await expect(pageTittle).toHaveText('Hi, nikolakos');
  
    const signupButton = await page.locator('#menuItem_1638551161296_4211');
      await expect(signupButton).not.toBeVisible();
  }); 