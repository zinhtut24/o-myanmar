import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, ArrowLeft, CheckCircle2, Car, Calendar, CreditCard } from "lucide-react";
import Link from "next/link";

// Next.js 15 အတွက် params ကို Promise အနေနဲ့ သတ်မှတ်ခြင်း
export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  
  // ဤနေရာတွင် params ကို await ဖြင့် အရင်ခေါ်ယူပါမည်
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // URL ထဲက slug နာမည်နဲ့ ကိုက်ညီတဲ့ ခရီးစဉ်ကို Database ထဲကနေ ဆွဲထုတ်ခြင်း
  const tour = await prisma.tourPackage.findUnique({
    where: { slug: slug },
    include: {
      plans: {
        include: {
          prices: {
            include: { vehicle: true },
            orderBy: { price: 'asc' } 
          }
        },
        orderBy: { durationDays: 'asc' } 
      }
    }
  });

  // ခရီးစဉ် မတွေ့ပါက 404 Not Found စာမျက်နှာသို့ ပို့ရန်
  if (!tour) {
    notFound();
  }

  // ငွေကြေး ပုံစံပြောင်းသည့် Function
  const formatMoney = (amount: any) => {
    return new Intl.NumberFormat('en-MM').format(Number(amount)) + " MMK";
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* 1. HERO SECTION (ခေါင်းစဉ်နှင့် ပုံအကြီး) */}
      <div className="relative h-[60vh] min-h-[400px] w-full">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1582236528751-2db6d60a178e?q=80&w=2670&auto=format&fit=crop" 
            alt={tour.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>

        <div className="absolute z-10 top-8 left-4 sm:left-8">
          <Link href="/destinations" className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Destinations
          </Link>
        </div>

        <div className="absolute z-10 bottom-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="flex items-center gap-2 text-orange-400 font-semibold mb-3">
              <MapPin className="w-5 h-5" />
              <span className="tracking-wide uppercase text-sm">{tour.location}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              {tour.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ဘယ်ဘက်: ခရီးစဉ် အကြောင်းအရာများ */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">About this Tour</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {tour.description}
              </p>
              
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                <h4 className="font-bold text-purple-900 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-purple-600" /> 
                  All-Inclusive Package
                </h4>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Private comfortable vehicle</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Professional experienced driver</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Fuel and Toll gate fees</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Driver's food and accommodation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ညာဘက်: ဈေးနှုန်းများနှင့် Plan များ */}
          <div className="lg:col-span-2">
            {tour.plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                
                {/* Plan ခေါင်းစဉ် */}
                <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <Calendar className="w-6 h-6 text-orange-400" />
                    <h2 className="text-2xl font-bold">{plan.name}</h2>
                  </div>
                  <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-full text-sm">
                    {plan.durationDays} Days Tour
                  </span>
                </div>

                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-6">Select your preferred vehicle type to see the pricing details. All prices are fixed and inclusive of car, driver, fuel, and toll fees.</p>
                  
                  {/* ကားအမျိုးအစားအလိုက် ဈေးနှုန်းကတ်များ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plan.prices.map((priceData) => (
                      <div key={priceData.id} className="border border-gray-200 rounded-xl p-5 hover:border-purple-400 hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between">
                        
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
                        
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <Car className="w-4 h-4 text-purple-600" />
                                {priceData.vehicle.name}
                              </h3>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mt-1 inline-block">
                                Max {priceData.vehicle.capacity} Pax
                              </span>
                            </div>
                          </div>

                          <div className="space-y-2 mb-6">
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-600">Total Price:</span>
                              <span className="font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">
                                {formatMoney(priceData.price)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-t border-dashed border-gray-200 pt-2">
                              <span className="text-gray-500 flex items-center gap-1"><CreditCard className="w-3 h-3" /> Deposit Required:</span>
                              <span className="font-semibold text-gray-700">
                                {formatMoney(priceData.deposit)}
                              </span>
                            </div>
                          </div>

                          <Link href={`/booking?tour=${tour.slug}&plan=${plan.id}&price=${priceData.id}`} className="block text-center w-full bg-slate-900 text-white font-medium py-2.5 rounded-lg group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-orange-500 transition-all">
                            Book This Ride
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}