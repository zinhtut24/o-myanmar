"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

// Booking ကို Approve လုပ်ခြင်း
export async function confirmBooking(formData: FormData) {
  const bookingId = formData.get("bookingId") as string;
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED" }
  });
  revalidatePath("/admin");
}

// Booking ကို Cancel လုပ်ခြင်း
export async function cancelBooking(formData: FormData) {
  const bookingId = formData.get("bookingId") as string;
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" }
  });
  revalidatePath("/admin");
}

// ဈေးနှုန်းနှင့် စရံငွေ ပြင်ဆင်ခြင်း
export async function updatePrice(formData: FormData) {
  const priceId = formData.get("priceId") as string;
  const newPrice = formData.get("price") as string;
  const newDeposit = formData.get("deposit") as string;

  try {
    await prisma.tourPrice.update({
      where: { id: priceId },
      data: {
        price: parseFloat(newPrice),
        deposit: parseFloat(newDeposit),
      }
    });
    revalidatePath("/admin");
  } catch (error) {
    console.error("Update Price Error:", error);
  }
}

// Message ကို ဖတ်ပြီးကြောင်း မှတ်သားခြင်း
export async function markMessageAsRead(formData: FormData) {
  const messageId = formData.get("messageId") as string;
  await prisma.contactMessage.update({
    where: { id: messageId },
    data: { isRead: true }
  });
  revalidatePath("/admin");
}