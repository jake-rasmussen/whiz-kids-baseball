import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../trpc";
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

  getTrainingsForUsers: publicProcedure.query(async ({ ctx }) => {
    const allTrainings = await ctx.prisma.training.findMany({
      where: {
        dateTime: {
          gte: new Date(),
        },
      },
      include: {
        participants: true,
      },
      orderBy: {
        dateTime: "asc",
      },
    });

    const availableTrainings = allTrainings.map((training) => {
      if (training.participants.length < training.totalSlots) {
        const { participants: _, ...trainingWithoutParticipants } = training;
        const modifiedTraining = {
          ...trainingWithoutParticipants,
          availableSlots: training.totalSlots - training.participants.length,
        };
        return modifiedTraining;
      }
    });

    return availableTrainings;
  }),

  getTrainingsForUserId: protectedProcedure
    .query(async ({ ctx }) => {
      const { clerkId } = ctx.user;
      const trainings = await ctx.prisma.trainingsOnUsers.findMany({
        where: { userId: clerkId },
        include: { training: true }
      })

      return trainings;
    }),

  //TODO: make this an admin procedute after switching frontend to use get all trainings with availability
  getAllTrainingsForAdmin: adminProcedure.query(async ({ ctx }) => {
    const training = await ctx.prisma.training.findMany({
      orderBy: {
        dateTime: "asc",
      },
    });

    return training;
  }),

  getTrainingByIdForAdmin: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const training = await ctx.prisma.training.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          participants: true,
        },
      });

      return training;
    }),

  createTraining: adminProcedure
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

  updateTraining: adminProcedure
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

  deleteTraining: adminProcedure
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

  registerForTraining: protectedProcedure
    .input(z.object({ trainingId: z.string(), playerName: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { trainingId, playerName } = input;
      const clerkId = ctx.user.clerkId;
      return await ctx.prisma.trainingsOnUsers.create({
        data: {
          trainingId,
          userId: clerkId,
          playerName,
        },
      });
    }),

  unregisterFromTrainingAsUser: protectedProcedure
    .input(z.object({ trainingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { trainingId } = input;
      const clerkId = ctx.user.clerkId;
      return await ctx.prisma.trainingsOnUsers.delete({
        where: {
          userId_trainingId: {
            userId: clerkId,
            trainingId,
          },
        },
      });
    }),

  unregisterPlayerFromTrainingAsAdmin: adminProcedure
    .input(z.object({ trainingId: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { trainingId, userId } = input;
      return await ctx.prisma.trainingsOnUsers.delete({
        where: {
          userId_trainingId: {
            userId,
            trainingId,
          },
        },
      });
    }),
});
