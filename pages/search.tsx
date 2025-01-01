"use client";

import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || ""; // Fallback to an empty string

  if (!query) {
    return (
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold text-center text-[var(--color-primary)]">
          No Search Query Provided
        </h1>
        <p className="text-lg text-center text-[var(--color-text)]">
          Please enter a search term to view results.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-primary)]">
        Search Results for "{query}"
      </h1>
      <p className="text-lg text-[var(--color-text)]">
        Displaying results for: <strong>{query}</strong>
      </p>
      {/* Add logic to fetch and display search results */}
    </div>
  );
}
