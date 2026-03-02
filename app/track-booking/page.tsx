import { prisma } from "../../lib/prisma";
import { Search, Clock, CheckCircle, XCircle, MapPin, Calendar, Car, Wallet, Ticket } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Track Booking | O! Myanmar Travel",
};

export default async function TrackBookingPage({ searchParams }: { searchParams: Promise<{ bookingId?: string, phone?: string }> }) {
  const resolvedParams = await searchParams;
  const bookingId = resolvedParams.bookingId;
  const phone = resolvedParams.phone;

  let booking = null;
  let hasSearched = false;

  // URL ထဲမှာ Booking ID နဲ့ ဖုန်းနံပါတ် ပါလာရင် Database ထဲမှာ သွားရှာပါမည်
  if (bookingId && phone) {
    hasSearched = true;
    booking = await prisma.booking.findFirst({
      where: {
        id: bookingId.trim(),
        user: { phone: phone.trim() } // ဧည့်သည်၏ ဖုန်းနံပါတ်နဲ့ ကိုက်ညီမှု ရှိ/မရှိ စစ်ဆေးမည်
      },
      include: {
        tourPlan: { include: { tourPackage: true } },
        vehicle: true,
        user: true,
      }
    });
  }

  const formatMoney = (amount: any) => new Intl.NumberFormat('en-MM').format(Number(amount));
  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* ခေါင်းစဉ်ပိုင်း */}
      <div className="bg-slate-900 py-16 text-center px-4">
        <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-orange-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Track Your Booking</h1>
        <p className="text-slate-300 max-w-lg mx-auto">
          Booked as a guest? Enter your Booking ID and Phone Number below to check your trip status.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-30px] relative z-10">
        
        {/* ရှာဖွေမည့် Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-10 border border-slate-100">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Booking ID</label>
              <input 
                type="text" 
                name="bookingId" 
                defaultValue={bookingId} 
                placeholder="e.g. clr1234..." 
                required 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-400 outline-none transition-all bg-slate-50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone" 
                defaultValue={phone} 
                placeholder="e.g. 09123456789" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-orange-400 outline-none transition-all bg-slate-50"
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full md:w-auto px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors">
                Find Booking
              </button>
            </div>
          </form>
        </div>

        {/* ရှာပြီးသွားလို့ မတွေ့ခဲ့ရင် ပြမည့် Error */}
        {hasSearched && !booking && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center">
            <XCircle className="w-10 h-10 mx-auto mb-3 text-red-400" />
            <h3 className="text-lg font-bold mb-1">Booking Not Found</h3>
            <p className="text-sm">We couldn't find a booking matching that ID and phone number. Please check your details and try again.</p>
          </div>
        )}

        {/* ရှာတွေ့ခဲ့ရင် ပြသမည့် လက်မှတ် (Ticket) */}
        {booking && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
            <div className="bg-purple-50 p-6 border-b border-purple-100 flex justify-between items-center flex-wrap gap-4">
              <div>
                <p className="text-sm text-purple-600 font-bold mb-1">BOOKING ID</p>
                <p className="font-mono font-bold text-slate-900">#{booking.id.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                {booking.status === "PENDING" && <span className="flex items-center gap-1.5 bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-sm font-bold"><Clock className="w-4 h-4"/> Pending Approval</span>}
                {booking.status === "CONFIRMED" && <span className="flex items-center gap-1.5 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold"><CheckCircle className="w-4 h-4"/> Confirmed</span>}
                {booking.status === "CANCELLED" && <span className="flex items-center gap-1.5 bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-bold"><XCircle className="w-4 h-4"/> Cancelled</span>}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">{booking.tourPlan.tourPackage.title}</h2>
              <div className="flex items-center gap-2 text-purple-600 font-medium mb-8">
                <MapPin className="w-4 h-4" /> {booking.tourPlan.tourPackage.location}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                <div className="space-y-4">
                  <div><p className="text-xs text-slate-500 font-medium uppercase">Guest Name</p><p className="font-semibold text-slate-900">{booking.user.name}</p></div>
                  <div><p className="text-xs text-slate-500 font-medium uppercase">Travel Date</p><p className="font-semibold text-slate-900">{formatDate(booking.bookingDate)}</p></div>
                  <div><p className="text-xs text-slate-500 font-medium uppercase">Duration</p><p className="font-semibold text-slate-900">{booking.tourPlan.name}</p></div>
                </div>
                <div className="space-y-4">
                  <div><p className="text-xs text-slate-500 font-medium uppercase">Contact Phone</p><p className="font-semibold text-slate-900">{booking.user.phone}</p></div>
                  <div><p className="text-xs text-slate-500 font-medium uppercase">Vehicle</p><p className="font-semibold text-slate-900">{booking.vehicle.name}</p></div>
                  <div><p className="text-xs text-slate-500 font-medium uppercase">Total Amount</p><p className="font-bold text-orange-600">{formatMoney(booking.totalPrice)} MMK</p></div>
                </div>
              </div>

              <div className="text-center text-sm text-slate-500">
                Need to cancel or modify? Please <Link href="/about" className="text-purple-600 font-bold hover:underline">contact our support team</Link> providing your Booking ID.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}