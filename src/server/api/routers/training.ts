import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const trainingRouter = createTRPCRouter({
  getTrainingById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const training = await ctx.prisma.training.findUniqueOrThrow({
        where: {
          id,
        },
      });

      return training;
    }),

  getTrainingWithAvailability: publicProcedure.query(async ({ ctx }) => {
    const allTrainings = await ctx.prisma.training.findMany({
      include: {
        participants: true,
      },
      orderBy: {
        dateTime: "asc",
      },
    });

    const availableTrainings = allTrainings.map((training) => {
      if (training.participants.length < training.totalSlots) {
        const { participants: _, ...modifiedTraining } = training;
        return modifiedTraining;
      }
    });

    return availableTrainings;
  }),

  getAllTrainings: publicProcedure.query(async ({ ctx }) => {
    const training = await ctx.prisma.training.findMany({
      orderBy: {
        dateTime: "asc",
      },
    });

    return training;
  }),

  createTraining: publicProcedure
    .input(
      z.object({
        name: z.string(),
        location: z.string(),
        dateTime: z.date(),
        totalSlots: z.number(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, location, dateTime, totalSlots, price } = input;
      const training = await ctx.prisma.training.create({
        data: {
          name,
          location,
          dateTime,
          totalSlots,
          price,
        },
      });

      return training;
    }),

  updateTraining: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        location: z.string().optional(),
        dateTime: z.date().optional(),
        totalSlots: z.number().optional(),
        price: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, name, location, dateTime, totalSlots, price } = input;
      const training = await ctx.prisma.training.update({
        where: {
          id,
        },
        data: {
          name,
          location,
          dateTime,
          totalSlots,
          price,
        },
      });

      return training;
    }),

  deleteTraining: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const training = await ctx.prisma.training.delete({
        where: {
          id,
        },
      });

      return training;
    }),
});
