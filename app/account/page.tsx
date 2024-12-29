// app/account/page.tsx
"use client";

import { useSession, signIn } from "next-auth/react";

export default function AccountPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>You are not signed in</h1>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Account</h1>
      <p>Welcome, {session.user?.email}!</p>
      {/* Add any account details or actions here */}
    </div>
  );
}
