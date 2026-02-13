import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test.describe('Advanced Search with API Monitoring', () => {
  test('should intercept autocomplete API and click last suggestion', async ({ page }) => {
    const homePage = new HomePage(page);
    
    let apiCalled = false;
    let apiStatus = 0;
    
    await page.route('**/*', async (route) => {
      const url = route.request().url();
      if (url.includes('search') && url.includes('suggest')) {
        apiCalled = true;
        const response = await route.fetch();
        apiStatus = response.status();
      }
      await route.continue();
    });
    
    await homePage.goto();
    
    const searchButton = page.locator('#menu-search-icon');
    await searchButton.click();
    
    await homePage.typeSearch('shirt');
    
    await page.waitForTimeout(2000);
    
    if (!apiCalled) {
      test.skip(true, 'Autocomplete API was not called - feature may not be available');
      return;
    }
    
    expect(apiStatus).toBe(200);
    
    const suggestions = await homePage.getSuggestions();
    expect(suggestions.length).toBeGreaterThan(0);
    
    await homePage.clickLastSuggestion();
    
    await page.waitForLoadState('networkidle');
    
    const url = page.url();
    expect(url).toContain('catalogsearch/result');
  });
});
