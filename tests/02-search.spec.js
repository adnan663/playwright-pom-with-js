const { test } = require('../fixtures/baseTest');
const { expect } = require('@playwright/test');

test.describe('Search & Popular Searches - Screenshot_200.png', () => {
  test.beforeEach(async ({ skinPage }) => {
    await skinPage.gotoSkin();
  });

  test('Verify Popular Searches chips are visible', async ({ searchComponent }) => {
    await searchComponent.openSearchDrawer();
    await searchComponent.verifyPopularSearchesVisible();
  });

  test('Click on Popular Search Collagen', async ({ searchComponent, page }) => {
    await searchComponent.openSearchDrawer();
    await searchComponent.clickPopularSearch('Collagen');
    await expect(page).toHaveURL(/.*collagen|.*search|.*skin/, { timeout: 10000 });
  });

  test('Search for products E27', async ({ searchComponent, skinPage }) => {
    await searchComponent.searchForProduct('E27 Extra Strength Liquid Collagen');
    await page.waitForTimeout(1000);
  });
});
