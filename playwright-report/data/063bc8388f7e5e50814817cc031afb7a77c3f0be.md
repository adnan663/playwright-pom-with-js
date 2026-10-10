# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 03-addToBag.spec.js >> Add to Bag Flow - Screenshot_196.png & 197.png & 198.png >> Add two products and verify bag total
- Location: tests\03-addToBag.spec.js:20:3

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://www.spoiledchild.com/skin", waiting until "load"

```

# Test source

```ts
  1  | class BasePage {
  2  |   constructor(page) {
  3  |     this.page = page;
  4  |   }
  5  |   async goto(path) {
> 6  |     await this.page.goto(path);
     |                     ^ Error: page.goto: Target page, context or browser has been closed
  7  |     await this.page.waitForLoadState('domcontentloaded');
  8  |     await this.page.waitForTimeout(1500);
  9  |   }
  10 |   async closePopups() {
  11 |     try {
  12 |       const closeBtns = [
  13 |         'button:has-text("×")',
  14 |         'button[aria-label="Close"]',
  15 |         'div[class*="close"] >> button',
  16 |         'text=FREE TRIAL >> xpath=..//button'
  17 |       ];
  18 |       for (const sel of closeBtns) {
  19 |         const el = this.page.locator(sel).first();
  20 |         if (await el.isVisible({ timeout: 1000 }).catch(()=>false)) {
  21 |           await el.click({ timeout: 1000 }).catch(()=>{});
  22 |         }
  23 |       }
  24 |     } catch (e) {}
  25 |   }
  26 |   async waitForNetworkIdle() {
  27 |     await this.page.waitForLoadState('networkidle').catch(()=>{});
  28 |   }
  29 | }
  30 | module.exports = { BasePage };
  31 | 
```