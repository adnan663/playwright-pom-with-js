class BasePage {
  constructor(page) {
    this.page = page;
  }
  async goto(path) {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1500);
  }
  async closePopups() {
    try {
      const closeBtns = [
        'button:has-text("×")',
        'button[aria-label="Close"]',
        'div[class*="close"] >> button',
        'text=FREE TRIAL >> xpath=..//button'
      ];
      for (const sel of closeBtns) {
        const el = this.page.locator(sel).first();
        if (await el.isVisible({ timeout: 1000 }).catch(()=>false)) {
          await el.click({ timeout: 1000 }).catch(()=>{});
        }
      }
    } catch (e) {}
  }
  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle').catch(()=>{});
  }
}
module.exports = { BasePage };
