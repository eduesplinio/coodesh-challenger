import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchSuggestions: Locator;
  readonly navigationMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="q"]');
    this.searchButton = page.locator('button[type="submit"]').first();
    this.searchSuggestions = page.locator('#search_autocomplete li');
    this.navigationMenu = page.locator('div.navigation');
  }

  async goto() {
    await this.page.goto('/');
  }

  async search(term: string) {
    const searchButton = this.page.locator('#menu-search-icon');
    await searchButton.click();
    await this.searchInput.fill(term);
    await this.page.locator('button[type="submit"]').first().click();
  }

  async typeSearch(term: string) {
    await this.searchInput.fill(term);
  }

  async getSuggestions() {
    await this.searchSuggestions.first().waitFor({ state: 'visible' });
    return await this.searchSuggestions.allTextContents();
  }

  async clickLastSuggestion() {
    const suggestions = this.searchSuggestions;
    const count = await suggestions.count();
    if (count > 0) {
      await suggestions.nth(count - 1).click();
    }
  }

  async isLoaded() {
    return await this.navigationMenu.isVisible();
  }
}
