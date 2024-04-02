import { test, expect } from '@playwright/test';

test.describe.parallel('SignIn / Logout tests', () => {

  test.beforeEach(async ({ page }) => {
    //go to the page
    await page.goto('https://nikitas.learnworlds.com/');
  }); 

  test('Sign in with wrong credentials', async ({ page }) => {
    //click on the sign in form
    await page.click('#menuItem5');

    //fill the email and password fields with wrong credentials
    await page.fill('.-email-input', 'fakeEmail');
    await page.fill('.-pass-input', 'fakePassword');
    //submit the login form
    await page.click('#submitLogin');

    //assert that the error message is displayed
    const errorMes = await page.locator('.js-signin-error-msg');
      await expect(errorMes).toContainText('Please, check your email and password.');
  });

  test('Sign in with correct credentials and Logout', async ({ page }) => {
    //click on the signup form and then on the sign in form
    await page.click('#menuItem5');
    
    //fill the email and password fields with correct credentials and submit 
    await page.fill('.-email-input', 'menounosnikitas@gmail.com');
    await page.fill('.-pass-input', '0raiw$AE');
    await page.click('#submitLogin');

    //assert that the user is logged in and the correct page is displayed
    await expect(page).toHaveURL('https://nikitas.learnworlds.com/start');
    await expect(page).toHaveTitle('After Login');
    const pageTittle = await page.locator('h1');
      await expect(pageTittle).toBeVisible();
      await expect(pageTittle).toHaveText('Hi, nikitas');

    const signupButton = await page.locator('#menuItem_1638551161296_4211');
      await expect(signupButton).not.toBeVisible();

    //logout
    await page.goto('https://nikitas.learnworlds.com/signout');
    await expect(page).toHaveURL('https://nikitas.learnworlds.com/');

  }); 

});