import { type DefaultSession } from "next-auth";

//TODO: CREATE USER ROLE TYPE

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      //TODO: ADD USER ROLE
    } & DefaultSession["user"];
  }
}
