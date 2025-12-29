import { expect, type Page } from '@playwright/test';

export class HomePage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: 'Welcome to the sweet shop!' })).toBeVisible();
  }

  async goToSweets() {
    await this.page.getByRole('link', { name: 'Sweets' }).click();
    await expect(this.page).toHaveURL(/\/sweets$/);
  }

  async goToLogin() {
    await this.page.getByRole('link', { name: 'Login' }).click();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async goToBasket() {
    await this.page.getByRole('link', { name: /Basket/ }).click();
    await expect(this.page).toHaveURL(/\/basket$/);
  }
}
