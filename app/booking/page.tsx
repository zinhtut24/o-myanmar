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
      cloudinaryFormData.append("file", base64Image); 
      
      cloudinaryFormData.append("upload_preset", "omyanmar-preset"); 
      
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
      
      // 👈 Cloudinary မှ ပြန်ရလာသော URL ဝင်သွားပါမည်
      paymentProof: paymentProofUrl, 
    }
  });

  redirect(`/booking/success?id=${booking.id}`);
}


import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Car, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user-token")?.value || cookieStore.get("admin-token")?.value;

  if (!token) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const priceId = resolvedParams.price as string;

  if (!priceId) {
    redirect("/destinations");
  }

  const selectedPrice = await prisma.tourPrice.findUnique({
    where: { id: priceId },
    include: {
      vehicle: true,
      tourPlan: { include: { tourPackage: true } },
    },
  });

  if (!selectedPrice) notFound();

  const tour = selectedPrice.tourPlan.tourPackage;
  const plan = selectedPrice.tourPlan;
  const vehicle = selectedPrice.vehicle;

  const formatMoney = (amount: any) => new Intl.NumberFormat('en-MM').format(Number(amount)) + " MMK";

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-8">
          <Link href={`/destinations/${tour.slug}`} className="inline-flex items-center gap-2 text-purple-600 hover:text-orange-500 font-medium transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Tour Details
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">Complete Your Booking</h1>
          <p className="text-slate-600 mt-2">Please fill in your details to confirm your trip.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Traveler Information</h2>
              
              {/* ✅ ပြင်ဆင်ထားသော နေရာ: encType="multipart/form-data" ကို ထည့်ပေးထားပါသည် */}
              <form action={submitBooking} className="space-y-6" >
                <input type="hidden" name="priceId" value={priceId} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input type="text" name="name" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" name="phone" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address (Optional)</label>
                    <input type="email" name="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date</label>
                    <input type="date" name="travelDate" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none text-gray-700" required />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4 mt-8">Payment Method for Deposit</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="flex items-center gap-3 p-4 border border-purple-200 bg-purple-50 rounded-xl cursor-pointer">
                    <input type="radio" name="payment" value="kpay" className="w-5 h-5 text-purple-600" defaultChecked />
                    <span className="font-semibold text-gray-900">KBZ Pay</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-orange-200 bg-orange-50 rounded-xl cursor-pointer">
                    <input type="radio" name="payment" value="wave" className="w-5 h-5 text-orange-500" />
                    <span className="font-semibold text-gray-900">Wave Pay</span>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-blue-200 bg-blue-50 rounded-xl cursor-pointer">
                    <input type="radio" name="payment" value="card" className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">Credit / Debit Card</span>
                  </label>
                </div>

                <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-xl border-dashed text-center">
                  <p className="text-sm text-gray-600 mb-2">If using KPay/Wave, please transfer the deposit and upload the screenshot.</p>
                  <p className="font-bold text-purple-700 mb-4">Account No: 09 123 456 789 (U Aung)</p>
                  
                  <input type="file" name="paymentProof" accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer" />
                </div>

                <button type="submit" className="w-full mt-8 bg-gradient-to-r from-purple-600 to-orange-500 text-white font-bold text-lg py-4 rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all">
                  Confirm Booking & Pay Deposit
                </button>
              </form>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">Booking Summary</h2>
              
              <div className="flex gap-4 items-center mb-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                  {tour.images && tour.images.length > 0 ? (
                    <img src={tour.images[0]} alt={tour.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-purple-500 to-orange-400 opacity-80"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">{tour.title}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <MapPin className="w-3 h-3 text-orange-500" /> {tour.location}
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-500"/> Duration</span>
                  <span className="font-semibold text-gray-900">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <span className="text-gray-500 flex items-center gap-2"><Car className="w-4 h-4 text-purple-500"/> Vehicle</span>
                  <span className="font-semibold text-gray-900 text-right">{vehicle.name}<br/><span className="text-xs text-gray-400 font-normal">(Max {vehicle.capacity} Pax)</span></span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Price</span>
                  <span className="font-bold text-gray-900">{formatMoney(selectedPrice.price)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                  <span className="font-bold text-purple-700 flex items-center gap-1"><CreditCard className="w-4 h-4"/> Deposit to Pay Now</span>
                  <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">{formatMoney(selectedPrice.deposit)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-2 text-xs text-gray-500 bg-green-50 text-green-700 p-3 rounded-lg">
                <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                <p>Your booking is safe. Full payment is required only when the trip starts.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}