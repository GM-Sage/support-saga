import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { users, verificationTokens } from "@/lib/db";
import formData from "form-data";
import Mailgun from "mailgun.js";

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Check if the user already exists
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Create user and save to database (mark as unverified initially)
    const newUser = { id: uuidv4(), email, password, fullName, verified: false, subscribed: true };
    users.push(newUser);

    // Generate verification token and save it with expiration
    const verificationToken = uuidv4();
    verificationTokens.set(verificationToken, { email, expires: Date.now() + 3600000 }); // 1 hour

    // Initialize Mailgun
    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY || "", // Add your Mailgun API key to .env
    });

    // Generate verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${verificationToken}`;

    // Generate unsubscribe URL
    const unsubscribeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}`;

    // Send verification email using a styled template
    await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
      from: `"Support Saga" <${process.env.MAILGUN_SENDER_EMAIL}>`, // Friendly sender email
      to: email,
      subject: "Welcome to Support Saga! Please verify your email",
      html: `
        <div style="font-family: 'Roboto', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f0f0f; color: #ffffff; border: 1px solid #18569e; border-radius: 8px;">
          <h2 style="color: #18569e; text-align: center;">Welcome to Support Saga, ${fullName}!</h2>
          <p style="font-size: 16px; line-height: 1.5;">
            Thank you for signing up for Support Saga! Please confirm your email address to get started.
          </p>
          <a href="${verificationUrl}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; background-color: #18569e; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 4px; text-align: center;">Verify Email</a>
          <p style="font-size: 14px; color: #888;">
            If you didn’t sign up for Support Saga, please ignore this email or contact us at support@support-saga.com.
          </p>
          <p style="font-size: 14px; text-align: center;">
            If you wish to unsubscribe, <a href="${unsubscribeUrl}" style="color: #18569e;">click here</a>.
          </p>
          <p style="font-size: 14px; text-align: center;">&copy; 2024 Support Saga. All rights reserved.</p>
        </div>
      `,
      "h:List-Unsubscribe": `<${unsubscribeUrl}>`,
    });

    return NextResponse.json({
      message: "Sign-up successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json({ error: "An error occurred during sign-up" }, { status: 500 });
  }
}
