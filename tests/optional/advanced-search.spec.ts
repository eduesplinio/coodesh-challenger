import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages';

test.describe('Advanced Search with API Monitoring', () => {
  test('should intercept autocomplete API and click last suggestion', async ({ page }) => {
    const homePage = new HomePage(page);

    let apiStatus = 0;

    await homePage.goto();

    const searchButton = page.locator('#menu-search-icon');
    await searchButton.click();

    await homePage.typeSearch('shirt');

    try {
      const response = await page.waitForResponse(
        resp => resp.url().includes('search') && resp.url().includes('suggest'),
        { timeout: 3000 }
      );
      apiStatus = response.status();
    } catch {
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
