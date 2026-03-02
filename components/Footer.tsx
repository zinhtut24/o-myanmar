import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400 mb-4">
              O! Myanmar Travel
            </h2>
            <p className="text-sm leading-relaxed mb-6">
              Experience the enchanting beauty of Myanmar. We provide all-inclusive tour packages with comfortable rides, expert drivers, and unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-400 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-orange-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-orange-400 transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
              <li><Link href="/destinations" className="hover:text-purple-400 transition-colors">All Destinations</Link></li>
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span>No. 123, Travel Street, Yangon, Myanmar</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span>+95 9 123 456 789</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <span>info@omyalmar.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} O! Myanmar Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}