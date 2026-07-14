import type { Locator, Page } from '@playwright/test';

export interface PatientLocators {
  patientMenuItem: Locator;
  addPatientButton: Locator;
  patientNameInput: Locator;
  mobileInput: Locator;
  saveButton: Locator;
  successMessage: Locator;
  searchInput: Locator;
  resultRow: Locator;
}

export function getPatientLocators(page: Page): PatientLocators {
  return {
    patientMenuItem: page.getByRole('link', { name: /patient/i }).or(page.getByRole('menuitem', { name: /patient/i })).first(),
    addPatientButton: page.getByRole('button', { name: /add patient/i }).first(),
    patientNameInput: page.getByLabel(/name/i).or(page.getByPlaceholder(/name/i)).first(),
    mobileInput: page.getByLabel(/mobile|phone/i).or(page.getByPlaceholder(/mobile|phone/i)).first(),
    saveButton: page.getByRole('button', { name: /save|create/i }).first(),
    successMessage: page.getByText(/patient created successfully|saved successfully|success/i).first(),
    searchInput: page.getByPlaceholder(/search/i).or(page.getByLabel(/search/i)).first(),
    resultRow: page.locator('tbody tr, [role="row"]').filter({ hasText: '' }).first()
  };
}
