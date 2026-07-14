import { expect, type Page } from '@playwright/test';
import { getLoginLocators, type LoginLocators } from '../locators/login.locators.js';

export class LoginPage {
  readonly locators: LoginLocators;

  constructor(private page: Page) {
    this.locators = getLoginLocators(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/dashboard', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.locators.usernameInput).toBeVisible();
    await expect(this.locators.passwordInput).toBeVisible();
    await expect(this.locators.submitButton).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await expect(this.locators.usernameInput).toBeVisible();
    await this.locators.usernameInput.fill(username);
    await this.locators.passwordInput.fill(password);
    await this.locators.submitButton.click();

    await this.page.waitForURL(/\/dashboard(\/)?$/i);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);

    const dashboardHeading = this.page.locator('h1, h2, [role="heading"]').first();
    await expect(dashboardHeading).toBeVisible();
  }
}
