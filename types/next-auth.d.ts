import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    name: string;
    password?: string; // Optional for security
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string; // User ID
    email?: string;
    name?: string;
  }
}
