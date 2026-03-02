import { PrismaClient } from "@prisma/client";

// Next.js မှာ Hot Reload ဖြစ်ရင် Connection တွေ အများကြီး ထပ်မပွားအောင် ကာကွယ်ပေးတဲ့စနစ်
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;