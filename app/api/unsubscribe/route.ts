import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Named import

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Update the user's subscribed status in the database
    const user = await prisma.user.update({
      where: { email },
      data: { subscribed: false },
    });

    console.log(`User with email ${email} unsubscribed successfully.`);

    return NextResponse.json({
      message: `The email ${email} has been unsubscribed successfully.`,
    });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "User not found or an error occurred" },
      { status: 404 }
    );
  }
}
