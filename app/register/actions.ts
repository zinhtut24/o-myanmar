"use server";

import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // အကောင့် (Email) ရှိပြီးသားလား စစ်ဆေးခြင်း
    const existingUser = await prisma.user.findUnique({ where: { email } });
    
    if (existingUser) {
      // မှတ်ချက်: Next.js Server Action တွင် error ကို ပိုမိုကောင်းမွန်စွာ ပြသလိုပါက 
      // useActionState (သို့) useFormState သုံးရန် အကြံပြုပါသည်။
      console.error("This email is already registered.");
      throw new Error("This email is already registered.");
    }

    // Password ကို လုံခြုံအောင် ပြောင်းလဲခြင်း (Hash)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Database ထဲသို့ User အသစ် သိမ်းဆည်းခြင်း (ဧည့်သည်ဖြစ်၍ role: "USER" သာ ဖြစ်ပါမည်)
    await prisma.user.create({
      data: {
        name,
        phone,
        email,
        password: hashedPassword,
        role: "USER",
      }
    });

  } catch (error) {
    console.error("Registration Error:", error);
    throw error; 
  }

  // အောင်မြင်ပါက Login မျက်နှာစာသို့ ပို့ပေးမည်
  redirect("/login?registered=true");
}