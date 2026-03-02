"use server";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "omyalmar-super-secret-key");

export async function submitBooking(formData: FormData) {
  const travelDate = formData.get("travelDate") as string;
  const formPayment = formData.get("payment") as string; 
  const priceId = formData.get("priceId") as string;
  
  // Form ထဲက File ကို ယူမည်
  const paymentProofFile = formData.get("paymentProof") as File;
  let paymentProofUrl = null;

  const cookieStore = await cookies();
  const token = cookieStore.get("user-token")?.value || cookieStore.get("admin-token")?.value;

  if (!token) redirect("/login");

  let finalUserId = "";
  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    finalUserId = (verified.payload.id || verified.payload.userId) as string; 
  } catch (err) {
    redirect("/login");
  }

  const priceData = await prisma.tourPrice.findUnique({
    where: { id: priceId }
  });

  if (!priceData) throw new Error("Price not found");

  // ==============================================================
  // 📸 ပုံကို Base64 ပြောင်းပြီး Cloudinary သို့ ပို့ခြင်း
  // ==============================================================
  if (paymentProofFile && paymentProofFile.size > 0) {
    try {
      const bytes = await paymentProofFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${paymentProofFile.type};base64,${buffer.toString('base64')}`;

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", base64Image); 
      
      // ⚠️ ၁။ ဒီနေရာမှာ အဆင့် (၂) က ဆောက်ခဲ့တဲ့ Preset နာမည်ကို ထည့်ပါ
      cloudinaryFormData.append("upload_preset", "omyalmar_preset"); 
      
      // ⚠️ ၂။ ဒီနေရာက url ထဲမှာ အဆင့် (၁) က Copy ကူးလာတဲ့ အစ်ကို့ Cloud Name ကို ထည့်ပါ
      const res = await fetch("https://api.cloudinary.com/v1_1/အစ်ကို့_CLOUD_NAME_အစစ်/image/upload", { 
        method: "POST",
        body: cloudinaryFormData,
      });

      if (res.ok) {
        const data = await res.json();
        paymentProofUrl = data.secure_url; 
        console.log("✅ Cloudinary သို့ ပုံတင်ခြင်း အောင်မြင်ပါသည်။ URL:", paymentProofUrl);
      } else {
        const errorData = await res.json();
        console.log("❌ Cloudinary ငြင်းပယ်လိုက်ပါသည်:", errorData);
      }
    } catch (error) {
      console.error("❌ Server Error ဖြစ်နေပါသည်:", error);
    }
  }

  let dbPaymentMethod = null;
  if (formPayment === "kpay") dbPaymentMethod = "KPAY";
  if (formPayment === "wave") dbPaymentMethod = "WAVEPAY";
  if (formPayment === "card") dbPaymentMethod = "CARD";

  // Neon DB ထဲသို့ Booking သိမ်းခြင်း
  const booking = await prisma.booking.create({
    data: {
      userId: finalUserId,
      tourPlanId: priceData.tourPlanId,
      vehicleId: priceData.vehicleId,
      bookingDate: new Date(travelDate),
      totalPrice: priceData.price,
      depositPaid: priceData.deposit,
      status: "PENDING",
      paymentMethod: dbPaymentMethod as any,
      
      // 👈 ရလာတဲ့ Cloudinary URL ကို Database ထဲ သိမ်းပါပြီ
      paymentProof: paymentProofUrl, 
    }
  });

  redirect(`/booking/success?id=${booking.id}`);
}