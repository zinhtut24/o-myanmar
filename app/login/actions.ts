"use server";

import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache"; // Cache ရှင်းရန်အတွက် ထည့်သွင်းခြင်း

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "omyalmar-super-secret-key");

export async function loginAccount(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user && email === "admin@omyalmar.com") {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    user = await prisma.user.create({
      data: { name: "Main Admin", email: "admin@omyalmar.com", password: hashedPassword, role: "ADMIN" }
    });
  }

  if (!user || !user.password) {
    redirect("/login?error=true");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    redirect("/login?error=true");
  }

  const token = await new SignJWT({ userId: user.id, role: user.role, name: user.name })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET_KEY);

  const cookieStore = await cookies();

  if (user.role === "ADMIN") {
    cookieStore.set("admin-token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
    revalidatePath("/", "layout"); // မျက်နှာပြင်တစ်ခုလုံးကို အသစ်ပြန်ဆွဲခိုင်းခြင်း
    redirect("/admin");
  } else {
    cookieStore.set("user-token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
    revalidatePath("/", "layout"); // မျက်နှာပြင်တစ်ခုလုံးကို အသစ်ပြန်ဆွဲခိုင်းခြင်း
    redirect("/");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-token");
  cookieStore.delete("user-token");
  revalidatePath("/", "layout"); // Logout ထွက်လျှင်လည်း အသစ်ပြန်ဆွဲခိုင်းမည်
  redirect("/");
}