import { expect, type Page } from '@playwright/test';
import { getPatientLocators, type PatientLocators } from '../locators/patient.locators.js';

export class PatientPage {
  readonly locators: PatientLocators;

  constructor(private page: Page) {
    this.locators = getPatientLocators(page);
  }

  async navigatetoPatients(): Promise<void> {
    await this.locators.patientMenuItem.click();
    await this.page.waitForLoadState('networkidle').catch(() => undefined);

    const patientHeading = this.page.locator('h1, h2, [role="heading"]').filter({ hasText: /patient/i }).first();
    await expect(patientHeading).toBeVisible();

    const patientGrid = this.page.locator('table, [role="grid"], [data-testid*="patient"]').first();
    await expect(patientGrid).toBeVisible();
  }

  async createPatient(name: string, mobile: string): Promise<void> {
    await this.locators.addPatientButton.click();

    const dialog = this.page.locator('form, [role="dialog"]').first();
    await expect(dialog).toBeVisible();
    await expect(this.locators.patientNameInput).toBeVisible();
    await expect(this.locators.mobileInput).toBeVisible();

    await this.locators.patientNameInput.fill(name);
    await this.locators.mobileInput.fill(mobile);
    await this.locators.saveButton.click();

    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    await expect(this.locators.successMessage).toBeVisible();
  }

  async searchAndOpenPatient(nameOrMobile: string): Promise<void> {
    await this.locators.searchInput.fill(nameOrMobile);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);

    const matchingRow = this.page.locator('tbody tr, [role="row"]').filter({ hasText: nameOrMobile }).first();
    await expect(matchingRow).toBeVisible();
    await matchingRow.click();

    const profileHeader = this.page.locator('h1, h2, [role="heading"]').filter({ hasText: nameOrMobile }).first();
    await expect(profileHeader).toBeVisible();
  }

  async addConsultant(consultantName: string): Promise<void> {
    const consultantSection = this.page.getByRole('button', { name: /consultant/i }).or(this.page.getByRole('tab', { name: /consultant/i })).first();
    await consultantSection.click();

    const consultantInput = this.page.getByLabel(/consultant/i).or(this.page.getByPlaceholder(/consultant/i)).first();
    await expect(consultantInput).toBeVisible();
    await consultantInput.fill(consultantName);

    const addActionButton = this.page.getByRole('button', { name: /add/i }).first();
    await addActionButton.click();
    await this.page.waitForLoadState('networkidle').catch(() => undefined);

    const consultantChip = this.page.getByText(consultantName).first();
    await expect(consultantChip).toBeVisible();
  }
}
