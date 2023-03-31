import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const tryoutsRouter = createTRPCRouter({
  getTryoutsById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const tryouts = await ctx.prisma.tryout.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return tryouts;
    }),

  getAllTryouts: publicProcedure.query(async ({ ctx }) => {
    const tryouts = await ctx.prisma.tryout.findMany();

    return tryouts;
  }),

  createTryout: publicProcedure
    .input(
      z.object({
        dateTime: z.date(),
        location: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { dateTime, location } = input;
      const tryout = await ctx.prisma.tryout.create({
        data: {
          dateTime,
          location,
        },
      });

      return tryout;
    }),

  updateTryout: publicProcedure
    .input(
      z.object({
        id: z.string(),
        dateTime: z.date().optional(),
        location: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, dateTime, location } = input;
      const tryout = await ctx.prisma.tryout.update({
        where: {
          id,
        },
        data: {
          dateTime,
          location,
        },
      });

      return tryout;
    }),

  deleteTryout: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const tryout = await ctx.prisma.tryout.delete({
        where: {
          id,
        },
      });

      return tryout;
    }),
});
