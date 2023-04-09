import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const trainingRouter = createTRPCRouter({
  getTrainingById: publicProcedure.input(z.object({ id: z.string() })).query(
    async ({ ctx, input }) => {
      const { id } = input;
      const training = await ctx.prisma.training.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return training;
    }
  ),


});
