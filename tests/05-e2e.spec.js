const { test } = require('../fixtures/baseTest');
const { expect } = require('@playwright/test');
const { testData } = require('../utils/testData');

test.describe('Full E2E Journey - All Screenshots Combined', () => {
  test('E2E: Login > Skin > Popular Searches > Search > Add to Bag > Checkout > Dummy Details', async ({ 
    page, loginPage, skinPage, searchComponent, bagPage, checkoutPage 
  }) => {
    // Step 1: Login URL - aapne diya tha https://www.spoiledchild.com/customer/account/login/
    await loginPage.gotoLogin();
    await loginPage.loginWithDummy();

    // Step 2: Skin Page - Screenshot_196.png
    await skinPage.gotoSkin();
    await skinPage.verifySkinPageLoaded();
    await expect(page.locator('text=E27 Extra Strength Liquid Collagen').first()).toBeVisible();

    // Step 3: Popular Searches & Search - Screenshot_200.png
    await searchComponent.openSearchDrawer();
    await searchComponent.verifyPopularSearchesVisible();
    // Collagen chip click
    await searchComponent.clickPopularSearch('Collagen');
    await page.waitForTimeout(2000);
    await skinPage.gotoSkin();

    // Search for product
    await searchComponent.searchForProduct(testData.products.collagen);
    await skinPage.gotoSkin();

    // Step 4: Add to Bag - Screenshot_196.png
    await skinPage.addFirstProductToBag();

    // Step 5: Subscription Modal - Screenshot_197.png - Single Subscription $44 now
    await skinPage.handleSubscriptionModal();

    // Step 6: Your Bag Drawer - Screenshot_198.png
    await bagPage.verifyBagDrawerOpened();
    await expect(bagPage.estimatedTotal).toBeVisible();
    // Checkout karo - phir karo checkout ko aapne bola tha
    await bagPage.proceedToCheckout();

    // Step 7: Checkout Details - Screenshot_199.png - Apt/Floor/Suite, City, State, ZIP, Phone
    await checkoutPage.verifyCheckoutLoaded();
    await checkoutPage.fillShippingDetails(); // koi si bhi details testing ke liye
    await checkoutPage.verifyShippingMethod();

    console.log('E2E completed successfully with dummy testing data');
  });
});
