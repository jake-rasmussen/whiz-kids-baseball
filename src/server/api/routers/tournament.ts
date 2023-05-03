import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const tournamentRouter = createTRPCRouter({
  getTournamentById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const tournament = await ctx.prisma.tournament.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          team: true,
        },
      });

      return tournament;
    }),

  getTournamnetsByTeamId: publicProcedure
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      const tournaments = await ctx.prisma.tournament.findMany({
        where: {
          teamId,
        },
        orderBy: {
          dates: "asc",
        },
      });

      return tournaments;
    }),

  createTournament: adminProcedure
    .input(
      z.object({
        name: z.string(),
        dates: z.date().array(),
        location: z.string(),
        type: z.string(),
        teamId: z.string(),
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

  updateTournamentDetails: adminProcedure
    .input(
      z.object({
        id: z.string(),
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

  changeTournamentTeam: adminProcedure
    .input(
      z.object({
        id: z.string(),
        teamId: z.string(),
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

  deleteTournament: adminProcedure
    .input(z.object({ id: z.string() }))
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
