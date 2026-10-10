# SpoiledChild - Complete POM Framework - Playwright JS

## Aapke diye hue flow ke hisaab se bana hai:

### URLs & Screenshots Covered:
1. https://www.spoiledchild.com/customer/account/login/ - Login Page
2. https://www.spoiledchild.com/skin - Skin Products Page (Screenshot_196.png - E27 Extra Strength Liquid Collagen $49)
3. Subscription Modal (Screenshot_197.png - Single Subscription $44 now, Instant 10% savings, Free shipping)
4. Your Bag Drawer (Screenshot_198.png - E27 $44.10, Gift, Estimated Total $108.20, CHECKOUT)
5. Checkout Page (Screenshot_199.png - Apt/Floor/Suite, City, State, ZIP, Phone, Shipping method International 7-14 days)
6. Search & Popular Searches (Screenshot_200.png - Anti-Aging, Hair Loss, Collagen, Wrinkles, Hair Growth, Damaged Hair, Brittle Nails, Find exactly what you need)

### Project Structure:
```
pages/
  BasePage.js - common methods (closePopups etc)
  LoginPage.js
  SkinPage.js
  BagPage.js
  CheckoutPage.js
  SearchComponent.js - Popular Searches + Search
tests/
  01-login.spec.js
  02-search.spec.js - Popular Searches test
  03-addToBag.spec.js
  04-checkout.spec.js
  05-e2e.spec.js - Full E2E combining all
utils/
  testData.js - dummy data for testing (aapne bola koi si bhi daal do)
fixtures/
  baseTest.js - POM fixtures
```

### Commands:
- npm install
- npx playwright install
- npm test  -> sab chal jayega
- npm run test:ui -> UI mode
- npx playwright test tests/05-e2e.spec.js --headed -> sirf E2E

### Test Data:
Dummy details aapki requirement ke hisaab se daale hain - Houston, Texas etc. Change kar sakte ho utils/testData.js me.
