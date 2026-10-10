const { BasePage } = require('./BasePage');
const { testData } = require('../utils/testData');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    // Screenshot_199.png - Checkout page
    this.secureCheckout = page.locator('text=SECURE CHECKOUT');
    this.addressInput = page.locator('input[placeholder="Address"], input[name*="address1"], input[name="address"]').first();
    this.aptInput = page.locator('input[placeholder="Apt/Floor/Suite"]');
    this.cityInput = page.locator('input[placeholder="City"]');
    this.stateInput = page.locator('input[placeholder="State"]');
    this.zipInput = page.locator('input[placeholder="ZIP code"], input[name*="zip"]');
    this.phoneInput = page.locator('input[placeholder="Phone"], input[type="tel"]');
    this.emailInput = page.locator('input[type="email"], input[name*="email"]').first();
    this.firstNameInput = page.locator('input[name*="first"], input[placeholder*="First"]').first();
    this.lastNameInput = page.locator('input[name*="last"], input[placeholder*="Last"]').first();
    this.shippingMethodText = page.locator('text=Shipping method');
    this.internationalShipping = page.locator('text=International (7-14 business days)');
    this.continueFinalBtn = page.locator('button:has-text("CONTINUE TO FINAL STEP")');
    this.textMeCheckbox = page.locator('input[type="checkbox"]').first();
  }

  async verifyCheckoutLoaded() {
    await this.page.waitForURL('**/checkout/**', { timeout: 20000 });
    await this.secureCheckout.waitFor({ state: 'visible', timeout: 15000 });
    await this.shippingMethodText.waitFor({ state: 'visible', timeout: 10000 });
  }

  async fillShippingDetails(data = testData.shipping) {
    // Aapne bola tha koi si bhi details dal do testing ke liye - ye dummy data hai
    await this.page.waitForTimeout(1000);
    
    // Email
    if (await this.emailInput.isVisible({ timeout: 2000 }).catch(()=>false)) {
      await this.emailInput.fill(data.email);
    }
    // First/Last
    if (await this.firstNameInput.isVisible({ timeout: 2000 }).catch(()=>false)) {
      await this.firstNameInput.fill(data.firstName);
    }
    if (await this.lastNameInput.isVisible({ timeout: 2000 }).catch(()=>false)) {
      await this.lastNameInput.fill(data.lastName);
    }
    // Address
    if (await this.addressInput.isVisible({ timeout: 2000 }).catch(()=>false)) {
      await this.addressInput.fill(data.address);
    }
    await this.aptInput.fill(data.apt).catch(()=>{});
    await this.cityInput.fill(data.city).catch(()=>{});
    await this.stateInput.fill(data.state).catch(()=>{});
    await this.zipInput.fill(data.zip).catch(()=>{});
    await this.phoneInput.fill(data.phone).catch(()=>{});

    // Optional checkbox
    // await this.textMeCheckbox.check().catch(()=>{});

    console.log('Filled checkout with:', data);
  }

  async verifyShippingMethod() {
    await this.internationalShipping.waitFor({ state: 'visible', timeout: 5000 });
  }
}
module.exports = { CheckoutPage };
