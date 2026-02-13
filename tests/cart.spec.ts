import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Shopping Cart', () => {
  test('should add a product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    
    await homePage.goto();
    await homePage.search('shirt');
    
    await expect(page).toHaveURL(/catalogsearch\/result/);
    
    const firstProduct = page.locator('.product-item a').first();
    await firstProduct.click();
    
    await page.waitForLoadState('networkidle');
    
    await productPage.selectSize(0);
    await productPage.selectColor(0);
    
    await productPage.addToCart();
    
    await page.waitForLoadState('domcontentloaded');
    const cartCountAfter = await cartPage.getCartCount();
    expect(cartCountAfter).toBeGreaterThan(0);
    
    await cartPage.goto();
    const hasItems = await cartPage.hasItems();
    expect(hasItems).toBeTruthy();
  });
});
