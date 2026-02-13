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
    this.sizeOptions = page.locator('.swatch-option.text');
    this.colorOptions = page.locator('.swatch-option.color');
    this.addToCartButton = page.locator('#product-addtocart-button');
    this.successMessage = page.locator('[role="alert"]');
    this.reviewSection = page.locator('#reviews');
    this.addReviewButton = page.locator('.action.add');
  }

  async selectSize(index: number = 0) {
    const sizes = this.sizeOptions;
    const count = await sizes.count();
    if (count > 0) {
      await sizes.nth(index).click();
    }
  }

  async selectRandomSize() {
    const sizes = this.sizeOptions;
    const count = await sizes.count();
    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      await sizes.nth(randomIndex).click();
    }
  }

  async selectColor(index: number = 0) {
    const colors = this.colorOptions;
    const count = await colors.count();
    if (count > 0) {
      await colors.nth(index).click();
    }
  }

  async selectRandomColor() {
    const colors = this.colorOptions;
    const count = await colors.count();
    if (count > 0) {
      const randomIndex = Math.floor(Math.random() * count);
      await colors.nth(randomIndex).click();
    }
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async isAddedToCart() {
    return await this.successMessage.isVisible();
  }

  async hasReviewSection() {
    return await this.reviewSection.isVisible();
  }
}
