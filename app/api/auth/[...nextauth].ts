import NextAuth from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === "development") global.prisma = prisma;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@domain.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const { email, password } = credentials;

        // Check if the user exists
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error("No user found with this email");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // Return user data (exclude sensitive fields)
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role || "user", // Default to 'user' if role is undefined
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || (() => { throw new Error("NEXTAUTH_SECRET is not set"); })(),
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      // Add user ID and role to the session
      if (token) {
        session.user = {
          id: token.sub || "",
          name: session.user?.name || "",
          email: session.user?.email || "",
          role: token.role || "user", // Add role if applicable
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      // Attach user ID and role to the token
      if (user) {
        token.sub = user.id?.toString() || "";
        token.role = user.role || "user"; // Add role if applicable
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);