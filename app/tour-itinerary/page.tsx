import { MapPin, Calendar, Clock, Map, Camera, Route, Navigation, ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";


  const tourItineraries = [
  // 1. Yangon to Bago Day Trip
  {
    id: "tour-bago",
    title: "Yangon to Bago Day Trip",
    location: "Bago Region",
    description: "Discover the ancient Hanthawaddy Kingdom's heritage, magnificent pagodas, and the historic 16th-century palace.",
    slug: "yangon-bago-day",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122045.312345678!2d96.481!3d17.330!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1737750!2sBago!5e0!3m2!1sen!2smm!4v123456789",
    images: [
      "image/bago.jpg",
      "image/bg-1.jpg",
      "image/bg-2.jpg",
      "image/bg-2.jpg"
    ],
    itinerary: [
      { day: 1, time: "07:30 AM", title: "Yangon Departure", desc: "Pick up from hotel and head towards Bago (approx. 2 hours)." },
      { day: 1, time: "09:30 AM", title: "Shwemawdaw Pagoda", desc: "Visit the tallest pagoda in Myanmar with a history over 1,000 years." },
      { day: 1, time: "11:30 AM", title: "Kanbawzathadi Palace", description: "Explore the golden replica of King Bayinnaung's 16th-century palace." },
      { day: 1, time: "01:30 PM", title: "Shwethalyaung Buddha", description: "Visit the massive reclining Buddha and the Four-Seated Buddha (Kyaik Pun)." },
      { day: 1, time: "04:30 PM", title: "Return Drive", description: "Heading back to Yangon after a day of history." }
    ]
  },

  // 2. Bagan to Mount Popa Day Trip
  {
    id: "tour-popa",
    title: "Bagan to Mount Popa Day Trip",
    location: "Mandalay Region",
    description: "Visit the mystical extinct volcano temple, home to Myanmar's 37 Nats (spirits).",
    slug: "bagan-popa-day",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.2345678!2d95.21!3d20.91!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb666!2sMount%20Popa!5e0!3m2!1sen!2smm!4v123456789",
    images: [
      "image/bagan-pp.jpg",
      "image/ba-1.jpg",
      "image/pp-1.jpg",
      "image/pp.jpg"
    ],
    itinerary: [
      { day: 1, time: "08:30 AM", title: "Departure from Bagan", desc: "Start driving through the palm-lined countryside." },
      { day: 1, time: "10:00 AM", title: "Palm Sugar Workshop", desc: "Learn how local villagers make jaggery and palm wine (Toddy)." },
      { day: 1, time: "11:30 AM", title: "Mount Popa Climb", desc: "Climb 777 steps to the top of Taung Kalat to see the Nat shrines." },
      { day: 1, time: "03:00 PM", title: "Popa Mountain Resort", desc: "Enjoy coffee with a stunning view of the Taung Kalat monastery." },
      { day: 1, time: "05:00 PM", title: "Sunset in Bagan", desc: "Return to Bagan in time for the evening sunset." }
    ]
  },

  // 3. Mandalay City Sightseeing
  {
    id: "tour-mdy-city",
    title: "Mandalay Royal City Tour",
    location: "Mandalay Region",
    description: "A cultural journey through the last royal capital, featuring world-record pagodas and wooden monasteries.",
    slug: "mandalay-city-sightseeing",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14781.23456!2d96.08!3d21.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6d!2sMandalay!5e0!3m2!1sen!2smm!4v123456789",
    images: [
      "image/mdyss.jpg",
      "image/mdyss.jpg",
      "image/mdyss.jpg",
      "image/mdyss.jpg"
    ],
    itinerary: [
      { day: 1, time: "08:30 AM", title: "Mahamuni Pagoda", desc: "Visit the highly revered Buddha image covered in thick gold leaf." },
      { day: 1, time: "10:30 AM", title: "Mandalay Palace", desc: "Explore the historic Royal Palace complex." },
      { day: 1, time: "01:30 PM", title: "Kuthodaw Pagoda", desc: "See the world's largest book made of 729 marble slabs." },
      { day: 1, time: "03:30 PM", title: "Shwenandaw Monastery", desc: "Marvel at the exquisite 19th-century teak wood carvings." },
      { day: 1, time: "05:30 PM", title: "Mandalay Hill", desc: "Watch the sunset overlooking the whole city and the Irrawaddy River." }
    ]
  },

  // 4. Mandalay to Pyin Oo Lwin Day Trip
  {
    id: "tour-mdy-pol",
    title: "Mandalay to Pyin Oo Lwin Day Trip",
    location: "Mandalay Region",
    description: "Escape to the cool hill station, botanical gardens, and colonial-style town.",
    slug: "mandalay-pol-day",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3698.234!2d96.46!3d22.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30cb6!2sPyin%20Oo%20Lwin!5e0!3m2!1sen!2smm!4v123456789",
    images: [
      "image/mdy-pol.jpg",
      "image/mdy-pol.jpg",
      "image/mdy-pol.jpg",
      "image/mdy-pol.jpg"
    ],
    itinerary: [
      { day: 1, time: "08:00 AM", title: "Mountain Drive", desc: "Head up to the Shan plateau (approx. 1.5 hours drive)." },
      { day: 1, time: "10:00 AM", title: "Kandawgyi Garden", desc: "Enjoy the lush botanical gardens and colorful flowers." },
      { day: 1, time: "01:00 PM", title: "Pwe Kauk Waterfall", desc: "Visit the popular local waterfalls and market stalls." },
      { day: 1, time: "03:00 PM", title: "Purcell Tower", desc: "See the colonial-era clock tower and explore the town by horse carriage." },
      { day: 1, time: "05:00 PM", title: "Drive back to Mandalay", desc: "Heading back down to the plains of Mandalay." }
    ]
  },

  // 5. Airport Pick-up / Drop-off
  {
    id: "tour-transfer",
    title: "Airport Transfer Service",
    location: "Yangon / Mandalay",
    description: "Stress-free airport pickup or drop-off with a professional driver waiting for you.",
    slug: "airport-transfer",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15269!2d96.13!3d16.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c19!2sYangon%20International%20Airport!5e0!3m2!1sen!2smm!4v123456789",
    images: [
      "image/transfer.jpg",
      "image/transfer.jpg",
      "image/transfer.jpg",
      "image/transfer.jpg"
    ],
    itinerary: [
      { day: 1, time: "Arrival Time", title: "Meeting Driver", desc: "Driver will wait at the arrival hall with your name on a signboard." },
      { day: 1, time: "Ongoing", title: "Comfortable Ride", desc: "Enjoy a safe and cool ride directly to your hotel." },
      { day: 1, time: "Ongoing", title: "City Info", desc: "Our driver can provide basic tips about the city along the way." }
    ]
  }
  // အစ်ကို့ရဲ့ တခြားခရီးစဉ်တွေကိုလည်း ဒီပုံစံအတိုင်း အောက်မှာ ထပ်တိုးသွားလို့ရပါတယ်...
];

export default function TourItineraryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 border-b border-slate-100">
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Explore Our <span className="text-orange-600">Journeys</span>
        </h1>
        <p className="text-slate-500 font-medium">Detailed daily activities and route maps for every destination.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-32">
          {tourItineraries.map((tour) => (
            <div key={tour.id} className="group">
              
              {/* ✅ 1. ပုံများကို Grid ပုံစံဖြင့် များများပြခြင်း */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8 h-[400px]">
                <div className="md:col-span-2 h-full rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                  <img src={tour.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Main" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:col-span-1 h-full">
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-full">
                    <img src={tour.images[1]} className="w-full h-full object-cover" alt="Sub 1" />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 h-full">
                    <img src={tour.images[2]} className="w-full h-full object-cover" alt="Sub 2" />
                  </div>
                </div>
                <div className="hidden md:block rounded-3xl overflow-hidden shadow-sm border border-slate-100 h-full relative">
                  <img src={tour.images[3]} className="w-full h-full object-cover" alt="Sub 3" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold text-sm backdrop-blur-[2px]">
                    + More Photos
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* ✅ 2. Itinerary Detail (Middle Section) */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="flex items-center gap-3 text-orange-600 font-semibold text-xs uppercase tracking-[0.2em]">
                    <MapPin className="w-4 h-4" /> {tour.location}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900">{tour.title}</h2>
                  <p className="text-slate-600 leading-relaxed font-normal">{tour.description}</p>
                  
                  <div className="space-y-6 pt-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Timeline
                    </h3>
                    <div className="space-y-6 border-l-2 border-slate-100 ml-3">
                      {tour.itinerary.map((step, i) => (
                        <div key={i} className="relative pl-8 group/item">
                          <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-slate-200 group-hover/item:bg-orange-500 transition-colors border-4 border-white shadow-sm"></div>
                          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-wider mb-1">{step.time}</p>
                          <h4 className="font-bold text-slate-800 text-base mb-1">{step.title}</h4>
                          <p className="text-sm text-slate-500 font-normal leading-relaxed">{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link href={`/destinations/${tour.slug}`} className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-orange-600 transition-all shadow-xl shadow-slate-200">
                    See Details & Pricing <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* ✅ 3. Side Mini Map (Sticky Map) */}
                <div className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24 space-y-6">
                    <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 shadow-inner overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-500 mb-4 flex items-center gap-2 uppercase tracking-widest">
                        <Navigation className="w-4 h-4 text-blue-500" /> Interactive Route
                      </h4>
                      {/* Google Maps Embed */}
                      <div className="rounded-2xl overflow-hidden h-64 border border-slate-200 shadow-sm">
                        <iframe 
                          src={tour.mapEmbedUrl}
                          className="w-full h-full border-0"
                          loading="lazy"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <a 
                        href={`https://www.google.com/maps/dir/Yangon/${tour.location}`} 
                        target="_blank" 
                        className="mt-4 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 hover:text-orange-600 uppercase tracking-widest transition-colors"
                      >
                        Open in Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                      <p className="text-xs font-bold text-orange-800 mb-2">Need a Custom Route?</p>
                      <p className="text-[10px] text-orange-600 leading-relaxed font-medium">We can adjust the itinerary based on your preferences. Contact our team for a personalized plan.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}