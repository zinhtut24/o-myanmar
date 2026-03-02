"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Headset, Info, Map, MessageSquareHeart } from "lucide-react"; // 👈 Icon အသစ် ၂ ခု ထပ်ထည့်ထားသည်

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: "Destinations", href: "/destinations", icon: <Compass className="w-4 h-4" /> },
    { name: "Tour Itineraries", href: "/tour-itinerary", icon: <Map className="w-4 h-4" /> }, // 👈 အသစ် ထပ်တိုးထားသည်
    { name: "Reviews", href: "/reviews", icon: <MessageSquareHeart className="w-4 h-4" /> }, // 👈 အသစ် ထပ်တိုးထားသည်
    { name: "Services", href: "/services", icon: <Headset className="w-4 h-4" /> },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="hidden md:flex items-center space-x-8">
      {links.map((link) => {
        // လက်ရှိရောက်နေသော လမ်းကြောင်းဖြစ်ပါက isActive သည် true ဖြစ်ပါမည်
        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
        
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex items-center gap-1.5 font-medium transition-all duration-300 py-2 relative ${
              isActive ? "text-purple-700" : "text-gray-600 hover:text-orange-500"
            }`}
          >
            {link.icon} {link.name}
            
            {/* အောက်ခံ မျဉ်းကြောင်းလေး (ရောက်နေတဲ့ Page မှာဆိုရင် ပေါ်လာပါမည်) */}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full shadow-sm"></span>
            )}
          </Link>
        );
      })}
    </div>
  );
}