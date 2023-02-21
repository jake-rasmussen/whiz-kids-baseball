import { faker } from "@faker-js/faker";
import { prisma } from "../seed_db";
import { getRandomInt, getSome } from "../helper";
import { Day } from "@prisma/client";

const generateFakePractice = (teamId: number) => {
  const days = getSome(
    [
      Day.SUNDAY,
      Day.MONDAY,
      Day.TUESDAY,
      Day.WEDNESDAY,
      Day.THURSDAY,
      Day.FRIDAY,
      Day.SATURDAY,
    ],
    getRandomInt(1, 3)
  );

  const startTime = new Date("1995-12-17T04:30:00").toISOString();
  const endTime = new Date("1995-12-17T06:30:00").toISOString();
  return prisma.practice.create({
    data: {
      location: faker.address.streetAddress(),
      days: days,
      startTime: startTime,
      endTime: endTime,
      team: {
        connect: {
          id: teamId,
        },
      },
    },
  });
};

export const generateFakePractices = async (
  teamId: number,
  numPractices: number
) => {
  for (let i = 0; i < numPractices; i++) {
    await generateFakePractice(teamId);
  }
};

export const deletePractices = prisma.practice.deleteMany();
