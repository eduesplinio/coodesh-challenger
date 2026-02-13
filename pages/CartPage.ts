import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartCounter: Locator;
  readonly cartItems: Locator;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('#menu-cart-icon');
    this.cartCounter = page.locator('#menu-cart-icon span[x-text="summaryCount"]');
    this.cartItems = page.locator('.cart-item');
    this.proceedToCheckoutButton = page.locator('[title="Proceed to Checkout"]');
  }

  async goto() {
    await this.page.goto('/checkout/cart');
    await this.page.waitForLoadState('networkidle');
  }

  async getCartCount(): Promise<number> {
    await this.cartCounter.waitFor({ state: 'visible', timeout: 10000 });
    const text = await this.cartCounter.textContent();
    return parseInt(text || '0');
  }

  async hasItems(): Promise<boolean> {
    try {
      await this.page.waitForSelector('.cart.item', { timeout: 5000 });
      const items = await this.page.locator('.cart.item').count();
      return items > 0;
    } catch {
      return false;
    }
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.waitFor({ state: 'visible' });
    await this.proceedToCheckoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCartItemDetails() {
    const items = await this.cartItems.all();
    const details = [];
    
    for (const item of items) {
      const name = await item.locator('.product-item-name').textContent();
      const price = await item.locator('.price').textContent();
      details.push({ name: name?.trim(), price: price?.trim() });
    }
    
    return details;
  }
}
