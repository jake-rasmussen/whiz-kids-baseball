/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */
import { prisma } from "../db";
import { getAuth } from "@clerk/nextjs/server";

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
import { TRPCError, initTRPC } from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";
import type { User } from "@prisma/client";

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (user: User | null) => {
  return {
    prisma,
    user,
  };
};

const getUser = async (userId: string, userEmail: string) => {
  async function upsertUser() {
    return await prisma.user.upsert({
      where: {
        clerkId: userId,
      },
      update: {},
      create: {
        clerkId: userId,
        email: userEmail,
      },
    });
  }

  return await upsertUser();
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { userId, sessionClaims } = getAuth(opts.req);

  if (userId && sessionClaims) {
    const userPrimaryEmail = sessionClaims.email as string;
    const user = await getUser(userId, userPrimaryEmail);
    return createInnerTRPCContext(user);
  }

  return createInnerTRPCContext(null);
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

// export this procedure to be used anywhere in your application
export const protectedProcedure = t.procedure.use(isAuthed);

const isAdmin = t.middleware(({ next, ctx }) => {
  if (!ctx.user?.isAdmin) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const adminProcedure = t.procedure.use(isAdmin);
