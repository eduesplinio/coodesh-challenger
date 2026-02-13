import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { TestDataGenerator } from '../utils/test-data';

test.describe('Checkout', () => {
  test('should complete checkout flow', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    await homePage.goto();
    await homePage.search('shirt');
    
    await expect(page).toHaveURL(/catalogsearch\/result/);
    
    const firstProduct = page.locator('.product-item a').first();
    await firstProduct.click();
    
    await page.waitForLoadState('networkidle');
    
    await productPage.selectSize(0);
    await productPage.selectColor(0);
    
    await productPage.addToCart();
    
    const cartCount = await cartPage.getCartCount();
    expect(cartCount).toBeGreaterThan(0);
    
    await cartPage.goto();
    await cartPage.proceedToCheckout();
    
    await expect(page).toHaveURL(/checkout/);
    
    const addressData = await TestDataGenerator.generateAddressData();
    
    await checkoutPage.fillShippingAddress({
      email: `test${Date.now()}@test.com`,
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      zip: addressData.zip,
      country: addressData.country,
      phone: addressData.phone
    });
    
    await checkoutPage.selectShippingMethod();
    
    await expect(checkoutPage.placeOrderButton).toBeVisible();
  });
});
