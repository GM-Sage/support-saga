"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useNotification } from "../context/NotificationContext";
import Link from "next/link";

interface SignInResult {
  error?: string;
  status?: number;
  ok?: boolean;
  url?: string;
}

export default function AccountPage() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { showToast, showModal } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    if (isSignUp) {
      await handleSignUp(email, password, fullName);
    } else {
      await handleSignIn(email, password);
    }

    setIsLoading(false);
  };

  const handleSignUp = async (email: string, password: string, fullName: string): Promise<void> => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (res.ok) {
        const result: SignInResult | undefined = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          showToast(
            "Sign-up successful, but auto-login failed. Please sign in manually.",
            "error"
          );
        } else {
          showToast("Sign-up successful! Redirecting...", "success");
          window.location.href = "/dashboard";
        }
      } else {
        const errorData = await res.json();
        showModal({
          title: "Sign-up Failed",
          content: `Error: ${errorData.error}`,
          onConfirm: () => console.error("Modal acknowledged"),
        });
      }
    } catch (error) {
      showToast("An error occurred during sign-up. Please try again.", "error");
      console.error("Sign-up error:", error);
    }
  };

  const handleSignIn = async (email: string, password: string): Promise<void> => {
    try {
      const result: SignInResult | undefined = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        showToast("Sign-in failed. Please check your credentials.", "error");
      } else {
        showToast("Sign-in successful! Redirecting...", "success");
        window.location.href = "/dashboard";
      }
    } catch (error) {
      showToast("An error occurred during sign-in. Please try again.", "error");
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <div className="w-full max-w-sm p-6 bg-[var(--color-secondary)] rounded-lg shadow-lg">
        {/* Tab Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsSignUp(false)}
            className={`text-lg font-bold transition-colors ${
              !isSignUp
                ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
            }`}
            style={{ fontFamily: "var(--font-header)" }}
            aria-pressed={!isSignUp}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`text-lg font-bold transition-colors ${
              isSignUp
                ? "text-[var(--color-primary)] border-b-2 border-[var(--color-primary)]"
                : "text-[var(--color-text)] hover:text-[var(--color-primary)]"
            }`}
            style={{ fontFamily: "var(--font-header)" }}
            aria-pressed={isSignUp}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isSignUp && (
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              className="p-3 text-[var(--color-text)] bg-[var(--color-background)] border border-[var(--color-primary)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              aria-label="Full Name"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="p-3 text-[var(--color-text)] bg-[var(--color-background)] border border-[var(--color-primary)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-label="Email"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="p-3 text-[var(--color-text)] bg-[var(--color-background)] border border-[var(--color-primary)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            aria-label="Password"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`p-3 font-semibold text-[var(--color-text)] bg-[var(--color-primary)] rounded-lg hover:bg-[var(--color-accent)] transition-transform transform hover:scale-105 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "font-[var(--font-header)] shadow-lg"
            }`}
            style={{
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
              fontFamily: "var(--font-header)",
            }}
            aria-busy={isLoading}
          >
            {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        {!isSignUp && (
          <div className="text-center mt-4">
            <Link
              href="/reset-password"
              className="inline-block text-[var(--color-text)] hover:text-[var(--color-secondary)] text-lg font-bold transition-transform transform hover:scale-105"
              style={{
                padding: "10px 20px",
                backgroundColor: "#243262",
                borderRadius: "6px",
                color: "#ffffff",
                fontFamily: "var(--font-header)",
                boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.5)",
                transition: "all 0.3s ease-in-out",
              }}
              aria-label="Forgot Password"
            >
              Forgot Password?
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}