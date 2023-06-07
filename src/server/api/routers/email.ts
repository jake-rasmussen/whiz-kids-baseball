import { z } from "zod";
import { emailAdmin, blastEmailToUsers } from "../../../utils/sparkpost";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const emailRouter = createTRPCRouter({
  blastEmailToUsers: adminProcedure
    .input(
      z.object({
        subject: z.string(),
        text: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { subject, text } = input;

      const userEmails = (await ctx.prisma.user.findMany({
        where: { email: { not: null } },
        select: { email: true },
      })) as { email: string }[];

      if (userEmails.length === 0) {
        throw new TRPCError({
          message: "User emails not found",
          code: "NOT_FOUND",
        });
      } else {
        const recipients = userEmails.map((user) => user.email);
        try {
          await blastEmailToUsers(recipients, subject, text);
        } catch (e) {
          throw new TRPCError({
            message: "Error sending emails",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      }
      return { success: true };
    }),

  sendContactUsEmail: publicProcedure
    .input(
      z.object({
        fullName: z.string(),
        userEmail: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input: emailAdminParams }) => {
      try {
        await emailAdmin("Contact Us", emailAdminParams);
      } catch (e) {
        throw new TRPCError({
          message: "Error sending emails",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return { success: true };
    }),

  sendInterestEmail: publicProcedure
    .input(
      z.object({
        playerName: z.string(),
        userEmail: z.string(),
        teamInterest: z.string(),
        cityOrTown: z.string(),
        currentSchool: z.string(),
        dateOfBirth: z.string(),
        positions: z.string(),
        bats: z.enum(["Right", "Left", "Both"]),
        throws: z.enum(["Right", "Left"]),
        playedAtWhizKids: z.boolean(),
      })
    )
    .mutation(async ({ input: emailAdminParams }) => {
      try {
        await emailAdmin("Interest", emailAdminParams);
      } catch (e) {
        console.log("hi form error in sparkpost");
        throw new TRPCError({
          message: "Error sending emails",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
      return { success: true };
    }),
});
