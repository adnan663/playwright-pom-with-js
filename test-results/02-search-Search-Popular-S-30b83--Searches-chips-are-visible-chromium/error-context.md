# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 02-search.spec.js >> Search & Popular Searches - Screenshot_200.png >> Verify Popular Searches chips are visible
- Location: tests\02-search.spec.js:9:3

# Error details

```
Error: locator.click: Target page, context or browser has been closed
```

# Test source

```ts
  1  | const { BasePage } = require('./BasePage');
  2  | 
  3  | class SearchComponent extends BasePage {
  4  |   constructor(page) {
  5  |     super(page);
  6  |     // Header search icon - Screenshot_200.png me top par hai
  7  |     this.searchIcon = page.locator('header button:has-text("Search"), header [aria-label="Search"], header svg.loupe, header >> svg').first();
  8  |     this.searchInput = page.locator('input[type="search"], input[name="q"], input[placeholder*="Search"]');
  9  |     this.popularSearchTitle = page.locator('text=Popular Searches');
  10 |     this.spoiledBrainSection = page.locator('text=Find exactly what you need');
  11 |     this.justAskBtn = page.locator('button:has-text("Just Ask SpoiledBrain")');
  12 |     this.popularProductsTitle = page.locator('text=Popular Products');
  13 |   }
  14 | 
  15 |   async openSearchDrawer() {
  16 |     // Screenshot_200.png - search open hota hai
  17 |     const icon = this.page.locator('header').locator('button').first();
  18 |     await icon.click().catch(async () => {
> 19 |       await this.page.locator('header svg').first().click();
     |                                                     ^ Error: locator.click: Target page, context or browser has been closed
  20 |     });
  21 |     await this.page.waitForTimeout(1500);
  22 |     await this.popularSearchTitle.waitFor({ state: 'visible', timeout: 5000 }).catch(()=>{});
  23 |   }
  24 | 
  25 |   async getPopularSearches() {
  26 |     // Screenshot_200.png me ye chips hain
  27 |     return ['Anti-Aging', 'Hair Loss', 'Collagen', 'Wrinkles', 'Hair Growth', 'Damaged Hair', 'Brittle Nails'];
  28 |   }
  29 | 
  30 |   async verifyPopularSearchesVisible() {
  31 |     const chips = await this.getPopularSearches();
  32 |     for (const chip of chips) {
  33 |       const locator = this.page.locator(`button:has-text("${chip}")`).first();
  34 |       await locator.waitFor({ state: 'visible', timeout: 5000 });
  35 |     }
  36 |     await this.spoiledBrainSection.waitFor({ state: 'visible' }).catch(()=>{});
  37 |     await this.justAskBtn.waitFor({ state: 'visible' }).catch(()=>{});
  38 |   }
  39 | 
  40 |   async clickPopularSearch(term) {
  41 |     const chip = this.page.locator(`button:has-text("${term}")`).first();
  42 |     await chip.scrollIntoViewIfNeeded();
  43 |     await chip.click();
  44 |     await this.waitForNetworkIdle();
  45 |   }
  46 | 
  47 |   async searchForProduct(productName) {
  48 |     await this.openSearchDrawer();
  49 |     const input = this.page.locator('input[type="search"], input[name="q"]').first();
  50 |     if (await input.isVisible({ timeout: 3000 }).catch(()=>false)) {
  51 |       await input.fill(productName);
  52 |       await this.page.keyboard.press('Enter');
  53 |       await this.waitForNetworkIdle();
  54 |     } else {
  55 |       // Direct URL search fallback
  56 |       await this.page.goto(`/search?q=${encodeURIComponent(productName)}`);
  57 |     }
  58 |   }
  59 | }
  60 | module.exports = { SearchComponent };
  61 | 
```