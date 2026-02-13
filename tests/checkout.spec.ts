import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Checkout', () => {
  test('should navigate to checkout page', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    await homePage.search('shirt');
    
    await expect(page).toHaveURL(/catalogsearch\/result/);
    
    const firstProduct = page.locator('.product-item a').first();
    await firstProduct.click();
    
    await page.waitForLoadState('networkidle');
    
    await productPage.selectSize(0);
    await page.waitForTimeout(300);
    await productPage.selectColor(0);
    await page.waitForTimeout(300);
    
    await productPage.addToCart();
    
    const cartCounter = page.locator('#menu-cart-icon span[x-text="summaryCount"]');
    await expect(cartCounter).toBeVisible({ timeout: 10000 });
    
    await page.goto('https://demo.hyva.io/checkout/cart');
    
    const checkoutButton = page.locator('[title="Proceed to Checkout"]');
    await checkoutButton.click();
    
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(/checkout/);
    
    const emailInput = page.locator('[name="email"]');
    await expect(emailInput).toBeVisible();
  });
});
