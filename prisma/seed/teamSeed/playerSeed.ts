import { getRandomInt, getSome } from "../helper";
import { prisma } from "../seed_db";
import { faker } from "@faker-js/faker";
import { Position } from "@prisma/client";

const generateFakePlayer = (teamId: string) => {
  const positions = getSome(
    [
      Position.FIRST_BASE,
      Position.SECOND_BASE,
      Position.THIRD_BASE,
      Position.SHORTSTOP,
      Position.CATCHER,
      Position.LEFT_FIELD,
      Position.CENTER_FIELD,
      Position.RIGHT_FIELD,
      Position.PITCHER,
    ],
    getRandomInt(1, 3)
  ) as Position[];
  return prisma.player.create({
    data: {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      graduationYear: faker.datatype.number({ min: 2023, max: 2028 }),
      team: {
        connect: {
          id: teamId,
        },
      },
      school: faker.address.city() + " High School",
      positions: positions,
    },
  });
};

export const generateFakePlayers = async (
  teamId: string,
  numPlayers: number
) => {
  for (let i = 0; i < numPlayers; i++) {
    await generateFakePlayer(teamId);
  }
};

export const deletePlayers = prisma.player.deleteMany();
