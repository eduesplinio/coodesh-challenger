import { test, expect } from '@playwright/test';
import { HomePage, ProductPage, CartPage, CatalogPage } from '../../pages';

test.describe('Random Product Selection', () => {
  test('should add a random product from men catalog to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const catalogPage = new CatalogPage(page);

    await homePage.goto();
    await homePage.navigateToMenCategory();

    expect(await catalogPage.hasProducts()).toBe(true);
    const productCount = await catalogPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    await catalogPage.selectRandomProduct();

    if (await productPage.hasSizeOptions()) {
      await productPage.selectRandomSize();
    }

    if (await productPage.hasColorOptions()) {
      await productPage.selectRandomColor();
    }

    await productPage.addToCart();

    const isAdded = await productPage.waitForSuccessMessage();
    expect(isAdded).toBe(true);

    const cartCount = await cartPage.getCartCount();
    expect(cartCount).toBeGreaterThan(0);
  });
});
