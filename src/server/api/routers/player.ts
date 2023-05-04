import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { Position } from "@prisma/client";
import { z } from "zod";

export const playerRouter = createTRPCRouter({
  getPlayerById: publicProcedure
    .input(z.object({ id: z.string() }))
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
      orderBy: {
        lastName: "asc",
      }
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
    .input(z.object({ teamId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { teamId } = input;
      const players = await ctx.prisma.player.findMany({
        where: {
          teamId,
        },
      });

      return players;
    }),

  createPlayer: adminProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        graduationYear: z.number(),
        school: z.string(),
        positions: z.nativeEnum(Position).array(),
        teamId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

  updatePlayer: adminProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        graduationYear: z.number().optional(),
        school: z.string().optional(),
        positions: z.nativeEnum(Position).array().optional(),
        teamId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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

  deletePlayer: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const player = await ctx.prisma.player.delete({
        where: {
          id,
        },
      });

      return player;
    }),
});
