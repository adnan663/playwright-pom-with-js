# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-addToBag.spec.js >> Add to Bag Flow - Screenshot_196.png & 197.png & 198.png >> Add first product to bag and handle subscription modal
- Location: tests\03-addToBag.spec.js:10:3

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('button:has-text("ADD TO BAG")').first()
    - locator resolved to <button type="submit" title="Add to bag" data-product-j29="" data-color="#FF8800" data-product-id="489" data-product-set="12" data-product-collagen="1" data-sub-most-popular="1" data-product-sku="323-63450" data-product-price="49.000000" data-is-hidden-sub-options="1" data-trigger="open-add-to-cart" data-default-refill-discount="20" class="action tocart primary open-add-to-cart" data-product-discount-variants="{"10":"10","1":"10"}" data-product-name="E27 Extra Strength Liquid Collagen" data-sub-option…>…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="dialog" aria-modal="true" aria-label="POPUP Form" data-kl-scroll-locking-modal="true" class="needsclick  kl-private-reset-css-Xuajs1">…</div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="dialog" aria-modal="true" aria-label="POPUP Form" data-kl-scroll-locking-modal="true" class="needsclick  kl-private-reset-css-Xuajs1">…</div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    6 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div role="dialog" aria-modal="true" aria-label="POPUP Form" data-kl-scroll-locking-modal="true" class="needsclick  kl-private-reset-css-Xuajs1">…</div> from <div>…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 500ms
    - waiting for element to be visible, enabled and stable

```

# Test source

```ts
  1  | const { BasePage } = require('./BasePage');
  2  | 
  3  | class SkinPage extends BasePage {
  4  |   constructor(page) {
  5  |     super(page);
  6  |     // Screenshot_196.png - Skin page products
  7  |     this.productCards = page.locator('[class*="product"], [class*="ProductCard"]');
  8  |     this.addToBagButtons = page.locator('button:has-text("ADD TO BAG")');
  9  |     this.firstAddToBag = page.locator('button:has-text("ADD TO BAG")').first();
  10 |     this.mangoFlavor = page.locator('text=Mango Flavor');
  11 |     this.pineappleFlavor = page.locator('text=Pineapple Flavor');
  12 |     this.reviews = page.locator('text=reviews').first();
  13 | 
  14 |     // Screenshot_197.png - Subscription Modal
  15 |     this.subscriptionModal = page.locator('text=Single Subscription');
  16 |     this.oneTimePurchaseRadio = page.locator('text=One-Time Purchase').first();
  17 |     this.singleSubscriptionRadio = page.locator('text=Single Subscription').first();
  18 |     this.modalAddToBag44 = page.locator('button:has-text("ADD TO BAG $44")');
  19 |     this.instantSavingsText = page.locator('text=Instant 10% savings');
  20 |     this.freeShippingText = page.locator('text=Free shipping on your current');
  21 |   }
  22 | 
  23 |   async gotoSkin() {
  24 |     // Screenshot_196.png ka URL
  25 |     await this.goto('/skin');
  26 |     await this.closePopups();
  27 |     await this.page.waitForTimeout(2000);
  28 |   }
  29 | 
  30 |   async verifySkinPageLoaded() {
  31 |     await this.page.locator('text=SpoiledChild').first().waitFor();
  32 |     await this.firstAddToBag.waitFor({ state: 'visible', timeout: 10000 });
  33 |   }
  34 | 
  35 |   async addFirstProductToBag() {
  36 |     // Screenshot_196.png me orange button ADD TO BAG | $49
  37 |     await this.firstAddToBag.scrollIntoViewIfNeeded();
> 38 |     await this.firstAddToBag.click();
     |                              ^ Error: locator.click: Target page, context or browser has been closed
  39 |     await this.page.waitForTimeout(1000);
  40 |   }
  41 | 
  42 |   async addSecondProductToBag() {
  43 |     const secondBtn = this.addToBagButtons.nth(1);
  44 |     if (await secondBtn.isVisible()) {
  45 |       await secondBtn.click();
  46 |     }
  47 |   }
  48 | 
  49 |   async handleSubscriptionModal() {
  50 |     // Screenshot_197.png wala popup
  51 |     await this.subscriptionModal.waitFor({ state: 'visible', timeout: 15000 });
  52 |     await this.page.waitForTimeout(500);
  53 |     // Single Subscription | $44 now select hai - check karo
  54 |     const radio = this.page.locator('input[type="radio"]').nth(1);
  55 |     if (await radio.isVisible().catch(()=>false)) {
  56 |       await radio.check().catch(()=>{});
  57 |     }
  58 |     // Text verifications from Screenshot_197.png
  59 |     await this.instantSavingsText.waitFor({ state: 'visible', timeout: 5000 }).catch(()=>{});
  60 |     await this.freeShippingText.waitFor({ state: 'visible' }).catch(()=>{});
  61 | 
  62 |     await this.modalAddToBag44.waitFor({ state: 'visible', timeout: 10000 });
  63 |     await this.modalAddToBag44.click();
  64 |     await this.page.waitForTimeout(3000);
  65 |   }
  66 | }
  67 | module.exports = { SkinPage };
  68 | 
```