import { alumniRouter } from "./routers/alumni";
import { emailRouter } from "./routers/email";
import { playerRouter } from "./routers/player";
import { practiceRouter } from "./routers/practice";
import { teamRouter } from "./routers/team";
import { tournamentRouter } from "./routers/tournament";
import { trainingRouter } from "./routers/training";
import { tryoutsRouter as tryoutRouter } from "./routers/tryout";
import { userRouter } from "./routers/user";
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
  training: trainingRouter,
  user: userRouter,
  email: emailRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
