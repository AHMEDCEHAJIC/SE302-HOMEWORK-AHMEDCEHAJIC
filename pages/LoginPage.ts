import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open() {
    await this.page.goto('/login');
    await expect(this.page.getByRole('heading', { name: 'Login' })).toBeVisible();
  }

  async login(email: string, password: string) {
    await this.page.getByLabel('Email address').fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async expectNoEmailValidationError() {
    await expect(this.page.getByText('Please enter a valid email address.')).toBeHidden();
  }

  async expectInvalidEmailError() {
    await expect(this.page.getByText('Please enter a valid email address.')).toBeVisible();
  }
}
