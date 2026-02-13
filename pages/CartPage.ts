import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartIcon: Locator;
  readonly cartCounter: Locator;
  readonly cartItems: Locator;
  readonly proceedToCheckoutButton: Locator;
  readonly miniCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartIcon = page.locator('.showcart');
    this.cartCounter = page.locator('.counter-number');
    this.cartItems = page.locator('.product-item');
    this.proceedToCheckoutButton = page.locator('#top-cart-btn-checkout');
    this.miniCart = page.locator('#ui-id-1');
  }

  async openCart() {
    await this.cartIcon.click();
    await this.miniCart.waitFor({ state: 'visible' });
  }

  async getCartCount() {
    const text = await this.cartCounter.textContent();
    return parseInt(text || '0');
  }

  async hasItems() {
    await this.openCart();
    return await this.cartItems.count() > 0;
  }

  async proceedToCheckout() {
    await this.openCart();
    await this.proceedToCheckoutButton.click();
  }
}
