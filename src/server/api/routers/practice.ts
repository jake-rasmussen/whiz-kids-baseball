import { Day } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const practiceRouter = createTRPCRouter({
  getPracticeById: publicProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const practice = await ctx.prisma.practice.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          team: true,
        },
      });

      return practice;
    }),

  getPracticesByTeamId: publicProcedure
    .input(z.object({ teamId: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      const practices = await ctx.prisma.practice.findMany({
        where: {
          teamId,
        },
        include: {
          team: true,
        },
      });

      return practices;
    }),

  createPractice: publicProcedure
    .input(
      z.object({
        days: z.nativeEnum(Day),
        location: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        teamId: z.coerce.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { days, location, startTime, endTime, teamId } = input;
      const practice = await ctx.prisma.practice.create({
        data: {
          days,
          location,
          startTime,
          endTime,
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      });

      return practice;
    }),

  updatePractice: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        days: z.nativeEnum(Day).optional(),
        location: z.string().optional(),
        startTime: z.date().optional(),
        endTime: z.date().optional(),
        teamId: z.coerce.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, days, location, startTime, endTime, teamId } = input;
      const practice = await ctx.prisma.practice.update({
        where: {
          id,
        },
        data: {
          days,
          location,
          startTime,
          endTime,
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      });

      return practice;
    }),
});
