const { test } = require('../fixtures/baseTest');
const { expect } = require('@playwright/test');

test.describe('Login Page Tests - https://www.spoiledchild.com/customer/account/login/', () => {
  test('Verify login page loads and fill dummy credentials', async ({ loginPage, page }) => {
    await loginPage.gotoLogin();
    await expect(page).toHaveURL(/.*login/);
    await loginPage.loginWithDummy();
    await expect(loginPage.emailInput).not.toBeEmpty();
  });
});
