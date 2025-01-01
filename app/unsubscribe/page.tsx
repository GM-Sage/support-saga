"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UnsubscribePage() {
  const searchParams = useSearchParams(); // Use Next.js hook for searchParams
  const [status, setStatus] = useState("Processing your request...");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const email = searchParams ? searchParams.get("email") : null; // Safely retrieve the "email" query parameter

  useEffect(() => {
    if (!email) {
      setStatus("Invalid request. No email provided.");
      setLoading(false);
      return;
    }

    // Fetch unsubscribe API
    const unsubscribe = async () => {
      try {
        const response = await fetch(`/api/unsubscribe?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        if (data.error) {
          setStatus(`Error: ${data.error}`);
        } else {
          setStatus(data.message || "You have been unsubscribed successfully.");
        }
      } catch {
        setStatus("An error occurred while processing your request.");
      } finally {
        setLoading(false);
      }
    };

    unsubscribe();
  }, [email]);

  return (
    <div
      className="unsubscribe-page"
      style={{
        textAlign: "center",
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#18569e" }}>Unsubscribe</h1>
      {loading ? (
        <p>Processing your request...</p>
      ) : (
        <>
          <p>{status}</p>
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "10px 20px",
              marginTop: "20px",
              backgroundColor: "#18569e",
              color: "#ffffff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </>
      )}
    </div>
  );
}
