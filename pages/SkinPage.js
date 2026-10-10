const { BasePage } = require('./BasePage');

class SkinPage extends BasePage {
  constructor(page) {
    super(page);
    // Screenshot_196.png - Skin page products
    this.productCards = page.locator('[class*="product"], [class*="ProductCard"]');
    this.addToBagButtons = page.locator('button:has-text("ADD TO BAG")');
    this.firstAddToBag = page.locator('button:has-text("ADD TO BAG")').first();
    this.mangoFlavor = page.locator('text=Mango Flavor');
    this.pineappleFlavor = page.locator('text=Pineapple Flavor');
    this.reviews = page.locator('text=reviews').first();

    // Screenshot_197.png - Subscription Modal
    this.subscriptionModal = page.locator('text=Single Subscription');
    this.oneTimePurchaseRadio = page.locator('text=One-Time Purchase').first();
    this.singleSubscriptionRadio = page.locator('text=Single Subscription').first();
    this.modalAddToBag44 = page.locator('button:has-text("ADD TO BAG $44")');
    this.instantSavingsText = page.locator('text=Instant 10% savings');
    this.freeShippingText = page.locator('text=Free shipping on your current');
  }

  async gotoSkin() {
    // Screenshot_196.png ka URL
    await this.goto('/skin');
    await this.closePopups();
    await this.page.waitForTimeout(2000);
  }

  async verifySkinPageLoaded() {
    await this.page.locator('text=SpoiledChild').first().waitFor();
    await this.firstAddToBag.waitFor({ state: 'visible', timeout: 10000 });
  }

  async addFirstProductToBag() {
    // Screenshot_196.png me orange button ADD TO BAG | $49
    await this.firstAddToBag.scrollIntoViewIfNeeded();
    await this.firstAddToBag.click();
    await this.page.waitForTimeout(1000);
  }

  async addSecondProductToBag() {
    const secondBtn = this.addToBagButtons.nth(1);
    if (await secondBtn.isVisible()) {
      await secondBtn.click();
    }
  }

  async handleSubscriptionModal() {
    // Screenshot_197.png wala popup
    await this.subscriptionModal.waitFor({ state: 'visible', timeout: 15000 });
    await this.page.waitForTimeout(500);
    // Single Subscription | $44 now select hai - check karo
    const radio = this.page.locator('input[type="radio"]').nth(1);
    if (await radio.isVisible().catch(()=>false)) {
      await radio.check().catch(()=>{});
    }
    // Text verifications from Screenshot_197.png
    await this.instantSavingsText.waitFor({ state: 'visible', timeout: 5000 }).catch(()=>{});
    await this.freeShippingText.waitFor({ state: 'visible' }).catch(()=>{});

    await this.modalAddToBag44.waitFor({ state: 'visible', timeout: 10000 });
    await this.modalAddToBag44.click();
    await this.page.waitForTimeout(3000);
  }
}
module.exports = { SkinPage };
