import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Ensure this path matches your setup

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
