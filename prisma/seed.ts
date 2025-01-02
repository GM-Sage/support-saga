import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Consultants
  const consultant1 = await prisma.consultant.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      calendlyLink: 'https://calendly.com/alicejohnson',
    },
  });

  const consultant2 = await prisma.consultant.create({
    data: {
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      calendlyLink: 'https://calendly.com/bobsmith',
    },
  });

  // Create Services
  await prisma.service.create({
    data: {
      name: 'Business Consulting',
      description: 'Expert advice to help you grow your business.',
      availability: 'AVAILABLE',
      consultants: {
        connect: [{ id: consultant1.id }, { id: consultant2.id }],
      },
    },
  });

  await prisma.service.create({
    data: {
      name: 'Technical Consulting',
      description: 'Get help with your technical challenges.',
      availability: 'UNAVAILABLE',
      consultants: {
        connect: [{ id: consultant2.id }],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });