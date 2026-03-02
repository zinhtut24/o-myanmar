"use server";

import { prisma } from "../../lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "omyanmar-super-secret-key");

export async function submitBooking(formData: FormData) {
  const travelDate = formData.get("travelDate") as string;
  const formPayment = formData.get("payment") as string; 
  const priceId = formData.get("priceId") as string;
  
  const paymentProofFile = formData.get("paymentProof") as File;
  let paymentProofUrl = null;

  const cookieStore = await cookies();
  const token = cookieStore.get("user-token")?.value || cookieStore.get("admin-token")?.value;

  // ၁။ Token မရှိလျှင် Login သို့ ပို့မည်
  if (!token) {
    redirect("/login");
  }

  let finalUserId = "";
  let isVerified = false;

  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    finalUserId = (verified.payload.id || verified.payload.userId) as string; 
    isVerified = true;
  } catch (err) {
    console.error("JWT Verify Error:", err);
  }

  // ၂။ Token မှားယွင်းလျှင် Login သို့ ပို့မည် (Try-catch အပြင်ဘက်တွင် ရေးရပါမည်)
  if (!isVerified) {
    redirect("/login");
  }

  const priceData = await prisma.tourPrice.findUnique({
    where: { id: priceId }
  });

  if (!priceData) throw new Error("Price not found");

  // 📸 Cloudinary သို့ ပုံပို့ခြင်း
  if (paymentProofFile && paymentProofFile.size > 0) {
    try {
      const bytes = await paymentProofFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = `data:${paymentProofFile.type};base64,${buffer.toString('base64')}`;

      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", base64Image); 
      cloudinaryFormData.append("upload_preset", "omyanmar-preset"); 
      
      // ✅ အမှန်ပြင်ထားသော URL (dhw5abjcd သည် အစ်ကို့ Cloud Name ဖြစ်ပါသည်)
      const res = await fetch("https://api.cloudinary.com/v1_1/dhw5abjcd/image/upload", { 
        method: "POST",
        body: cloudinaryFormData,
      });

      if (res.ok) {
        const data = await res.json();
        paymentProofUrl = data.secure_url; 
        console.log("✅ Cloudinary Upload အောင်မြင်ပါသည်။ URL:", paymentProofUrl);
      } else {
        const errorData = await res.json();
        console.log("❌ Cloudinary Error ဖြစ်နေပါသည်:", errorData);
      }
    } catch (error) {
      console.error("❌ Server Image Upload Error:", error);
    }
  }

  let dbPaymentMethod = null;
  if (formPayment === "kpay") dbPaymentMethod = "KPAY";
  if (formPayment === "wave") dbPaymentMethod = "WAVEPAY";
  if (formPayment === "card") dbPaymentMethod = "CARD";

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
      paymentProof: paymentProofUrl, 
    }
  });

  redirect(`/booking/success?id=${booking.id}`);
}