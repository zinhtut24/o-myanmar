"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative, Navigation } from "swiper/modules";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// Swiper Styles
import "swiper/css";
import "swiper/css/effect-creative";

export default function HeroSection({ tours }: { tours: any[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!tours || tours.length === 0) return null;

  return (
    <section className="relative h-[85vh] min-h-[650px] w-full overflow-hidden bg-black flex items-center">
      
      {/* 1. Background Image Layer */}
      <div className="absolute inset-0 z-0">
        {tours.map((tour, index) => (
          <div
            key={`bg-${tour.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img src={tour.images?.[0]} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent"></div>
          </div>
        ))}
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* 2. Left Side: Content Section */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {tours.map((tour, index) => (
            <div
              key={`content-${tour.id}`}
              className={`transition-all duration-1000 ${
                index === activeIndex ? "opacity-100 translate-y-0 relative" : "opacity-0 translate-y-10 absolute pointer-events-none"
              }`}
            >
              <div className="flex items-center gap-2 text-orange-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
                <MapPin className="w-3 h-3" /> {tour.location}
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight uppercase italic tracking-tighter drop-shadow-lg">
                {tour.title}
              </h2>
              <p className="text-gray-300 text-xs md:text-sm mb-10 line-clamp-3 leading-relaxed border-l-2 border-orange-600 pl-4 opacity-70 max-w-sm">
                {tour.description}
              </p>
              <Link
                href={`/destinations/${tour.slug}`}
                className="inline-flex items-center gap-3 bg-orange-600 text-white px-8 py-3 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* 3. Right Side: Wide Spaced Uniform Stack Slider */}
        <div className="lg:col-span-7 w-full flex justify-end items-center relative md:pr-10">
          
          <div className="relative w-full max-w-[350px] md:max-w-[450px]">
            <Swiper
              modules={[Autoplay, EffectCreative, Navigation]}
              grabCursor={true}
              effect={"creative"}
              loop={true}
              speed={1200}
              creativeEffect={{
                // 👈 ဘယ်ဘက်သို့ ရောက်သွားသောကတ် (မှိန်မှိန်လေး ကျန်နေစေမည်)
                prev: {
                  translate: ["-35%", 0, -300],
                  opacity: 0.1,
                  scale: 1, 
                },
                // 👈 ညာဘက်အနောက်မှ ကတ်များ (Spacing ကို ချဲ့ပေးထားသဖြင့် နောက်ကတ်ကို ကောင်းကောင်းမြင်ရမည်)
                next: {
                  translate: ["35%", 0, -200], // 👈 Spacing ကို 35% အထိ ချဲ့ထားပါသည်
                  opacity: 0.5,
                  scale: 1, 
                },
              }}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              navigation={{
                nextEl: ".hero-next",
                prevEl: ".hero-prev",
              }}
              className="wide-stack-swiper !overflow-visible"
            >
              {tours.map((tour) => (
                <SwiperSlide key={`card-${tour.id}`} className="!flex justify-end">
                  <div className="relative w-[260px] h-[360px] md:w-[320px] md:h-[440px] rounded-[3rem] overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5 group cursor-pointer bg-zinc-900">
                    <img src={tour.images?.[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-10 left-8 right-8">
                      <p className="text-white text-base md:text-xl font-black uppercase italic leading-tight drop-shadow-md">
                        {tour.title}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-10 justify-end pr-8">
              <button className="hero-prev w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-600 transition-all shadow-lg active:scale-90">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="hero-next w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-orange-600 transition-all shadow-lg active:scale-90">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      <style jsx global>{`
        .wide-stack-swiper .swiper-slide {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}