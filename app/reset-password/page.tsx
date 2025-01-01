"use client";

import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus("Password reset email sent successfully. Check your inbox.");
      } else {
        setStatus(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="w-full max-w-sm p-6 bg-[var(--color-secondary)] rounded-lg shadow-lg">
        <h1 className="text-[var(--color-primary)] text-2xl font-bold mb-6 text-center">
          Reset Password
        </h1>
        <form onSubmit={handleResetPassword} className="flex flex-col space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 text-[var(--color-text)] bg-[var(--color-background)] border border-[var(--color-primary)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`p-3 font-semibold text-[var(--color-secondary)] bg-[var(--color-primary)] rounded hover:text-[#f0f0e8] transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Processing..." : "Send Reset Link"}
          </button>
        </form>
        {status && (
          <p className="text-center mt-4 text-[var(--color-success)]">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}