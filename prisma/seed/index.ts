import { prisma } from "./seed_db";
import { deletePlayers } from "./teamSeed/playerSeed";
import { deletePractices } from "./teamSeed/practiceSeed";
import { deleteTeams, generateFakeTeams } from "./teamSeed/teamSeed";
import { deleteTournamnet } from "./teamSeed/tournamentSeed";

const cleanUpDB = async () => {
  await prisma.$transaction([
    //Any tables that need to be cleaned up should be added here
    deleteTournamnet,
    deletePractices,
    deletePlayers,
    deleteTeams,
  ]);
};

const seed = async () => {
  await cleanUpDB();

  //Any seed data should be added here
  await generateFakeTeams(8);
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
