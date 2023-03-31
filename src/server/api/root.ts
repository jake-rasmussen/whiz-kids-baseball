import { alumniRouter } from "./routers/alumni";
import { playerRouter } from "./routers/player";
import { practiceRouter } from "./routers/practice";
import { teamRouter } from "./routers/team";
import { tournamentRouter } from "./routers/tournament";
import { tryoutsRouter as tryoutRouter } from "./routers/tryout";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  team: teamRouter,
  tournament: tournamentRouter,
  player: playerRouter,
  practice: practiceRouter,
  tryout: tryoutRouter,
  alumni: alumniRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
