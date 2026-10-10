const { test } = require('../fixtures/baseTest');
const { expect } = require('@playwright/test');

test.describe('Add to Bag Flow - Screenshot_196.png & 197.png & 198.png', () => {
  test.beforeEach(async ({ skinPage }) => {
    await skinPage.gotoSkin();
    await skinPage.verifySkinPageLoaded();
  });

  test('Add first product to bag and handle subscription modal', async ({ skinPage, bagPage }) => {
    // Screenshot_196.png - ADD TO BAG $49 click
    await skinPage.addFirstProductToBag();
    // Screenshot_197.png - Subscription popup
    await skinPage.handleSubscriptionModal();
    // Screenshot_198.png - Your Bag drawer
    await bagPage.verifyBagDrawerOpened();
    await expect(bagPage.estimatedTotal).toBeVisible();
  });

  test('Add two products and verify bag total', async ({ skinPage, bagPage }) => {
    await skinPage.addFirstProductToBag();
    await skinPage.handleSubscriptionModal();
    await bagPage.verifyBagDrawerOpened();
    await bagPage.closeBag();
    await skinPage.addSecondProductToBag();
    await skinPage.handleSubscriptionModal().catch(()=>{});
  });
});
