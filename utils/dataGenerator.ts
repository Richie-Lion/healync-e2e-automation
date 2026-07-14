import { faker } from '@faker-js/faker';

export function generatePatientData() {
  return {
    name: faker.person.fullName(),
    mobile: faker.string.numeric(10)
  };
}
