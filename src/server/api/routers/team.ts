import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const teamRouter = createTRPCRouter({
  getTeamById: publicProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const team = await ctx.prisma.team.findUniqueOrThrow({
        where: {
          id: input.id,
        },
        include: {
          players: true,
          tournaments: true,
          practices: true,
        },
      });

      return team;
    }),

  getAllTeams: publicProcedure.query(async ({ ctx }) => {
    const teams = await ctx.prisma.team.findMany();
    return teams;
  }),

  createTeam: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const team = await ctx.prisma.team.create({
        data: {
          name,
        },
      });

      return team;
    }),

  updateTeamName: publicProcedure
    .input(z.object({ id: z.coerce.number(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id, name } = input;
      const team = await ctx.prisma.team.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });

      return team;
    }),

  deleteTeam: publicProcedure
    .input(z.object({ id: z.coerce.number(), deletePlayers: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { id, deletePlayers } = input;
      const deletedTeam = await ctx.prisma.team.delete({
        where: {
          id,
        },
      });
      if (!deletePlayers) return deletedTeam;

      const deletedPlayers = await ctx.prisma.player.deleteMany({
        where: {
          teamId: deletedTeam.id,
        },
      });

      return {
        team: deletedTeam,
        players: deletedPlayers,
      };
    }),
});
