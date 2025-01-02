"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      // Optionally, display a loading indicator
      return;
    }

    if (!session) {
      // Redirect unauthenticated users to the sign-in page
      router.push("/account");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[var(--color-background)] text-[var(--color-text)] min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <p>
        This page will display the list of all your past orders once connected to the database.
      </p>
      {/* Future implementation: Display orders here */}
    </div>
  );
}