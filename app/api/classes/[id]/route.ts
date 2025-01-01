import { prisma } from "@lib/prisma"; // Adjust the import path if needed
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        sections: {
          include: {
            lessons: true,
          },
        },
      },
    });

    if (!classItem) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }

    return NextResponse.json(classItem);
  } catch (error) {
    console.error("Error fetching class details:", error);
    return NextResponse.json({ error: "Unable to fetch class details" }, { status: 500 });
  }
}
