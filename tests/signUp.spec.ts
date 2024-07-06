import { test } from '@playwright/test';
import { SignUpPage } from '../page-objects/SignUpPage';
import { StartPage } from '../page-objects/StartPage';

test.describe.parallel('SignUp tests', () => {
    let signUpPage: SignUpPage;    
    let startPage: StartPage;

    test.beforeEach(async ({ page }) => {
        signUpPage = new SignUpPage(page);
        //go to the page and access the signup form
        await signUpPage.visit();
        await signUpPage.clickSignUpButton();
    });

    test('Sign up without credentials', async ({ page }) => {    
        //click on the sign up form and submit the form without credentials
        await signUpPage.signUp('', '', '');
        //assert that the error messages are displayed
        await signUpPage.assertEmptyFormErrorMessages();
    });

    test('Sign up with wrong password credentials', async ({ page }) => {
        //click on the sign up form and fill the fields with wrong credentials
        await signUpPage.signUp('RealUser', 'email@email.com', 'fakePassword');     
        //assert that the error message is displayed
        await signUpPage.assertPasswordError();
    }); 

    test('Sign up with existing email', async ({ page }) => {
        //click on the sign up form and fill the fields with wrong credentials
        await signUpPage.signUp('RealUser', 'menounosnikitas@gmail.com', 'R3@lPassw0rd'); 
        //assert that the error message is displayed
        await signUpPage.assertEmailExistsErrorMessage();
    }); 

    //After the test the account is created and the email is already in use so the test will fail
    test('Sign up with correct credentials', async ({ page }) => {
        startPage = new StartPage(page);
        //create a unique fake email for the test
        const timestamp = Date.now();
        const email = `tl20412+${timestamp}@edu.hmu.gr`;

        //click on the sign up form and fill the fields with correct credentials
        await signUpPage.signUp('RealUsername', email, 'R3@lPassw0rd');
        
        //assert that the user is logged in and the correct page is displayed
        await startPage.assertStartPage('RealUsername');
    }); 
});