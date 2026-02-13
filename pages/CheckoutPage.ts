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
  readonly nextButton: Locator;
  readonly placeOrderButton: Locator;
  readonly orderNumber: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#customer-email');
    this.firstNameInput = page.locator('input[name="firstname"]');
    this.lastNameInput = page.locator('input[name="lastname"]');
    this.streetInput = page.locator('input[name="street[0]"]');
    this.cityInput = page.locator('input[name="city"]');
    this.stateSelect = page.locator('select[name="region_id"]');
    this.zipInput = page.locator('input[name="postcode"]');
    this.countrySelect = page.locator('select[name="country_id"]');
    this.phoneInput = page.locator('input[name="telephone"]');
    this.shippingMethodRadio = page.locator('input[type="radio"][name="ko_unique_1"]').first();
    this.nextButton = page.locator('button.continue');
    this.placeOrderButton = page.locator('button.checkout');
    this.orderNumber = page.locator('.checkout-success .order-number');
    this.successMessage = page.locator('.checkout-success');
  }

  async fillShippingAddress(data: {
    email: string;
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
  }) {
    await this.emailInput.fill(data.email);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.streetInput.fill(data.street);
    await this.cityInput.fill(data.city);
    await this.zipInput.fill(data.zip);
    await this.phoneInput.fill(data.phone);
    
    if (await this.countrySelect.isVisible()) {
      await this.countrySelect.selectOption(data.country);
    }
    if (await this.stateSelect.isVisible()) {
      await this.stateSelect.selectOption({ label: data.state });
    }
  }

  async selectShippingMethod() {
    await this.shippingMethodRadio.check();
  }

  async clickNext() {
    await this.nextButton.click();
  }

  async placeOrder() {
    await this.placeOrderButton.click();
  }

  async isOrderConfirmed() {
    return await this.successMessage.isVisible();
  }

  async getOrderNumber() {
    return await this.orderNumber.textContent();
  }
}
