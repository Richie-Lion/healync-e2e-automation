import type { Locator, Page } from '@playwright/test';

export interface LoginLocators {
  usernameInput: Locator;
  passwordInput: Locator;
  submitButton: Locator;
}

export function getLoginLocators(page: Page): LoginLocators {
  return {
    usernameInput: page.getByLabel(/username/i).or(page.getByPlaceholder(/username|email/i)).first(),
    passwordInput: page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i)).first(),
    submitButton: page.getByRole('button', { name: /login|sign in/i }).first()
  };
}
