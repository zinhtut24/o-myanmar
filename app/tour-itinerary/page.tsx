import { MapPin, Calendar, Clock, Map, Camera, Route } from "lucide-react";
import Link from "next/link";

// 🌟 Database အစား Code ထဲတွင် Manually ထည့်သွင်းထားသော ခရီးစဉ် Data များ
const tourItineraries = [
  {
    id: "tour-1",
    title: "Bagan Magical Sunset Tour",
    location: "Bagan, Mandalay Region",
    description: "Experience the magic of thousands of ancient temples, spectacular hot air balloons, and the breathtaking sunset over the Ayeyarwady River.",
    slug: "bagan-tour",
    images: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=1200&auto=format&fit=crop", // Main Image
      "https://images.unsplash.com/photo-1528096236683-116e0cb70e17?q=80&w=800&auto=format&fit=crop", 
      "https://images.unsplash.com/photo-1594998059632-1563cebe7600?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590454374648-522194cb021a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542385150-1376f9ec67fa?q=80&w=800&auto=format&fit=crop"
    ],
    plans: [
      {
        id: "plan-1a",
        name: "3 Days 2 Nights Full Package",
        durationDays: 3,
        itinerary: [
          { day: 1, title: "Arrival & Sunset Viewing", description: "Arrive in Bagan. Check-in to hotel. Afternoon visit to Shwezigon Pagoda and enjoy a magnificent sunset from a panoramic viewing mound." },
          { day: 2, title: "Ancient Temple Exploration", description: "Full day tour exploring Ananda Temple, Dhammayangyi, and Thatbyinnyu. Visit a traditional lacquerware workshop to see local craftsmanship." },
          { day: 3, title: "Morning Market & Departure", description: "Visit the vibrant Nyaung U morning market. Final photoshoots at scenic spots before heading to the airport/bus station." }
        ]
      }
    ]
  },
  {
    id: "tour-2",
    title: "Inle Lake & Kalaw Trekking Nature Trip",
    location: "Inle Lake, Shan State",
    description: "Discover the unique leg-rowing fishermen, floating gardens, and the cool, refreshing pine hills of Kalaw in this ultimate nature getaway.",
    slug: "inle-kalaw-tour",
    images: [
      "https://images.unsplash.com/photo-1570535358057-0a1f94d9b23b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582200236173-903cbfaef3f5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601931536767-4226cfd21f8a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595856111328-98e3b45591bf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555518413-5b8d2e8b2bd4?q=80&w=800&auto=format&fit=crop"
    ],
    plans: [
      {
        id: "plan-2a",
        name: "4 Days 3 Nights Adventure",
        durationDays: 4,
        itinerary: [
          { day: 1, title: "Arrival in Kalaw", description: "Arrive in the peaceful hill station of Kalaw. Enjoy the cool weather and explore the colonial-era train station and local market." },
          { day: 2, title: "Kalaw to Inle Trekking", description: "Start the scenic trek through tea plantations and Danu and Pa-O tribal villages. Experience local culture and authentic meals." },
          { day: 3, title: "Inle Lake Boat Tour", description: "Take a traditional long-tail boat to see the floating gardens, Phaung Daw Oo Pagoda, and the famous leg-rowing fishermen." },
          { day: 4, title: "Indein Ruins & Departure", description: "Visit the hidden Indein village with its hundreds of ancient stupas. Afternoon transfer for departure." }
        ]
      }
    ]
  },
  {
    id: "tour-3",
    title: "Ngapali Beach Paradise Relaxation",
    location: "Ngapali, Rakhine State",
    description: "Relax on the pristine white sands of Ngapali Beach. Enjoy crystal clear waters, fresh seafood, and ultimate tranquility.",
    slug: "ngapali-tour",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520188740392-68be68d18206?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=800&auto=format&fit=crop"
    ],
    plans: [
      {
        id: "plan-3a",
        name: "3 Days 2 Nights Getaway",
        durationDays: 3,
        itinerary: [
          { day: 1, title: "Welcome to Paradise", description: "Airport pickup and transfer to your beachfront resort. Spend the day relaxing by the sea and enjoying the sunset." },
          { day: 2, title: "Island Hopping & Snorkeling", description: "Take a boat trip to Pearl Island for snorkeling in crystal clear water. Enjoy a fresh seafood BBQ lunch on the beach." },
          { day: 3, title: "Local Fishing Village & Departure", description: "Morning bike ride to a nearby fishing village to see the local lifestyle. Afternoon departure." }
        ]
      }
    ]
  },
  {
    id: "tour-4",
    title: "Mandalay & Pyin Oo Lwin Cultural Trip",
    location: "Mandalay Region",
    description: "Explore the last royal capital of Myanmar, the iconic U Bein Bridge, and the beautiful botanical gardens of Pyin Oo Lwin.",
    slug: "mandalay-pol-tour",
    images: [
      "https://images.unsplash.com/photo-1579294241617-578fdbdddfa8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1629807530514-c13f6de83d99?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543058866-abde11b514df?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583492723730-84dc54d852ad?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594998059632-1563cebe7600?q=80&w=800&auto=format&fit=crop"
    ],
    plans: [
      {
        id: "plan-4a",
        name: "4 Days 3 Nights Classic Tour",
        durationDays: 4,
        itinerary: [
          { day: 1, title: "Mandalay Royal Palace", description: "Visit the magnificent Mandalay Palace, Kuthodaw Pagoda (the world's largest book), and sunset at Mandalay Hill." },
          { day: 2, title: "Mingun & Sagaing", description: "Boat ride across the Ayeyarwady River to Mingun Pahtodawgyi. Afternoon visit to the peaceful Sagaing Hill and U Bein Bridge for sunset." },
          { day: 3, title: "Journey to Pyin Oo Lwin", description: "Drive up to the scenic hill station of Pyin Oo Lwin. Visit the National Kandawgyi Botanical Gardens and Purcell Tower." },
          { day: 4, title: "Dat Taw Gyaint Waterfall & Departure", description: "Morning hike to the stunning Dat Taw Gyaint waterfall before heading back to Mandalay for departure." }
        ]
      }
    ]
  }
];

