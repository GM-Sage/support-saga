"use client";

import { useSession } from "next-auth/react";

export default function OrdersPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Order History</h1>
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Your Orders</h1>
      <p>
        This page will show the list of all your past orders once connected to
        the database.
      </p>
    </div>
  );
}
