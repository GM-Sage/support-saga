import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware function
export function middleware(request: NextRequest) {
  // Example: Add custom logic
  const url = request.nextUrl.clone();
  console.log("Middleware is processing the request...");

  // Return the NextResponse (default behavior)
  return NextResponse.next();
}

// Define which paths the middleware should run on
export const config = {
    matcher: ["/api/:path*", "/protected-route/:path*"], // Replace with your protected routes
};
