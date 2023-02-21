//Seed data will go here
import { faker } from "@faker-js/faker";

import { prisma } from "../seed_db";
import { getRandomInt } from "../helper";
import { generateFakePlayers } from "./playerSeed";
import { generateFakePractices } from "./practiceSeed";
import { generateFakeTournaments } from "./tournamentSeed";

const generateFakeTeam = () => {
  return prisma.team.create({
    data: {
      name: faker.lorem.words(5),
    },
  });
};

export const generateFakeTeams = async (count: number) => {
  for (let i = 0; i < count; i++) {
    const { id } = await generateFakeTeam();
    await generateFakePlayers(id, getRandomInt(9, 25));
    await generateFakePractices(id, getRandomInt(1, 5));
    await generateFakeTournaments(id, getRandomInt(0, 15));
  }
};

export const deleteTeams = prisma.team.deleteMany();
