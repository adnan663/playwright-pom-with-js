const { BasePage } = require('./BasePage');
const { testData } = require('../utils/testData');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.locator('input[type="email"], input[name*="email"], input[placeholder*="Email"]').first();
    this.passwordInput = page.locator('input[type="password"]').first();
    this.signInBtn = page.locator('button:has-text("Sign In"), button:has-text("LOG IN"), button[type="submit"]').first();
    this.errorMsg = page.locator('text=Invalid, text=incorrect, [class*="error"]').first();
  }

  async gotoLogin() {
    await this.goto('/customer/account/login/');
  }

  async login(email, password) {
    await this.emailInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInBtn.click();
    await this.waitForNetworkIdle();
  }

  async loginWithDummy() {
    // Screenshot flow me login URL diya tha aapne - https://www.spoiledchild.com/customer/account/login/
    // Testing ke liye dummy data
    await this.emailInput.fill(testData.user.email);
    await this.passwordInput.fill(testData.user.password);
    console.log('Filled dummy login data:', testData.user.email);
    // Real submit nahi kar rahe taki account lock na ho
    // await this.signInBtn.click();
  }
}
module.exports = { LoginPage };
