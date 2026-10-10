const { test: baseTest } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { SkinPage } = require('../pages/SkinPage');
const { BagPage } = require('../pages/BagPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { SearchComponent } = require('../pages/SearchComponent');

const test = baseTest.extend({
  loginPage: async ({ page }, use) => { await use(new LoginPage(page)); },
  skinPage: async ({ page }, use) => { await use(new SkinPage(page)); },
  bagPage: async ({ page }, use) => { await use(new BagPage(page)); },
  checkoutPage: async ({ page }, use) => { await use(new CheckoutPage(page)); },
  searchComponent: async ({ page }, use) => { await use(new SearchComponent(page)); },
});

module.exports = { test };
