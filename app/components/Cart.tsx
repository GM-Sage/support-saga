"use client";

import Link from "next/link";
import { useState } from "react";

export default function Cart() {
  const [items, setItems] = useState<any[]>([]);

  return (
    <div>
      <Link href="/cart">
        <button
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-text)",
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cart ({items.length})
        </button>
      </Link>
    </div>
  );
}
