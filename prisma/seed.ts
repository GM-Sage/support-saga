import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: "John Doe", email: "john@example.com" },
      { name: "Jane Smith", email: "jane@example.com" },
    ],
    skipDuplicates: true,
  });

  console.log("Users seeded successfully!");

  await prisma.product.createMany({
    data: [
      {
        name: "Product 1",
        price: 19.99,
        description: "A high-quality product with great value.",
        isFeatured: true,
        imageUrl: null,
        createdAt: new Date(),
      },
      {
        name: "Product 2",
        price: 29.99,
        description: "Another amazing product for your needs.",
        isFeatured: false,
        imageUrl: null,
        createdAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  console.log("Products seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
