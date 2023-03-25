import { deleteAlumni, generateFakeAlumnus } from "./alumniSeed";
import { prisma } from "./seed_db";
import { deletePlayers } from "./teamSeed/playerSeed";
import { deletePractices } from "./teamSeed/practiceSeed";
import { deleteTeams, generateFakeTeams } from "./teamSeed/teamSeed";
import { deleteTournamnet as deleteTournaments } from "./teamSeed/tournamentSeed";
import { deleteTryouts, generateFakeTryouts } from "./tryoutSeed";

const cleanUpDB = async () => {
  await prisma.$transaction([
    //Any tables that need to be cleaned up should be added here
    deleteAlumni,
    deleteTryouts,
    deleteTournaments,
    deletePractices,
    deletePlayers,
    deleteTeams,
  ]);
};

const seed = async () => {
  await cleanUpDB();

  //Any seed data should be added here
  await generateFakeTeams(8);
  await generateFakeAlumnus(50);
  await generateFakeTryouts(5);
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
