import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {
  test('should load home page correctly', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    
    await expect(page).toHaveTitle(/Home/i);
    await expect(homePage.navigationMenu).toBeVisible();
  });
});
