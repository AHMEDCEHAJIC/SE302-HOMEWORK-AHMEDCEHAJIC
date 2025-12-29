import { expect, type Page } from '@playwright/test';

export class BasketPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/basket');
    await expect(this.page.getByRole('heading', { name: 'Your Basket' })).toBeVisible();
  }

  async expectBasketNotEmpty() {
    await expect(this.page.locator('h4', { hasText: 'Your Basket' })).not.toHaveText(/Your Basket 0/);
  }

  async emptyBasket() {
    await this.page.getByRole('button', { name: 'Empty Basket' }).click();
  }

  async expectBasketEmptyAndTotalZero() {
    await expect(this.page.locator('h4', { hasText: 'Your Basket 0' })).toBeVisible();
    await expect(this.page.getByText('Total (GBP)£0.00')).toBeVisible();
  }

  async redeemPromo(code: string) {
    const promoInput = this.page.getByRole('textbox').first();
    await promoInput.fill(code);
    await this.page.getByRole('button', { name: 'Redeem' }).click();
  }

  async expectInvalidPromoMessage() {
    await expect(this.page.getByText('Please input a valid promo code.')).toBeVisible();
  }
}
