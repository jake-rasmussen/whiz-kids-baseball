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
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import type { ModifiedClerkUser } from "../../types/modifiedUserType";
import type { User as ClerkUser } from "@clerk/nextjs/dist/api";

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
import { TRPCError, initTRPC } from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import superjson from "superjson";

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (user: ModifiedClerkUser | null) => {
  return {
    prisma,
    user,
  };
};

const userIsAdmin = async (user: ClerkUser) => {
  async function upsertUser(user: ClerkUser) {
    return await prisma.user.upsert({
      where: {
        clerkId: user.id,
      },
      update: {},
      create: {
        clerkId: user.id,
      },
    });
  }

  return (await upsertUser(user)).isAdmin;
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  async function getUser() {
    // get userId from request
    const { userId } = getAuth(opts.req);
    // get full user object
    const user = userId ? await clerkClient.users.getUser(userId) : null;
    return user;
  }

  const user = await getUser();

  if (user) {
    const modifiedUser = {
      ...user,
      isAdmin: user ? await userIsAdmin(user) : undefined,
    };
    return createInnerTRPCContext(modifiedUser);
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
