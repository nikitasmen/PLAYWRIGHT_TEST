import { test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { SignInPage } from '../page-objects/SignInPage';
import { StartPage } from '../page-objects/StartPage';

test.describe.parallel('SignIn / Logout tests', () => {
  let homePage: HomePage;
  let signInPage: SignInPage;
  let startPage: StartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signInPage = new SignInPage(page);
    //go to the page
    await homePage.visit();
    //click on the signup form and then on the sign in form
    await homePage.clickSignInButton();
  }); 

  test('Sign in with wrong credentials', async ({ page }) => {
    //attemp to login with wrong credentials 
    await signInPage.login('fakemail' , 'fakepassword');
    //assert that the login failed
    await signInPage.assertFailedLogin(); 
  });

  test('Sign in with correct credentials and Logout', async ({ page }) => {  
    startPage = new StartPage(page);
    //fill the email and password fields with correct credentials and submit 
    await signInPage.login('menounosnikitas@gmail.com', '0raiw$AE'); 
    //assert that the user is logged in and the correct page is displayed
    await startPage.assertStartPage('nikitas');
    //logout
    await startPage.logout();
    //assert url is correct
    await homePage.assertHomePage();

  }); 

});