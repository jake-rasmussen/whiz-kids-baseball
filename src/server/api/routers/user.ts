import { z } from "zod";
import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  isUserAdmin: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.isAdmin;
  }),

  deleteUser: adminProcedure
    .input(z.object({ clerkId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { clerkId } = input;

      if (clerkId === ctx.user.clerkId) {
        throw new Error("Cannot delete yourself");
      }
      await ctx.prisma.user.delete({
        where: { clerkId },
      });

      return "User deleted";
    }),
});
