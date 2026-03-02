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
  
  // Form ထဲကနေ Upload တင်လိုက်တဲ့ File ကို ဆွဲယူမည်
  const paymentProofFile = formData.get("paymentProof") as File;
  let paymentProofUrl = null;

  // ဧည့်သည် Login ဝင်ထားခြင်း ရှိမရှိ Token စစ်ဆေးမည်
  const cookieStore = await cookies();
  const token = cookieStore.get("user-token")?.value || cookieStore.get("admin-token")?.value;

  if (!token) {
    redirect("/login");
  }

  let finalUserId = "";
  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    finalUserId = (verified.payload.id || verified.payload.userId) as string; 
  } catch (err) {
    redirect("/login");
  }

  // ဈေးနှုန်း အချက်အလက်များကို Database မှ ဆွဲထုတ်မည်
  const priceData = await prisma.tourPrice.findUnique({
    where: { id: priceId }
  });

  if (!priceData) throw new Error("Price not found");

  // ==============================================================
  // 📸 ပုံကို Base64 ပြောင်းပြီး Cloudinary သို့ ပို့ခြင်း (Error ကင်းရန်)
  // ==============================================================
  if (paymentProofFile && paymentProofFile.size > 0) {
    try {
      // ၁။ File ကို Base64 Format သို့ ပြောင်းခြင်း
      const bytes = await paymentProofFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${paymentProofFile.type};base64,${buffer.toString('base64')}`;

      // ၂။ Cloudinary သို့ ပို့ရန် Form Data တည်ဆောက်ခြင်း
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", base64Image); // 👈 ပြောင်းထားတဲ့ Base64 ကိုထည့်ပါမယ်
      
      // ⚠️ အရေးကြီး: အောက်ပါ Name များကို အစ်ကို့ Cloudinary အကောင့်အတိုင်း အတိအကျ ပြောင်းပါ
      // "your_upload_preset" နေရာတွင် Cloudinary ၌ ဆောက်ထားသော Unsigned Preset နာမည်ကို ထည့်ပါ (ဥပမာ: "omyalmar_preset")
      cloudinaryFormData.append("upload_preset", "omyanmar-preset"); 
      
      // "your_cloud_name" နေရာတွင် အစ်ကို့၏ Cloud Name အစစ်ကို ထည့်ပါ
      const res = await fetch("dhw5abjcd", { 
        method: "POST",
        body: cloudinaryFormData,
      });

      if (res.ok) {
        const data = await res.json();
        paymentProofUrl = data.secure_url; // 👈 Database သို့ ထည့်မည့် URL ရလာပါပြီ
        console.log("✅ Cloudinary Upload အောင်မြင်ပါသည်။ URL:", paymentProofUrl);
      } else {
        const errorData = await res.json();
        console.log("❌ Cloudinary Error ဖြစ်နေပါသည်:", errorData);
      }
    } catch (error) {
      console.error("❌ Server Image Upload Error:", error);
    }
  }

  // Payment Method သတ်မှတ်ခြင်း
  let dbPaymentMethod = null;
  if (formPayment === "kpay") dbPaymentMethod = "KPAY";
  if (formPayment === "wave") dbPaymentMethod = "WAVEPAY";
  if (formPayment === "card") dbPaymentMethod = "CARD";

  // Booking Data ကို Database ထဲသို့ သိမ်းဆည်းခြင်း
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
      
      // 👈 Cloudinary မှ ပြန်ရလာသော URL ဝင်သွားပါမည် (File မပါလျှင် null ဖြစ်မည်)
      paymentProof: paymentProofUrl, 
    }
  });

  redirect(`/booking/success?id=${booking.id}`);
}