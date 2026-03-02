"use server";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";

export async function submitMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Database ထဲသို့ မက်ဆေ့ချ် သိမ်းဆည်းခြင်း
  await prisma.contactMessage.create({
    data: {
      name,
      email,
      message,
    }
  });

  // အောင်မြင်စွာ ပို့ပြီးကြောင်း URL မှတစ်ဆင့် ပြန်အကြောင်းကြားမည်
  redirect("/about?success=true");
}