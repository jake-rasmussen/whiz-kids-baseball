import { Position } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const playerRouter = createTRPCRouter({
  getPlayerById: publicProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const player = await ctx.prisma.player.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          team: true,
        },
      });

      return player;
    }),

  getAllPlayers: publicProcedure.query(async ({ ctx }) => {
    const players = await ctx.prisma.player.findMany({
      include: {
        team: true,
      },
    });

    return players;
  }),

  getAllPlayersWithTeam: publicProcedure.query(async ({ ctx }) => {
    const players = await ctx.prisma.player.findMany({
      where: {
        teamId: {
          not: null,
        },
      },
      include: {
        team: true,
      },
    });

    return players;
  }),

  getAllPlayersWithoutTeam: publicProcedure.query(async ({ ctx }) => {
    const players = await ctx.prisma.player.findMany({
      where: {
        teamId: null,
      },
    });

    return players;
  }),

  getPlayersByTeamId: publicProcedure
    .input(z.object({ teamId: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      const players = await ctx.prisma.player.findMany({
        where: {
          teamId,
        },
        include: {
          team: true,
        },
      });

      return players;
    }),

  createPlayer: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        graduationYear: z.coerce.number(),
        school: z.string(),
        positions: z.nativeEnum(Position),
        teamId: z.coerce.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { firstName, lastName, graduationYear, school, positions, teamId } =
        input;
      const player = await ctx.prisma.player.create({
        data: {
          firstName,
          lastName,
          graduationYear,
          school,
          positions,
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      });

      return player;
    }),

  updatePlayer: publicProcedure
    .input(
      z.object({
        id: z.coerce.number(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        graduationYear: z.coerce.number().optional(),
        school: z.string().optional(),
        positions: z.nativeEnum(Position).optional(),
        teamId: z.coerce.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        id,
        firstName,
        lastName,
        graduationYear,
        school,
        positions,
        teamId,
      } = input;
      const player = await ctx.prisma.player.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          graduationYear,
          school,
          positions,
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      });

      return player;
    }),

  deletePlayer: publicProcedure
    .input(z.object({ id: z.coerce.number() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const player = await ctx.prisma.player.delete({
        where: {
          id,
        },
      });

      return player;
    }),
});
