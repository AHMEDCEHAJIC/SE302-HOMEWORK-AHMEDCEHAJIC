import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://sweetshop.netlify.app',
    headless: true
  },
  reporter: [['html', { open: 'never' }]]
});
