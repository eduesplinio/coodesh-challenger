import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';

test.describe('Random Product Selection', () => {
  test('should add a random product from men catalog to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    
    await homePage.goto();
    
    await page.locator('div.navigation a:has-text("Men")').first().click();
    await page.waitForLoadState('networkidle');
    
    const products = page.locator('.product-item a.product-item-link');
    const productCount = await products.count();
    expect(productCount).toBeGreaterThan(0);
    
    const randomIndex = Math.floor(Math.random() * productCount);
    await products.nth(randomIndex).click();
    
    await page.waitForLoadState('networkidle');
    
    const hasSizes = await page.locator('.swatch-option').count() > 0;
    if (hasSizes) {
      await productPage.selectRandomSize();
      const hasColors = await page.locator('.swatch-option').count() > 5;
      if (hasColors) {
        await productPage.selectRandomColor();
      }
    }
    
    await productPage.addToCart();
    
    const cartCount = await cartPage.getCartCount();
    expect(cartCount).toBeGreaterThan(0);
  });
});
