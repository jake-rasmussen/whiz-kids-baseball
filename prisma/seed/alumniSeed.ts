import { prisma } from "./seed_db";
import { faker } from "@faker-js/faker";

const generateFakeAlumni = () => {
  return prisma.alumni.create({
    data: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      year: faker.datatype.number({ min: 2023, max: 2028 }),
      organization: faker.company.name(),
    },
  });
};

export const generateFakeAlumnus = async (num: number) => {
  for (let i = 0; i < num; i++) {
    await generateFakeAlumni();
  }
};

export const deleteAlumni = prisma.alumni.deleteMany();
