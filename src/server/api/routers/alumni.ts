import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const alumniRouter = createTRPCRouter({
  getAlumniById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const alumni = await ctx.prisma.alumni.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return alumni;
    }),

  getAlumniByLastNameLetter: publicProcedure
    .input(z.object({ letter: z.string().length(1) }))
    .query(async ({ ctx, input }) => {
      const { letter } = input;
      const alumni = await ctx.prisma.alumni.findMany({
        where: {
          lastName: {
            startsWith: letter,
          },
        },
      });

      return alumni;
    }),

  getAllAlumni: publicProcedure.query(async ({ ctx }) => {
    const alumni = await ctx.prisma.alumni.findMany();

    return alumni;
  }),

  createAlumni: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        organization: z.string(),
        year: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { firstName, lastName, organization, year } = input;
      const alumni = await ctx.prisma.alumni.create({
        data: {
          firstName,
          lastName,
          organization,
          year,
        },
      });

      return alumni;
    }),

  updateAlumni: publicProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        organization: z.string().optional(),
        year: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, firstName, lastName, organization, year } = input;
      const alumni = await ctx.prisma.alumni.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          organization,
          year,
        },
      });

      return alumni;
    }),

  deleteAlumni: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const alumni = await ctx.prisma.alumni.delete({
        where: {
          id,
        },
      });

      return alumni;
    }),
});
