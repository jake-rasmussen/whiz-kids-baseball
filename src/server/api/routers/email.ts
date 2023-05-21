import { z } from "zod";
import {
  blastEmailToUsers,
  emailAdmin,
} from "../../../utils/nodemailer";
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
        const bcc = userEmails.map((user) => user.email);
        try {
          await blastEmailToUsers(bcc, subject, text);
        } catch (e) {
          throw new TRPCError({
            message: "Error sending emails",
            code: "INTERNAL_SERVER_ERROR",
          });
        }
      }

      return "Emails sent";
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
        return "Email sent";
      } catch (e) {
        console.log(e);
        throw new TRPCError({
          message: "Error sending emails",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
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
        return "Email sent";
      } catch (e) {
        throw new TRPCError({
          message: "Error sending emails",
          code: "INTERNAL_SERVER_ERROR",
        });
      }
    }),
});
