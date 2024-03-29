import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { Day } from "@prisma/client";
import { z } from "zod";

export const practiceRouter = createTRPCRouter({
  getPracticeById: publicProcedure
    .input(z.object({ id: z.string() }))
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
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      const practices = await ctx.prisma.practice.findMany({
        where: {
          teamId,
        },
      });

      return practices;
    }),

  createPractice: adminProcedure
    .input(
      z.object({
        days: z.nativeEnum(Day).array(),
        location: z.string(),
        startTime: z.date(),
        endTime: z.date(),
        teamId: z.string(),
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

  updatePractice: adminProcedure
    .input(
      z.object({
        id: z.string(),
        days: z.nativeEnum(Day).array().optional(),
        location: z.string().optional(),
        startTime: z.date().optional(),
        endTime: z.date().optional(),
        teamId: z.string().optional(),
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

  deletePractice: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const practice = await ctx.prisma.practice.delete({
        where: {
          id,
        },
      });

      return practice;
    }),
});
