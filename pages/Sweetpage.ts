import { expect, type Page } from '@playwright/test';

export class SweetsPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/sweets');
    await expect(this.page.getByRole('heading', { name: 'Browse sweets' })).toBeVisible();
  }

  async addFirstProductToBasket() {
    const addButtons = this.page.getByRole('button', { name: 'Add to Basket' });
    await expect(addButtons.first()).toBeVisible();
    await addButtons.first().click();
  }

  async openBasketFromNav() {
    await this.page.getByRole('link', { name: /Basket/ }).click();
    await expect(this.page).toHaveURL(/\/basket$/);
  }
}
