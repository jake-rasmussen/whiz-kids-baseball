import { prisma } from "./seed_db";
import { faker } from "@faker-js/faker";

const generateFakeTraining = () => {
  return prisma.training.create({
    data: {
      name: faker.name.firstName(),
      location: faker.address.city(),
      dateTime: faker.date.future(),
      totalSlots: faker.datatype.number({ min: 10, max: 20 }),
      price: faker.datatype.number({ min: 100, max: 500 }),
    },
  });
};

export const generateFakeTrainings = async (num: number) => {
  for (let i = 0; i < num; i++) {
    await generateFakeTraining();
  }
};

export const deleteTrainings = prisma.training.deleteMany();