export default function TourItineraryPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
            Our Proud Journeys
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Detailed <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">Tour Itineraries</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Explore the beautiful destinations, daily activities, and memorable experiences from our carefully crafted tour packages.
          </p>
        </div>
      </div>

      {/* Tours List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-24">
          
          {tourItineraries.map((tour) => (
            <div key={tour.id} className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              
              {/* Tour Header Info */}
              <div className="p-8 md:p-12 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 text-orange-600 font-bold text-sm uppercase tracking-widest mb-4">
                    <MapPin className="w-5 h-5" /> {tour.location}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{tour.title}</h2>
                  <p className="text-slate-600 leading-relaxed text-lg font-medium">{tour.description}</p>
                </div>
                
                <Link href={`/destinations/${tour.slug}`} className="shrink-0 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-orange-500/30 flex items-center justify-center gap-3 w-full lg:w-auto">
                  <Route className="w-5 h-5"/> Book This Tour
                </Link>
              </div>

              {/* Photo Gallery */}
              {tour.images && tour.images.length > 0 && (
                <div className="p-8 md:p-12 bg-slate-50/50">
                  <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3 uppercase tracking-tighter">
                    <Camera className="w-7 h-7 text-purple-600" /> Tour Highlights Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* ပထမဆုံးပုံကို အကြီးပြမည် */}
                    <div className="md:col-span-2 md:row-span-2 rounded-[1.5rem] overflow-hidden shadow-md group relative">
                      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                      <img 
                        src={tour.images[0]} 
                        alt="Tour Main" 
                        className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                    {/* ကျန်တဲ့ပုံတွေကို အသေးပြမည် */}
                    {tour.images.slice(1, 5).map((img, i) => (
                      <div key={i} className="rounded-[1.5rem] overflow-hidden shadow-md group relative">
                         <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                        <img 
                          src={img} 
                          alt={`Tour Gallery ${i+1}`} 
                          className="w-full h-full object-cover aspect-video md:aspect-[4/3] group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Day-by-Day Itinerary Plans */}
              {tour.plans.length > 0 && (
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl font-black text-slate-800 mb-10 flex items-center gap-3 uppercase tracking-tighter">
                    <Map className="w-7 h-7 text-orange-500" /> Day-By-Day Itinerary
                  </h3>

                  <div className="space-y-12">
                    {tour.plans.map((plan) => (
                      <div key={plan.id} className="border-l-4 border-l-purple-500 pl-8 md:pl-10 relative ml-2 md:ml-4">
                        {/* Dot indicator */}
                        <div className="absolute w-5 h-5 bg-purple-500 rounded-full -left-[12px] top-1 border-4 border-white shadow-sm"></div>
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                          <h4 className="text-2xl font-black text-slate-900">{plan.name}</h4>
                          <span className="bg-purple-50 text-purple-700 border border-purple-100 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase flex items-center gap-2 w-fit">
                            <Clock className="w-4 h-4"/> {plan.durationDays} Days Tour
                          </span>
                        </div>

                        {/* Itinerary Timeline */}
                        {plan.itinerary && (
                          <div className="space-y-6">
                            {plan.itinerary.map((day, i) => (
                              <div key={i} className="bg-white p-6 md:p-8 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                                  <div className="bg-orange-500 text-white px-4 py-2 rounded-xl text-sm font-black uppercase tracking-widest shrink-0 shadow-sm group-hover:bg-orange-600 transition-colors">
                                    Day {day.day}
                                  </div>
                                  <h5 className="font-black text-slate-800 text-xl">{day.title}</h5>
                                </div>
                                <p className="text-slate-600 leading-relaxed font-medium text-lg sm:pl-[5.5rem]">
                                  {day.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                        
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}