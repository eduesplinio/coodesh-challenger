import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page', () => {
  test('should load home page correctly', async ({ page }) => {
    const homePage = new HomePage(page);
    
    const startTime = Date.now();
    await homePage.goto();
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(10000);
    
    await expect(page).toHaveTitle(/Home/i);
    await expect(homePage.navigationMenu).toBeVisible();
    
    const searchIcon = page.locator('#menu-search-icon');
    await expect(searchIcon).toBeVisible();
    
    const categories = page.locator('div.navigation a');
    const categoryCount = await categories.count();
    expect(categoryCount).toBeGreaterThan(0);
  });
});
