import { Page, Locator } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly sizeOptions: Locator;
  readonly colorOptions: Locator;
  readonly addToCartButton: Locator;
  readonly successMessage: Locator;
  readonly reviewSection: Locator;
  readonly addReviewButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('.page-title');
    this.sizeOptions = page.locator('.swatch-option');
    this.colorOptions = page.locator('.swatch-option');
    this.addToCartButton = page.locator('#product-addtocart-button');
    this.successMessage = page.locator('[role="alert"]');
    this.reviewSection = page.locator('#reviews');
    this.addReviewButton = page.locator('.action.add');
  }

  async selectSize(index: number = 0) {
    const allSwatches = await this.page.locator('.swatch-option').all();
    if (allSwatches.length > index) {
      await allSwatches[index].click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async selectRandomSize() {
    const allSwatches = await this.page.locator('.swatch-option').all();
    const sizeCount = Math.min(5, allSwatches.length);
    if (sizeCount > 0) {
      const randomIndex = Math.floor(Math.random() * sizeCount);
      await allSwatches[randomIndex].click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async selectColor(index: number = 0) {
    const allSwatches = await this.page.locator('.swatch-option').all();
    const colorStartIndex = 5;
    const colorIndex = colorStartIndex + index;
    if (allSwatches.length > colorIndex) {
      await allSwatches[colorIndex].click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async selectRandomColor() {
    const allSwatches = await this.page.locator('.swatch-option').all();
    const colorStartIndex = 5;
    if (allSwatches.length > colorStartIndex) {
      const colorCount = allSwatches.length - colorStartIndex;
      const randomIndex = colorStartIndex + Math.floor(Math.random() * colorCount);
      await allSwatches[randomIndex].click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async addToCart() {
    await this.addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.addToCartButton.click();
  }

  async isAddedToCart() {
    return await this.successMessage.isVisible();
  }

  async hasReviewSection() {
    return await this.reviewSection.isVisible();
  }

  async getSuccessMessage() {
    return await this.successMessage.textContent();
  }

  async waitForSuccessMessage(timeout: number = 5000) {
    await this.successMessage.waitFor({ state: 'visible', timeout });
    return await this.isAddedToCart();
  }
}
