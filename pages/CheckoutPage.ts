import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateSelect: Locator;
  readonly zipInput: Locator;
  readonly countrySelect: Locator;
  readonly phoneInput: Locator;
  readonly shippingMethodRadio: Locator;
  readonly placeOrderButton: Locator;
  readonly orderNumber: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('[name="email"]');
    this.firstNameInput = page.locator('[name="firstname"]');
    this.lastNameInput = page.locator('[name="lastname"]');
    this.streetInput = page.locator('[name="street[0]"]');
    this.cityInput = page.locator('[name="city"]');
    this.stateSelect = page.locator('[name="region_id"]');
    this.zipInput = page.locator('[name="postcode"]');
    this.countrySelect = page.locator('[name="country_id"]');
    this.phoneInput = page.locator('[name="telephone"]');
    this.shippingMethodRadio = page.locator('input[type="radio"][name*="shipping"]').first();
    this.placeOrderButton = page.locator('.btn-place-order');
    this.orderNumber = page.locator('.checkout-success .order-number');
    this.successMessage = page.locator('.checkout-success');
  }

  async fillShippingAddress(data: {
    email: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state?: string;
    zip: string;
    country?: string;
    phone: string;
  }) {
    await this.emailInput.waitFor({ state: 'visible' });
    await this.emailInput.fill(data.email);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.streetInput.fill(data.street);
    await this.cityInput.fill(data.city);
    await this.zipInput.fill(data.zip);
    await this.phoneInput.fill(data.phone);

    if (data.country && (await this.countrySelect.isVisible())) {
      await this.countrySelect.selectOption(data.country);
    }
    if (data.state && (await this.stateSelect.isVisible())) {
      await this.stateSelect.selectOption({ label: data.state });
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  async selectShippingMethod() {
    await this.shippingMethodRadio.waitFor({ state: 'visible' });
    await this.shippingMethodRadio.check();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async placeOrder() {
    await this.placeOrderButton.waitFor({ state: 'visible' });
    await this.placeOrderButton.click();
  }

  async isOrderConfirmed(): Promise<boolean> {
    try {
      await this.successMessage.waitFor({ state: 'visible', timeout: 15000 });
      return true;
    } catch {
      return false;
    }
  }

  async getOrderNumber(): Promise<string | null> {
    return await this.orderNumber.textContent();
  }
}
