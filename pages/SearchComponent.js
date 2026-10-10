const { BasePage } = require('./BasePage');

class SearchComponent extends BasePage {
  constructor(page) {
    super(page);
    // Header search icon - Screenshot_200.png me top par hai
    this.searchIcon = page.locator('header button:has-text("Search"), header [aria-label="Search"], header svg.loupe, header >> svg').first();
    this.searchInput = page.locator('input[type="search"], input[name="q"], input[placeholder*="Search"]');
    this.popularSearchTitle = page.locator('text=Popular Searches');
    this.spoiledBrainSection = page.locator('text=Find exactly what you need');
    this.justAskBtn = page.locator('button:has-text("Just Ask SpoiledBrain")');
    this.popularProductsTitle = page.locator('text=Popular Products');
  }

  async openSearchDrawer() {
    // Screenshot_200.png - search open hota hai
    const icon = this.page.locator('header').locator('button').first();
    await icon.click().catch(async () => {
      await this.page.locator('header svg').first().click();
    });
    await this.page.waitForTimeout(1500);
    await this.popularSearchTitle.waitFor({ state: 'visible', timeout: 5000 }).catch(()=>{});
  }

  async getPopularSearches() {
    // Screenshot_200.png me ye chips hain
    return ['Anti-Aging', 'Hair Loss', 'Collagen', 'Wrinkles', 'Hair Growth', 'Damaged Hair', 'Brittle Nails'];
  }

  async verifyPopularSearchesVisible() {
    const chips = await this.getPopularSearches();
    for (const chip of chips) {
      const locator = this.page.locator(`button:has-text("${chip}")`).first();
      await locator.waitFor({ state: 'visible', timeout: 5000 });
    }
    await this.spoiledBrainSection.waitFor({ state: 'visible' }).catch(()=>{});
    await this.justAskBtn.waitFor({ state: 'visible' }).catch(()=>{});
  }

  async clickPopularSearch(term) {
    const chip = this.page.locator(`button:has-text("${term}")`).first();
    await chip.scrollIntoViewIfNeeded();
    await chip.click();
    await this.waitForNetworkIdle();
  }

  async searchForProduct(productName) {
    await this.openSearchDrawer();
    const input = this.page.locator('input[type="search"], input[name="q"]').first();
    if (await input.isVisible({ timeout: 3000 }).catch(()=>false)) {
      await input.fill(productName);
      await this.page.keyboard.press('Enter');
      await this.waitForNetworkIdle();
    } else {
      // Direct URL search fallback
      await this.page.goto(`/search?q=${encodeURIComponent(productName)}`);
    }
  }
}
module.exports = { SearchComponent };
