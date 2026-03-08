import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";
import { MapPin, ArrowLeft, CheckCircle2, Car, Calendar, CreditCard, UserCheck, Info } from "lucide-react";
import Link from "next/link";

export default async function TourDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

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

  if (!tour) notFound();

  // 💡 Guide ပါ/မပါ စစ်ဆေးခြင်း
  const isGuideIncluded = tour.description.toLowerCase().includes("guide");

  // ✅ ငွေကြေး ပုံစံပြောင်းသည့် Function ($ ပြောင်းထားပါသည်)
  const formatMoney = (amount: any) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'MMK' }).format(Number(amount));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <div className="absolute inset-0 z-0">
          <img 
              src={tour.images && tour.images.length > 0 
                ? tour.images[0] 
                : "https://images.unsplash.com/photo-1582236528751-2db6d60a178e?q=80&w=2670&auto=format&fit=crop"
              } 
              alt={tour.title} 
              className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
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
            {/* font-black မှ font-bold သို့ ပြောင်းလဲထားသည် */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight drop-shadow-lg">
              {tour.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 italic">
                <Info className="w-5 h-5 text-orange-500" /> About Tour
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {tour.description}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md border-t-4 border-t-purple-600 space-y-5">
              <div>
                {/* font-black မှ font-bold သို့ ပြောင်းလဲထားသည် */}
                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4 uppercase text-sm tracking-widest">
                  <CheckCircle2 className="w-5 h-5 text-green-500" /> 
                  Price Inclusive
                </h4>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg"><Car className="w-4 h-4 text-purple-600" /> Private clean vehicle</li>
                  <li className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg"><UserCheck className="w-4 h-4 text-purple-600" /> Professional Driver</li>
                  <li className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Fuel & Toll gate fees</li>
                  <li className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> Driver food/accommodation</li>
                </ul>
              </div>

              <div className={`p-4 rounded-2xl border-2 border-dashed ${isGuideIncluded ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
                <h4 className={`font-bold text-sm mb-2 flex items-center gap-2 ${isGuideIncluded ? 'text-green-800' : 'text-orange-800'}`}>
                   {isGuideIncluded ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                   Tour Guide Service
                </h4>
                {isGuideIncluded ? (
                  <div className="space-y-2">
                    <p className="text-xs text-orange-700 leading-relaxed">
                      Tour guide is **Not Included** in this car rental price.
                    </p>
                    <div className="bg-white/60 p-2 rounded-lg border border-orange-100">
                       <p className="text-[10px] font-bold text-slate-500 uppercase">Optional Guide Fee:</p>
                       {/* MMK မှ $ သို့ ပြောင်းလဲထားသည် */}
                       <p className="text-sm font-bold text-orange-600">$20 ~ $50 - $ 80 / day</p>
                       <p className="text-[10px] text-slate-400 font-medium">*Paid directly to guide</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs text-orange-700 leading-relaxed">
                      Tour guide is **Not Included** in this car rental price.
                    </p>
                    <div className="bg-white/60 p-2 rounded-lg border border-orange-100">
                       <p className="text-[10px] font-bold text-slate-500 uppercase">Optional Guide Fee:</p>
                       {/* MMK မှ $ သို့ ပြောင်းလဲထားသည် */}
                       <p className="text-sm font-bold text-orange-600">$20 ~ $50 - $ 80 / day</p>
                       <p className="text-[10px] text-slate-400 font-medium">*Paid directly to guide</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {tour.plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                <div className="bg-slate-900 px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                    <Calendar className="w-6 h-6 text-orange-400" />
                    <h2 className="text-xl font-bold tracking-tight">{plan.name}</h2>
                  </div>
                  {/* font-black မှ font-bold သို့ ပြောင်းလဲထားသည် */}
                  <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-tighter italic">
                    {plan.durationDays} Days Tour
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plan.prices.map((priceData) => (
                      <div key={priceData.id} className="border-2 border-slate-100 rounded-3xl p-5 hover:border-purple-500 hover:shadow-xl transition-all group relative flex flex-col justify-between">
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              {/* font-black မှ font-bold သို့ ပြောင်းလဲထားသည် */}
                              <h3 className="font-bold text-slate-800 text-lg uppercase tracking-tighter">
                                {priceData.vehicle.name}
                              </h3>
                              <span className="text-[10px] font-semibold text-slate-400 border border-slate-200 px-2 py-0.5 rounded-full uppercase tracking-widest mt-1 inline-block">
                                Capacity: {priceData.vehicle.capacity} Pax
                              </span>
                            </div>
                            <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                               <Car className="w-5 h-5 text-slate-400 group-hover:text-purple-600" />
                            </div>
                          </div>

                          <div className="space-y-3 mb-6">
                            <div className="flex justify-between items-end">
                              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Cost</span>
                              {/* font-black မှ font-bold သို့ ပြောင်းလဲထားသည် */}
                              <span className="font-bold text-2xl text-slate-900 leading-none">
                                {formatMoney(priceData.price)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl border border-dashed border-slate-200">
                              <span className="text-[10px] font-bold text-slate-500 uppercase">Deposit Now</span>
                              {/* font-black မှ font-bold သို့ ပြောင်းလဲထားသည် */}
                              <span className="font-bold text-purple-700">
                                {formatMoney(priceData.deposit)}
                              </span>
                            </div>
                          </div>

                          <Link href={`/booking?tour=${tour.slug}&plan=${plan.id}&price=${priceData.id}`} className="block text-center w-full bg-slate-900 text-white font-bold text-xs uppercase tracking-[0.2em] py-4 rounded-2xl group-hover:bg-purple-600 transition-all shadow-lg shadow-slate-200">
                            Book This Trip
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