import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define the user type
type User = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  verified: boolean;
};

// Initialize the users array with type
const users: User[] = [];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = users.find((user) => user.email === credentials?.email);

        if (user && user.password === credentials?.password) {
          if (!user.verified) {
            throw new Error("Your account is not verified. Please check your email.");
          }
          return user;
        }

        throw new Error("Invalid credentials.");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
