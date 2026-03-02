import { prisma } from "../lib/prisma";
import { ShieldCheck, Car, Wallet, ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import HeroSection from "../components/HeroSection"; // 👈 Component အသစ်ကို Import လုပ်ပါမည်

export default async function Home() {
  
  // Database မှ Featured Tour များကို ဆွဲထုတ်ခြင်း
  const featuredTours = await prisma.tourPackage.findMany({
    where: { isFeatured: true },
    take: 8,
  });

  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION (Dynamic & Interactive ပြောင်းထားပါသည်) */}
      <HeroSection tours={featuredTours} />

      {/* 2. FEATURES SECTION (ဘာကြောင့် ရွေးချယ်သင့်လဲ) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <div className="w-14 h-14 mx-auto bg-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-orange-200">
                <Car className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comfortable Rides</h3>
              <p className="text-gray-600">From 4-seater saloons to Express buses, choose the perfect ride for your trip.</p>
            </div>
            <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100">
              <div className="w-14 h-14 mx-auto bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-200">
                <Wallet className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">All-Inclusive Pricing</h3>
              <p className="text-gray-600">Car rental, fuel, toll fees, and driver expenses are fully covered. No hidden costs.</p>
            </div>
            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="w-14 h-14 mx-auto bg-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
                <ShieldCheck className="text-white w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safe & Reliable</h3>
              <p className="text-gray-600">Experienced local drivers and well-maintained vehicles for a worry-free journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED DESTINATIONS */}
      {/* 3. POPULAR DESTINATIONS (Compact Card Slider) */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <span className="text-orange-500 font-bold tracking-widest uppercase text-[10px] mb-2 block">
                Recommended for you
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                Popular <span className="text-orange-500">Destinations</span>
              </h2>
            </div>
            <Link href="/destinations" className="text-sm font-bold text-purple-600 hover:text-orange-500 transition-colors flex items-center gap-1">
              View All Tours <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Compact Horizontal Slider */}
          <div className="flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory px-2">
            {featuredTours.map((tour) => (
              <Link 
                href={`/destinations/${tour.slug}`}
                key={tour.id} 
                className="relative flex-shrink-0 w-[260px] md:w-[280px] h-[380px] rounded-[2rem] overflow-hidden shadow-lg group snap-start transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-slate-100"
              >
                {/* ခရီးစဉ်ပုံ */}
                {tour.images && tour.images.length > 0 ? (
                  <img 
                    src={tour.images[0]} 
                    alt={tour.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-100" />
                )}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-1.5 mb-2 bg-white/20 backdrop-blur-md w-fit px-2.5 py-1 rounded-full border border-white/20">
                    <MapPin className="w-3 h-3 text-orange-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{tour.location}</span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-black mb-2 leading-tight group-hover:text-orange-400 transition-colors uppercase italic">
                    {tour.title}
                  </h3>
                  
                  <p className="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {tour.description}
                  </p>
                </div>

                {/* Price Tag (Optional - အရွယ်အစားသေးသေးလေးနှင့် ပြလိုလျှင်) */}
                <div className="absolute top-5 right-5">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] font-black px-2.5 py-1 rounded-lg uppercase shadow-sm">
                    Featured
                  </span>
                </div>
              </Link>
            ))}

            {/* View More Card */}
            <Link 
              href="/destinations"
              className="flex-shrink-0 w-[200px] md:w-[240px] h-[380px] rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-6 group snap-start hover:border-orange-500 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-colors">
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-white" />
              </div>
              <h3 className="text-sm font-black text-slate-900 uppercase italic">See More</h3>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}