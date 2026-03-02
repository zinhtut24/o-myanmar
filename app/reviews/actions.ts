"use server";

import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { revalidatePath } from "next/cache";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "omyalmar-super-secret-key");

export async function submitReview(formData: FormData) {
  const rating = Number(formData.get("rating"));
  const type = formData.get("type") as "CAR" | "DRIVER" | "SERVICE" | "GENERAL";
  const comment = formData.get("comment") as string;

  // Login ဝင်ထားသူ ဟုတ်မဟုတ် စစ်ဆေးခြင်း
  const cookieStore = await cookies();
  const token = cookieStore.get("user-token")?.value;

  if (!token) {
    throw new Error("You must be logged in to submit a review.");
  }

  let userId = "";
  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    userId = (verified.payload.id || verified.payload.userId) as string;
  } catch (err) {
    throw new Error("Invalid token. Please login again.");
  }

  if (!comment || rating < 1 || rating > 5) {
    throw new Error("Invalid review data.");
  }

  // Database ထဲသို့ Review အသစ် သိမ်းခြင်း
  await prisma.review.create({
    data: {
      userId: userId,
      type: type,
      rating: rating,
      comment: comment,
    }
  });

  // Review အသစ်ဝင်သွားရင် Page ကို Refresh တန်းလုပ်ပေးရန်
  revalidatePath("/reviews");
}