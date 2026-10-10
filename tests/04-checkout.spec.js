const { test } = require('../fixtures/baseTest');
const { expect } = require('@playwright/test');

test.describe('Checkout Flow - Screenshot_199.png', () => {
  test('Proceed to checkout and fill dummy details', async ({ skinPage, bagPage, checkoutPage }) => {
    await skinPage.gotoSkin();
    await skinPage.addFirstProductToBag();
    await skinPage.handleSubscriptionModal();
    await bagPage.verifyBagDrawerOpened();
    await bagPage.proceedToCheckout();

    // Screenshot_199.png verification
    await checkoutPage.verifyCheckoutLoaded();
    await checkoutPage.fillShippingDetails();
    await checkoutPage.verifyShippingMethod();

    await expect(checkoutPage.internationalShipping).toBeVisible();
    await expect(checkoutPage.secureCheckout).toBeVisible();
  });
});
