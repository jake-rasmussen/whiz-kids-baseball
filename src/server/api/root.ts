import { teamRouter } from "./routers/team";
import { tournamentRouter } from "./routers/tournament";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  team: teamRouter,
  tournament: tournamentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
