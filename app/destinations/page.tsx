import { prisma } from "../../lib/prisma";
import { MapPin, ArrowRight, CalendarDays } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "All Destinations | O! Myanmar Travel",
  description: "Explore all our tour packages and destinations across Myanmar.",
};

export default async function DestinationsPage() {
  // Database ထဲက ခရီးစဉ်များအားလုံးကို ၎င်းတို့ရဲ့ Plan များနှင့်တကွ ဆွဲထုတ်ခြင်း
  const destinations = await prisma.tourPackage.findMany({
    include: {
      plans: true, // ခရီးစဉ်တစ်ခုမှာ ဘယ်နှစ်ရက် Plan တွေရှိလဲဆိုတာ သိရအောင်ပါ
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* မျက်နှာစာ ခေါင်းစဉ်ပိုင်း (Header Section) */}
      <div className="bg-slate-900 py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 mb-4">
          Explore All Destinations
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          From the ancient temples of Bagan to the pristine beaches of Ngwe Saung, find your perfect getaway with our all-inclusive packages.
        </p>
      </div>

      {/* ခရီးစဉ် ကတ်များ ပြသမည့် အပိုင်း (Tours Grid) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {destinations.map((tour) => (
            <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full group">
              
              {/* ပုံပြသမည့် နေရာ */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                
                {/* ပုံအစစ်ပေါ်လာစေမည့် Code အပိုင်း */}
                {tour.images && tour.images.length > 0 && (
                  <img 
                    src={tour.images[0]} 
                    alt={tour.title} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                )}

                {/* ပုံပေါ်မှ အရောင်ပါးပါးလေး အုပ်ထားခြင်း (Opacity လျှော့ထားသည်) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-orange-900 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                
                {tour.isFeatured && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    Hot
                  </div>
                )}
              </div>

              {/* စာသားများနှင့် အချက်အလက်များ */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-purple-600 text-sm font-semibold mb-2">
                  <MapPin className="w-4 h-4" />
                  {tour.location}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tour.title}</h3>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {tour.description}
                </p>

                {/* Plan အရေအတွက် ပြခြင်း */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <CalendarDays className="w-4 h-4 text-orange-500" />
                  <span>Available in <strong>{tour.plans.length}</strong> different plans</span>
                </div>

                {/* အသေးစိတ်ကြည့်ရန် ခလုတ် */}
                <Link href={`/destinations/${tour.slug}`} className="block w-full text-center bg-purple-50 text-purple-700 py-3 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-colors border border-purple-100 hover:border-transparent">
                  View Tour Details
                </Link>
              </div>

            </div>
          ))}

        </div>
      </div>

    </div>
  );
}