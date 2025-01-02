// testPrisma.ts

import { prisma } from "./lib/prisma.js"; // Include .js extension

async function main() {
  try {
    // Fetch all users with their created classes and enrollments
    const users = await prisma.user.findMany({
      include: {
        createdClasses: {
          include: {
            sections: {
              include: {
                lessons: true,
              },
            },
          },
        },
        enrolledClasses: {
          include: {
            class: {
              include: {
                sections: {
                  include: {
                    lessons: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    console.log("Users and their Classes:");
    console.dir(users, { depth: null });

    // Fetch all enrollments to verify the Enrollment model
    const enrollments = await prisma.enrollment.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        class: {
          select: { id: true, title: true, description: true },
        },
      },
    });

    console.log("\nEnrollments:");
    console.dir(enrollments, { depth: null });
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();