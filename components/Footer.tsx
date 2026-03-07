import Link from 'next/link';
import { Facebook, MessageCircle, Mail, Phone, MapPin, Music2 } from 'lucide-react';

export default function Footer() {
  const phoneNumber = "+959975448448";
  const emailAddress = "zinhtutnaing2410@gmail.com";

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* 1. Company Info & Socials */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
              O! Myanmar Travel
            </h2>
            <p className="text-sm leading-relaxed font-normal">
              Experience the enchanting beauty of Myanmar. We provide all-inclusive tour packages with comfortable rides, expert drivers, and unforgettable memories.
            </p>
            <div className="flex space-x-4">
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all p-2.5 bg-slate-800 rounded-xl hover:bg-blue-600 shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              {/* WhatsApp/Viber */}
              <a href={`https://wa.me/${phoneNumber.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all p-2.5 bg-slate-800 rounded-xl hover:bg-green-600 shadow-sm">
                <MessageCircle className="w-5 h-5" />
              </a>
              {/* TikTok */}
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-all p-2.5 bg-slate-800 rounded-xl hover:bg-pink-600 shadow-sm">
                <Music2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm font-normal">
              <li><Link href="/" className="hover:text-orange-400 transition-colors flex items-center gap-2">Home</Link></li>
              <li><Link href="/destinations" className="hover:text-orange-400 transition-colors flex items-center gap-2">All Destinations</Link></li>
              <li><Link href="/tour-itinerary" className="hover:text-orange-400 transition-colors flex items-center gap-2">Tour Itineraries</Link></li>
              <li><Link href="/about" className="hover:text-orange-400 transition-colors flex items-center gap-2">About Us</Link></li>
              <li><Link href="/about" className="hover:text-orange-400 transition-colors flex items-center gap-2">Contact Support</Link></li>
            </ul>
          </div>

          {/* 3. Contact Info (နှိပ်လိုက်လျှင် တန်းပြီး အလုပ်လုပ်မည့် နေရာ) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-5 text-sm font-normal">
              {/* Address (Google Maps သို့ ချိတ်ထားသည်) */}
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a 
                  href="https://www.google.com/maps/dir/Yangon/Bago5" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  No. 133, 2nd Floor, MinMaHaw St, Dawbon, Yangon
                </a>
              </li>

              {/* ✅ Phone (နှိပ်လိုက်လျှင် ဖုန်းခေါ်မည်) */}
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a 
                  href={`tel:${phoneNumber}`} 
                  className="hover:text-orange-400 transition-colors font-semibold"
                  title="Click to Call"
                >
                  +959 975 448 448
                </a>
              </li>

              {/* ✅ Email (နှိပ်လိုက်လျှင် Email App ပွင့်မည်) */}
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a 
                  href={`mailto:${emailAddress}`} 
                  className="hover:text-orange-400 transition-colors truncate"
                  title="Click to Send Email"
                >
                  {emailAddress}
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-xs font-normal text-slate-500">
          <p>&copy; {new Date().getFullYear()} O! Myanmar Travel. Created with ❤️ for your best journey.</p>
        </div>
      </div>
    </footer>
  );
}