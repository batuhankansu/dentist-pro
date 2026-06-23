// Prisma client will be initialized when database is configured
// For now, this file exports types for use in the application

export type { Doctor, Appointment, Availability, AdminUser } from "@/generated/prisma/client";

// In production, initialize Prisma with adapter:
// import { PrismaClient } from "@/generated/prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";
//
// const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// export const prisma = new PrismaClient({ adapter });
