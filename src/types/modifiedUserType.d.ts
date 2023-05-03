import type { User as ClerkUser } from "@clerk/nextjs/dist/api";

export type ModifiedClerkUser = ClerkUser & { isAdmin?: boolean };
