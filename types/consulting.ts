// types/consulting.ts

// Import Prisma's generated types
import { Consultant as PrismaConsultant, Service as PrismaService, ServiceAvailability } from '@prisma/client';

/**
 * Type representing a Service.
 */
export type Service = PrismaService & {
  consultants: Consultant[]; // Array of Consultants offering this Service
};

/**
 * Type representing a Consultant.
 */
export type Consultant = PrismaConsultant & {
  services: Service[]; // Array of Services the Consultant specializes in
};

/**
 * Enum for Service Availability.
 */
export enum ServiceAvailabilityEnum {
  AVAILABLE = "AVAILABLE",
  UNAVAILABLE = "UNAVAILABLE",
}