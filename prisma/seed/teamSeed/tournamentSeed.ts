import { getRandomInt } from "../helper";
import { prisma } from "../seed_db";
import { faker } from "@faker-js/faker";

const generateFakeTournament = (teamId: string) => {
  const dates = faker.date.betweens(
    "2023-01-01",
    "2024-01-01",
    getRandomInt(1, 4)
  );
  return prisma.tournament.create({
    data: {
      name: faker.lorem.words(4),
      location: faker.address.streetAddress(),
      dates: dates,
      type: faker.lorem.word(),
      team: {
        connect: {
          id: teamId,
        },
      },
    },
  });
};

export const generateFakeTournaments = async (
  teamId: string,
  numTournamnets: number
) => {
  for (let i = 0; i < numTournamnets; i++) {
    await generateFakeTournament(teamId);
  }
};

export const deleteTournamnet = prisma.tournament.deleteMany();
