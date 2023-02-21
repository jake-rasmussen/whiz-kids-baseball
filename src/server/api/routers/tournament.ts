import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const tournamentRouter = createTRPCRouter({
  getTournamentById: publicProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const tournament = await ctx.prisma.tournament.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          team: true,
        },
      });

      return tournament;
    }),

  getTournamnetsByTeamId: publicProcedure
    .input(z.object({ teamId: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      const tournaments = await ctx.prisma.tournament.findMany({
        where: {
          teamId,
        },
      });

      return tournaments;
    }),

  createTournament: publicProcedure
    .input(
      z.object({
        name: z.string(),
        dates: z.date().array(),
        location: z.string(),
        type: z.string(),
        teamId: z.coerce.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, dates, location, type, teamId } = input;
      const tournament = await ctx.prisma.tournament.create({
        data: {
          name,
          dates,
          location,
          type,
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      });

      return tournament;
    }),

  updateTournamentDetails: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        name: z.string().optional(),
        dates: z.date().array().optional(),
        location: z.string().optional(),
        type: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, dates, location, type } = input;
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id,
        },
        data: {
          name,
          dates,
          location,
          type,
        },
      });

      return tournament;
    }),

  changeTournamentTeam: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        teamId: z.coerce.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, teamId } = input;
      const tournament = await ctx.prisma.tournament.update({
        where: {
          id,
        },
        data: {
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      });

      return tournament;
    }),

  deleteTournament: publicProcedure
    .input(z.object({ id: z.coerce.number() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const tournament = await ctx.prisma.tournament.delete({
        where: {
          id,
        },
      });

      return tournament;
    }),
});
