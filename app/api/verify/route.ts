import { NextResponse } from "next/server";
import { users, verificationTokens } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  const verificationData = verificationTokens.get(token);
  if (!verificationData || verificationData.expires < Date.now()) {
    return NextResponse.json({ error: "Token is invalid or has expired" }, { status: 400 });
  }

  // Find and verify the user
  const user = users.find((user) => user.email === verificationData.email);
  if (user) {
    user.verified = true;
    verificationTokens.delete(token); // Remove the token after successful verification
    return NextResponse.json({ message: "Email verified successfully!" });
  }

  return NextResponse.json({ error: "User not found" }, { status: 404 });
}
