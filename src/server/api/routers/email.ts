import { testEmail } from "../../../utils/nodemailer";
import { adminProcedure, createTRPCRouter, publicProcedure } from "../trpc";

export const emailRouter = createTRPCRouter({
  testEmail: publicProcedure.mutation(async () => {
    await testEmail();
    return true;
  }),
});
