import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';

test.describe('Product Review', () => {
  test('should add a review to a product', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    
    await homePage.goto();
    
    await page.locator('div.navigation a:has-text("Men")').first().click();
    await page.waitForLoadState('networkidle');
    
    await page.locator('.product-item a.product-item-link').first().click();
    await page.waitForLoadState('networkidle');
    
    const reviewForm = page.locator('#review_form');
    await reviewForm.scrollIntoViewIfNeeded();
    
    const isFormVisible = await reviewForm.isVisible();
    expect(isFormVisible).toBe(true);
    
    await page.locator('input[name="ratings[4]"][value="20"]').click();
    
    await page.locator('#nickname_field').fill('Test User');
    await page.locator('#summary_field').fill('Great product!');
    await page.locator('#review_field').fill('This is an automated test review. The product quality is excellent and I would recommend it to others.');
    
    await reviewForm.locator('button[type="submit"]').click();
    
    const successMessage = reviewForm.locator('[x-show="displaySuccessMessage"]');
    await successMessage.waitFor({ state: 'visible', timeout: 10000 });
    
    const messageText = await successMessage.textContent();
    expect(messageText).toContain('You submitted your review');
  });
});
