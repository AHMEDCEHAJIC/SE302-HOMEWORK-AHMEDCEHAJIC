import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SweetsPage } from '../pages/SweetsPage';
import { BasketPage } from '../pages/BasketPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('SE302 Homework02 - Sweet Shop (5 tests)', () => {
  test('TC-10 Navigation Between Main Pages', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.goToSweets();
    await home.goToLogin();
    await home.goToBasket();
  });

  test('TC-02 Add Product to Basket (Positive)', async ({ page }) => {
    const sweets = new SweetsPage(page);
    const basket = new BasketPage(page);

    await sweets.open();
    await sweets.addFirstProductToBasket();
    await sweets.openBasketFromNav();

    await basket.expectNotEmpty();
  });

  test('TC-03 Empty Basket Clears All Items', async ({ page }) => {
    const sweets = new SweetsPage(page);
    const basket = new BasketPage(page);

    await sweets.open();
    await sweets.addFirstProductToBasket();
    await sweets.openBasketFromNav();

    await basket.emptyBasket();
    await basket.expectEmptyAndTotalZero();
  });

  test('TC-04 Invalid Promo Code (Negative)', async ({ page }) => {
    const basket = new BasketPage(page);
    await basket.open();
    await basket.redeemPromo('NOT-A-REAL-CODE');
    await basket.expectInvalidPromoMessage();
  });

  test('TC-06 Login with Valid Credentials Format', async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.submit('test@user.com', 'qwerty');
    await login.expectValidInputState();
    await expect(page).toHaveURL(/\/login$/);
  });
});

