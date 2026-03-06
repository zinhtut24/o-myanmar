"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Headset, Info, Map, MessageSquareHeart } from "lucide-react";

export default function NavLinks({ isMobile, onClick }: { isMobile?: boolean, onClick?: () => void }) {
  const pathname = usePathname();

  const links = [
    { name: "Destinations", href: "/destinations", icon: <Compass className="w-4 h-4" /> },
    { name: "Itineraries", href: "/tour-itinerary", icon: <Map className="w-4 h-4" /> },
    { name: "Reviews", href: "/reviews", icon: <MessageSquareHeart className="w-4 h-4" /> },
    { name: "Services", href: "/services", icon: <Headset className="w-4 h-4" /> },
    { name: "About", href: "/about", icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className={isMobile ? "flex flex-col space-y-1" : "hidden md:flex items-center space-x-8"}>
      {links.map((link) => {
        const isActive = pathname === link.href || pathname?.startsWith(`${link.href}/`);
        
        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClick} // 👈 နှိပ်လိုက်ရင် Menu ပိတ်သွားစေရန်
            className={`flex items-center gap-3 font-semibold transition-all duration-300 rounded-xl ${
              isMobile ? "px-4 py-4 text-sm" : "py-2 relative"
            } ${
              isActive 
                ? "text-purple-700 bg-purple-50 md:bg-transparent" 
                : "text-gray-600 hover:text-orange-500 hover:bg-slate-50 md:hover:bg-transparent"
            }`}
          >
            {link.icon} {link.name}
            
            {/* Desktop အောက်ခံ မျဉ်းကြောင်းလေး */}
            {!isMobile && isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 rounded-full"></span>
            )}
          </Link>
        );
      })}
    </div>
  );
}