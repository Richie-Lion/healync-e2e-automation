import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { PatientPage } from '../pages/PatientPage.js';
import { testCredentials, consultantName } from '../config/testData.js';
import { generatePatientData } from '../utils/dataGenerator.js';

test('end-to-end patient workflow', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const patientPage = new PatientPage(page);

  await loginPage.navigate();
  await loginPage.login(testCredentials.username, testCredentials.password);

  const patientData = generatePatientData();

  await patientPage.navigatetoPatients();
  await patientPage.createPatient(patientData.name, patientData.mobile);
  await patientPage.searchAndOpenPatient(patientData.mobile);
  await patientPage.addConsultant(consultantName);

  await expect(page).toHaveURL(/dashboard/i);
  await expect(page.getByText(patientData.name)).toBeVisible();
});
