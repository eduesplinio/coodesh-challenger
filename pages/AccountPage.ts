import { Page, Locator } from '@playwright/test';

export class AccountPage {
  readonly page: Page;
  readonly createAccountLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly createAccountButton: Locator;
  readonly successMessage: Locator;
  readonly captcha: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createAccountLink = page.locator('a[href*="customer/account/create"]');
    this.firstNameInput = page.locator('#firstname');
    this.lastNameInput = page.locator('#lastname');
    this.emailInput = page.locator('#email_address');
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('#password-confirmation');
    this.createAccountButton = page.locator('button[title="Create an Account"]');
    this.successMessage = page.locator('.message-success');
    this.captcha = page.locator('.g-recaptcha, [class*="captcha"]');
  }

  async navigateToRegistration() {
    await this.page.goto('/customer/account/create');
  }

  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.password);
  }

  async submitRegistration() {
    await this.createAccountButton.click();
  }

  async hasCaptcha() {
    return await this.captcha.isVisible().catch(() => false);
  }

  async isRegistrationSuccessful() {
    return await this.successMessage.isVisible();
  }
}
