import { prisma } from "../../lib/prisma";
import { cookies } from "next/headers";
import { Star, MessageSquareQuote, ShieldCheck } from "lucide-react";
import ReviewForm from "./ReviewForm";
import Link from "next/link";

export default async function ReviewsPage() {
  // Login အခြေအနေ စစ်ဆေးခြင်း
  const cookieStore = await cookies();
  const isLoggedIn = !!cookieStore.get("user-token")?.value;

  // Database မှ Review များကို ဆွဲထုတ်ခြင်း (အသစ်ဆုံးကို အပေါ်ဆုံးပြမည်)
  const reviews = await prisma.review.findMany({
    include: {
      user: {
        select: { name: true, image: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  };

  // Type အလိုက် အရောင်ခွဲပေးမည့် Function
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "CAR": return <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Vehicle</span>;
      case "DRIVER": return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Driver</span>;
      case "SERVICE": return <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Service</span>;
      default: return <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">General</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 flex items-center justify-center gap-3">
            <MessageSquareQuote className="w-10 h-10 text-orange-500" /> Traveler Reviews
          </h1>
          <p className="text-slate-500 font-medium">Read what our happy customers have to say about their journey with us.</p>
        </div>

        {/* Review Form (Login ဝင်ထားသူများအတွက်သာ) */}
        {isLoggedIn ? (
          <ReviewForm />
        ) : (
          <div className="bg-purple-50 border border-purple-100 rounded-[2rem] p-8 text-center mb-10">
            <h3 className="text-lg font-black text-purple-900 mb-2">Traveled with us recently?</h3>
            <p className="text-sm text-purple-700 mb-4">Please log in to share your experience and write a review.</p>
            <Link href="/login" className="inline-block bg-purple-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200">
              Log In to Write Review
            </Link>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">No reviews yet. Be the first to leave one!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8">
                
                {/* User Info & Rating */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-black text-xl">
                      {review.user?.name ? review.user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900">{review.user?.name || "Anonymous Traveler"}</h3>
                      <p className="text-xs font-bold text-slate-400">{formatDate(review.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-orange-400 text-orange-400" : "fill-slate-100 text-slate-200"}`} />
                      ))}
                    </div>
                    {getTypeBadge(review.type)}
                  </div>
                </div>

                {/* Comment */}
                <p className="text-slate-600 leading-relaxed font-medium mt-4">
                  "{review.comment}"
                </p>

                {/* Admin Reply (Optional) */}
                {review.adminReply && (
                  <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-200 relative">
                    <div className="absolute -top-3 left-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3"/> Admin Reply
                    </div>
                    <p className="text-sm text-slate-700 italic mt-2 font-medium">
                      "{review.adminReply}"
                    </p>
                  </div>
                )}

              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}