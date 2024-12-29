import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    // Seed Users with skipDuplicates to avoid duplicate entries
    await prisma.user.createMany({
      data: [
        { name: "John Doe", email: "john@example.com" },
        { name: "Jane Smith", email: "jane@example.com" },
      ],
      skipDuplicates: true, // This avoids inserting duplicates
    });
    console.log("Users seeded successfully!");

    // Seed Products with skipDuplicates
    await prisma.product.createMany({
      data: [
        {
          name: "Product 1",
          price: 19.99,
          description: "A high-quality product with great value.",
        },
        {
          name: "Product 2",
          price: 29.99,
          description: "Another amazing product for your needs.",
        },
      ],
      skipDuplicates: true, // This avoids inserting duplicates
    });
    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
