import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, ServiceAvailability } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * Handles fetching all services with their associated consultants.
 */
export async function GET(req: NextRequest) {
  try {
    console.log('Fetching services...'); // Log fetching services
    const services = await prisma.service.findMany({
      include: {
        consultants: true, // Includes related consultants
      },
    });
    console.log('Services fetched:', services); // Log the fetched services
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services.' }, { status: 500 });
  }
}

/**
 * Handles creating a new service.
 */
export async function POST(req: NextRequest) {
  try {
    const { name, description, availability, consultantIds } = await req.json();

    // Basic validation
    if (!name || !description || !availability || !consultantIds || !Array.isArray(consultantIds)) {
      return NextResponse.json({ error: 'Invalid request data.' }, { status: 400 });
    }

    // Validate availability
    if (!Object.values(ServiceAvailability).includes(availability)) {
      return NextResponse.json({ error: 'Invalid service availability status.' }, { status: 400 });
    }

    const newService = await prisma.service.create({
      data: {
        name,
        description,
        availability,
        consultants: {
          connect: consultantIds.map((id: number) => ({ id })), // Connect to existing consultants
        },
      },
      include: {
        consultants: true, // Include consultants in the response
      },
    });
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service.' }, { status: 500 });
  }
}