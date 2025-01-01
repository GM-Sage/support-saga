// next-auth.d.ts
declare module "next-auth/react" {
    import { Session, SessionProvider } from "next-auth/react";
    
    export { Session, SessionProvider, getCsrfToken, getSession, getProviders, signIn, signOut, useSession };
  }
  
  declare module "next-auth" {
    import { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
    
    export { NextAuthOptions, DefaultSession, DefaultUser };
  }