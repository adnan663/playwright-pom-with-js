const { BasePage } = require('./BasePage');

class BagPage extends BasePage {
  constructor(page) {
    super(page);
    // Screenshot_198.png - Your Bag drawer
    this.yourBagTitle = page.locator('text=Your Bag');
    this.freeShippingCongrats = page.locator('text=Congrats! You get free standard shipping');
    this.productNameInBag = page.locator('text=E27 Extra Strength Liquid Collagen');
    this.autoRefillLabel = page.locator('text=Auto-refill').first();
    this.removeLink = page.locator('text=Remove').first();
    this.giftItem = page.locator('text=Conditioning Tinted Lip Balm');
    this.estimatedTotal = page.locator('text=Estimated Total');
    this.totalValue = page.locator('text=$108.20, text=$44.10').first();
    this.paypalButton = page.locator('button:has-text("PayPal")');
    this.checkoutButton = page.locator('button:has-text("CHECKOUT")');
    this.closeBagButton = page.locator('button:has-text("×"), [aria-label="Close"]').last();
  }

  async verifyBagDrawerOpened() {
    // Screenshot_198.png verification
    await this.yourBagTitle.waitFor({ state: 'visible', timeout: 15000 });
    await this.freeShippingCongrats.waitFor({ state: 'visible', timeout: 5000 }).catch(()=>{});
    await this.productNameInBag.first().waitFor({ state: 'visible', timeout: 10000 });
    await this.estimatedTotal.waitFor({ state: 'visible' });
  }

  async getBagTotal() {
    const totalText = await this.page.locator('text=Estimated Total >> xpath=..//span | text=Estimated Total >> xpath=..').first().textContent().catch(()=>null);
    return totalText;
  }

  async proceedToCheckout() {
    await this.checkoutButton.scrollIntoViewIfNeeded();
    await this.checkoutButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.checkoutButton.click();
    await this.page.waitForTimeout(2000);
  }

  async closeBag() {
    await this.closeBagButton.click().catch(()=>{});
  }
}
module.exports = { BagPage };
