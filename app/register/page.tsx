import { registerUser } from "./actions";
import { Mail, Lock, Phone, User, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50 px-4 py-12">
      
      {/* 🌟 Background Effect (ပုံမသုံးဘဲ CSS ဖြင့်သာ ဖန်တီးထားသော နောက်ခံ အရောင်လွင့်များ) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-400/20 blur-[120px]"></div>
        <div className="absolute top-[40%] -right-[20%] w-[60%] h-[60%] rounded-full bg-orange-400/20 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]"></div>
      </div>

      {/* 🌟 Elevated Main Card (ရှေ့သို့ ကြွထွက်နေသော ဘောင်) */}
      <div className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-white p-8 sm:p-12">
        
        {/* Top Gradient Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-purple-500 to-blue-500"></div>

        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-100 to-orange-50 text-purple-600 mb-6 shadow-sm border border-white ring-8 ring-slate-50">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Join O-Myanmar</h1>
          <p className="text-slate-500 font-medium text-sm px-4">Create your account to discover and manage your beautiful travel experiences.</p>
        </div>

        {/* Google Sign-in Button */}
        <button 
          type="button" 
          className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 text-slate-700 font-bold py-3.5 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all mb-8 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
        

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Or register with email</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Form Fields */}
        <form action={registerUser} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Full Name</label>
              <div className="relative group">
                <input type="text" name="name" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium text-slate-800" placeholder="Aung Aung" required />
                <User className="w-5 h-5 text-slate-400 group-focus-within:text-purple-500 absolute left-4 top-3.5 transition-colors pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Phone</label>
              <div className="relative group">
                <input type="tel" name="phone" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium text-slate-800" placeholder="09xxxxxxxxx" required />
                <Phone className="w-5 h-5 text-slate-400 group-focus-within:text-purple-500 absolute left-4 top-3.5 transition-colors pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Email Address</label>
            <div className="relative group">
              <input type="email" name="email" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium text-slate-800" placeholder="you@example.com" required />
              <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-purple-500 absolute left-4 top-3.5 transition-colors pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">Password</label>
            <div className="relative group">
              <input type="password" name="password" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium text-slate-800" placeholder="••••••••" minLength={6} required />
              <Lock className="w-5 h-5 text-slate-400 group-focus-within:text-purple-500 absolute left-4 top-3.5 transition-colors pointer-events-none" />
            </div>
          </div>

          <button type="submit" className="w-full group bg-slate-900 text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-2 mt-8">
            Create Account
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm font-medium text-slate-500 mt-8">
          Already have an account? <Link href="/login" className="text-purple-700 font-bold hover:text-orange-600 transition-colors">Log In here</Link>
        </p>

      </div>
    </div>
  );
}