import { test, expect } from '@playwright/test';
import { AccountPage } from '../../pages/AccountPage';
import { TestDataGenerator } from '../../utils/test-data';

test.describe('User Account Creation', () => {
  test('should create a new user account or skip if CAPTCHA is present', async ({ page }) => {
    const accountPage = new AccountPage(page);

    await accountPage.navigateToRegistration();

    const userData = await TestDataGenerator.generateUserData();

    await accountPage.fillRegistrationForm(userData);

    const hasCaptcha = await accountPage.hasCaptcha();

    if (hasCaptcha) {
      test.skip(
        true,
        'CAPTCHA detected - skipping test as automated CAPTCHA solving is not implemented'
      );
      return;
    }

    await accountPage.submitRegistration();

    await page.waitForLoadState('networkidle', { timeout: 10000 });

    const isSuccess = await accountPage.isRegistrationSuccessful();
    const isDashboard = page.url().includes('customer/account');

    expect(isSuccess || isDashboard).toBe(true);
  });
});
