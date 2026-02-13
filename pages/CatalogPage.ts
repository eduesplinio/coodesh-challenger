import { Page, Locator } from '@playwright/test';

export class CatalogPage {
  readonly page: Page;
  readonly productItems: Locator;
  readonly productLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productItems = page.locator('.product-item');
    this.productLinks = page.locator('.product-item a.product-item-link');
  }

  async getProductCount() {
    return await this.productLinks.count();
  }

  async selectProduct(index: number) {
    await this.productLinks.nth(index).click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectFirstProduct() {
    await this.productLinks.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async selectRandomProduct() {
    const count = await this.getProductCount();
    if (count === 0) {
      throw new Error('No products found in catalog');
    }
    const randomIndex = Math.floor(Math.random() * count);
    await this.selectProduct(randomIndex);
    return randomIndex;
  }

  async hasProducts() {
    return await this.productItems.first().isVisible();
  }
}
