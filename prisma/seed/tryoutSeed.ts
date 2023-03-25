import { prisma } from "./seed_db";
import { faker } from "@faker-js/faker";

const generateFakeTryout = () => {
  return prisma.tryout.create({
    data: {
      dateTime: faker.date.future(),
      location: faker.address.streetAddress(),
    },
  });
}


export const generateFakeTryouts = async (num: number) => {
  for (let i = 0; i < num; i++) {
    await generateFakeTryout();
  }
}

export const deleteTryouts = prisma.tryout.deleteMany();
