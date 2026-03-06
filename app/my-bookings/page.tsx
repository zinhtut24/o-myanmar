import { prisma } from "../../lib/prisma";
import { Clock, CheckCircle, XCircle, MapPin, Calendar, Car, Ticket, ArrowRight, Wallet } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Bookings | O! Myanmar Travel",
};

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "omyalmar-super-secret-key");

export default async function MyBookingsPage() {
  // ၁။ Login ဝင်ထားခြင်း ရှိ/မရှိ Token စစ်ဆေးမည်
  const cookieStore = await cookies();
  const token = cookieStore.get("user-token")?.value || cookieStore.get("admin-token")?.value;

  if (!token) {
    redirect("/login"); // Login မဝင်ထားရင် Login Page ကို ပို့မည်
  }

  // ၂။ Token ထဲကနေ User ID ကို ထုတ်ယူမည်
  let userId = "";
  try {
    const verified = await jwtVerify(token, SECRET_KEY);
    userId = (verified.payload.id || verified.payload.userId) as string;
  } catch (err) {
    redirect("/login");
  }

  // ၃။ အဆိုပါ User ID နှင့် သက်ဆိုင်သော Booking များကို Database မှ ဆွဲထုတ်မည်
  const userBookings = await prisma.booking.findMany({
    where: { userId: userId },
    orderBy: { createdAt: 'desc' }, // နောက်ဆုံးတင်ထားသော Booking ကို အပေါ်ဆုံးကပြမည်
    include: {
      tourPlan: { include: { tourPackage: true } },
      vehicle: true,
    }
  });

  const formatMoney = (amount: any) => new Intl.NumberFormat('en-MM').format(Number(amount));
  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header Section */}
      <div className="bg-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">My Trip Bookings</h1>
            <p className="text-slate-400">View and manage all your scheduled journeys in one place.</p>
          </div>
          <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-sm">
             <p className="text-orange-400 text-sm font-bold uppercase tracking-widest">Total Trips</p>
             <p className="text-white text-3xl font-black">{userBookings.length}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Booking မရှိသေးရင် ပြမည့် အပိုင်း */}
        {userBookings.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-12 text-center">
            <Ticket className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Bookings Yet</h3>
            <p className="text-slate-500 mb-8">You haven't booked any tours with us yet. Start exploring now!</p>
            <Link href="/destinations" className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-purple-700 transition-all">
              Browse Destinations <ArrowRight className="w-4 h-4"/>
            </Link>
          </div>
        ) : (
          /* Booking ရှိရင် ပြမည့် List အပိုင်း */
          <div className="space-y-6">
            {userBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden group hover:border-purple-300 transition-all">
                
                {/* Status Bar */}
                <div className="px-6 py-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                   <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Booking ID</span>
                      <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 uppercase">
                        #{booking.id.slice(-8)}
                      </span>
                   </div>
                   <div>
                    {booking.status === "PENDING" && <span className="flex items-center gap-1.5 text-orange-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter bg-orange-50 italic">● Pending</span>}
                    {booking.status === "CONFIRMED" && <span className="flex items-center gap-1.5 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter bg-green-50 italic">● Confirmed</span>}
                    {booking.status === "CANCELLED" && <span className="flex items-center gap-1.5 text-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter bg-red-50 italic">● Cancelled</span>}
                   </div>
                </div>

                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                  {/* Tour Image Placeholder (သို့) Title */}
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
                      {booking.tourPlan.tourPackage.title}
                    </h2>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                      <MapPin className="w-4 h-4 text-purple-500" /> {booking.tourPlan.tourPackage.location}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-slate-50 p-3 rounded-2xl">
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Travel Date</p>
                          <p className="text-sm font-bold text-slate-800">{formatDate(booking.bookingDate)}</p>
                       </div>
                       <div className="bg-slate-50 p-3 rounded-2xl">
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-1 flex items-center gap-1"><Car className="w-3 h-3"/> Vehicle</p>
                          <p className="text-sm font-bold text-slate-800">{booking.vehicle.name}</p>
                       </div>
                    </div>
                  </div>

                  {/* Payment Info Section */}
                  <div className="md:w-64 bg-slate-900 p-6 rounded-3xl flex flex-col justify-between text-white relative overflow-hidden">
                     {/* Decorative background circle */}
                     <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/5 rounded-full"></div>
                     
                     <div className="relative z-10">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Total Price</p>
                        <p className="text-2xl font-black text-orange-400">{formatMoney(booking.totalPrice)} MMK</p>
                     </div>

                     <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex justify-between items-end">
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Deposit Paid</p>
                          <p className="text-sm font-bold">{formatMoney(booking.depositPaid)} MMK</p>
                        </div>
                        <div className="bg-green-500/20 p-2 rounded-lg text-green-400">
                           <Wallet className="w-4 h-4" />
                        </div>
                     </div>
                  </div>
                </div>

                {/* Footer Tip */}
                <div className="px-8 py-3 bg-slate-50 text-[10px] text-slate-400 font-medium text-center italic border-t border-slate-100">
                  Contact support if you need to change your travel date or cancel this ride.
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}