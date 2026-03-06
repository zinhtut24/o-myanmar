import Link from "next/link";
import { Clock } from "lucide-react";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ id: string }> }) {
  const resolvedParams = await searchParams;
  const bookingId = resolvedParams.id;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-orange-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Received!</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thank you for choosing O! Myanmar Travel. Your booking ID is <span className="font-mono font-bold text-purple-600">#{bookingId.slice(-6).toUpperCase()}</span>. <br/><br/>
          <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg text-sm font-medium">Status: Pending Confirmation</span><br/><br/>
          Our team is currently reviewing your request and payment details. We will contact you shortly to fully confirm your trip.
        </p>
        
        <Link href="/" className="inline-block bg-slate-900 text-white font-semibold px-8 py-3 rounded-full hover:bg-slate-800 transition-colors">
          Back to Home
        </Link>
      </div>
    </div>
  );
}