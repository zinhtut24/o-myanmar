import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Prisma 7 အတွက် Database Adapter ချိတ်ဆက်ခြင်း
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Next.js မှာ Reload ခဏခဏလုပ်ရင် Database ကြောင်မသွားအောင် ကာကွယ်ပေးတဲ့စနစ်
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;