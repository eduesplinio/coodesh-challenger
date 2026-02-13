import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages';

test.describe('Product Search', () => {
  test('should search for "shirt" and display results', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.search('shirt');

    await expect(page).toHaveURL(/catalogsearch\/result/);

    const searchTerm = page.locator('.page-title');
    await expect(searchTerm).toContainText('shirt', { ignoreCase: true });

    const products = page.locator('.product-item');
    await expect(products.first()).toBeVisible();

    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);

    const firstProduct = products.first();
    await expect(firstProduct.locator('a').first()).toBeVisible();
    await expect(firstProduct.locator('.price')).toBeVisible();
    await expect(firstProduct.locator('img')).toBeVisible();
  });
});
