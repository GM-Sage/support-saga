import { prisma } from "@lib/prisma"; // Adjust the import path if needed
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
      },
    });
    return NextResponse.json(classes);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json({ error: "Unable to fetch classes" }, { status: 500 });
  }
}
