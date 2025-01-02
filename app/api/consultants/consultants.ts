// app/api/consultants/consultants.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * Handler for Consultant-related API requests.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return await handleGetConsultants(req, res);
      case 'POST':
        return await handleCreateConsultant(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Fetches all consultants with their associated services.
 */
async function handleGetConsultants(req: NextApiRequest, res: NextApiResponse) {
  try {
    const consultants = await prisma.consultant.findMany({
      include: {
        services: true, // Include related services
      },
    });
    return res.status(200).json(consultants);
  } catch (error) {
    console.error('Error fetching consultants:', error);
    return res.status(500).json({ error: 'Failed to fetch consultants.' });
  }
}

/**
 * Creates a new consultant and associates them with services.
 */
async function handleCreateConsultant(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, calendlyLink, serviceIds } = req.body;

  // Validate request data
  if (!name || !email || !serviceIds || !Array.isArray(serviceIds)) {
    return res.status(400).json({ error: 'Invalid request data.' });
  }

  try {
    const newConsultant = await prisma.consultant.create({
      data: {
        name,
        email,
        calendlyLink,
        services: {
          connect: serviceIds.map((id: number) => ({ id })), // Connect to existing services
        },
      },
      include: {
        services: true, // Include services in the response
      },
    });
    return res.status(201).json(newConsultant);
  } catch (error) {
    console.error('Error creating consultant:', error);
    return res.status(500).json({ error: 'Failed to create consultant.' });
  }
}