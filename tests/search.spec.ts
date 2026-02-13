import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Product Search', () => {
  test('should search for "shirt" and display results', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.search('shirt');
    
    await expect(page).toHaveURL(/catalogsearch\/result/);
    
    const products = page.locator('.product-item');
    await expect(products.first()).toBeVisible();
    
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);
  });
});
