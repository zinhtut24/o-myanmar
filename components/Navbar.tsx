"use client"; // 👈 Menu အဖွင့်အပိတ်လုပ်ရန် Client Component ပြောင်းရပါမည်

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, LayoutDashboard, LogOut, Ticket, MessageSquareHeart, Search } from 'lucide-react';
import { logout } from '@/app/login/actions';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';

export default function Navbar({ role, userName }: { role: string | null, userName: string | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <img src="/image/logo.png" alt="O! Myanmar Travel" className="h-10 md:h-12 w-auto object-contain hover:opacity-90 transition-opacity"/>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
            
            {role === "ADMIN" && (
              <div className="flex items-center gap-3 ml-4">
                <Link href="/admin" className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2.5 rounded-full font-semibold hover:bg-orange-100 transition-colors border border-orange-100 text-sm">
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <form action={logout}>
                  <button type="submit" className="text-gray-400 hover:text-red-600 transition-colors p-2">
                    <LogOut className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {role === "USER" && (
              <div className="flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[80px] truncate">{userName}</span>
                </div>
                <Link href="/reviews" title="Give Review" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <MessageSquareHeart className="w-5 h-5" />
                </Link>
                <Link href="/my-bookings" title="My Bookings" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <Ticket className="w-5 h-5" />
                </Link>
                <form action={logout}>
                  <button type="submit" className="text-gray-400 hover:text-red-600 transition-colors p-2">
                    <LogOut className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {!role && (
              <Link href="/login" className="flex items-center gap-2 bg-purple-50 text-purple-700 px-6 py-2.5 rounded-full font-bold hover:bg-purple-100 transition-colors ml-4 text-sm">
                <User className="w-4 h-4" /> Sign In
              </Link>
            )}
          </div>

          {/* 📱 Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              suppressHydrationWarning
              className="p-2 rounded-xl bg-slate-50 text-slate-600 hover:text-purple-600 transition-all"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* 📱 Mobile Menu Sidebar (အောက်ကို လျောဆင်းလာမည့် Menu) */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-xl transition-all duration-300 transform ${isOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-5 opacity-0 invisible"}`}>
        <div className="px-4 pt-4 pb-8 space-y-4">
          
          <div className="pb-4 border-b border-slate-50">
             <SearchBar />
          </div>

          <div className="flex flex-col space-y-1">
             <NavLinks isMobile onClick={() => setIsOpen(false)} />
          </div>

          <div className="pt-4 border-t border-slate-50">
            {role ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-2xl">
                   <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      {userName ? userName.charAt(0).toUpperCase() : "U"}
                   </div>
                   <div>
                      <p className="text-sm font-bold text-slate-900">{userName}</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{role}</p>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 px-2">
                  <Link href={role === "ADMIN" ? "/admin" : "/my-bookings"} onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
                    {role === "ADMIN" ? <LayoutDashboard className="w-4 h-4" /> : <Ticket className="w-4 h-4" />}
                    {role === "ADMIN" ? "Admin" : "Bookings"}
                  </Link>
                  <form action={logout} className="w-full">
                    <button type="submit" className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl text-xs font-bold uppercase tracking-wider">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-purple-600 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-purple-200"
              >
                <User className="w-4 h-4" /> Sign In Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}