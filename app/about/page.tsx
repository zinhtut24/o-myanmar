import { MapPin, Phone, Mail, Send, CheckCircle2, ShieldCheck, Heart, Globe, Award, MessageCircle } from "lucide-react";
import { submitMessage } from "./actions";

export const metadata = {
  title: "About & Contact | O! Myanmar Travel",
  description: "Learn more about O! Myanmar Travel. Reach out via Viber, WhatsApp, or Email for unforgettable journeys.",
};

export default async function AboutPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const resolvedParams = await searchParams;
  const isSuccess = resolvedParams.success === "true";

  // အစ်ကို့ ဖုန်းနံပါတ် (Link များအတွက်)
  const phoneNumber = "+959975448448";
  const displayPhone = "+95 9 732 133 448";

  return (
    <div className="min-h-screen bg-white">
      
      {/* 🌟 1. HERO SECTION */}
      <div className="relative bg-slate-900 pt-24 pb-32 overflow-hidden text-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542385150-1376f9ec67fa?q=80&w=2000" 
            className="w-full h-full object-cover opacity-20 grayscale" 
            alt="Myanmar Landscape" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900 to-white"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 inline-block">
            Your Trusted Travel Partner
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Crafting Unforgettable <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">Experiences Since 2024</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            At O! Myanmar Travel, we don't just plan trips; we create memories that last a lifetime. Reach out to us anytime.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* 🌟 2. QUICK CONTACT CHANNELS (Viber & WhatsApp) - Contrast Improved */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Viber Card */}
          <a 
            href={`viber://chat?number=${phoneNumber}`} 
            className="flex items-center gap-6 bg-[#7360f2] text-white p-8 rounded-[2.5rem] shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white/40 transition-colors shrink-0">
              <MessageCircle className="w-10 h-10 fill-white text-white" />
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <p className="text-sm font-bold uppercase tracking-widest text-white/90 mb-1">Message on</p>
              <h3 className="text-4xl font-black italic tracking-tighter text-white">Viber</h3>
            </div>
          </a>

          {/* WhatsApp Card */}
          <a 
            href={`https://wa.me/${phoneNumber.replace('+', '')}`} 
            target="_blank"
            className="flex items-center gap-6 bg-[#25D366] text-white p-8 rounded-[2.5rem] shadow-2xl hover:scale-[1.02] transition-all duration-300 group"
          >
            <div className="bg-white/20 p-4 rounded-2xl group-hover:bg-white/40 transition-colors shrink-0">
              <MessageCircle className="w-10 h-10 fill-white text-white" />
            </div>
            <div className="flex flex-col items-start overflow-hidden">
              <p className="text-sm font-bold uppercase tracking-widest text-white/90 mb-1">Chat on</p>
              <h3 className="text-4xl font-black italic tracking-tighter text-white">WhatsApp</h3>
            </div>
          </a>
        </div>

        {/* 🌟 3. CORE VALUES SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {[
            { icon: <ShieldCheck className="w-6 h-6 text-orange-500" />, title: "Safe & Reliable", desc: "Your safety is our priority." },
            { icon: <Heart className="w-6 h-6 text-red-500" />, title: "Passion Driven", desc: "We love what we do." },
            { icon: <Globe className="w-6 h-6 text-blue-500" />, title: "Eco Friendly", desc: "Sustainable tourism practices." },
            { icon: <Award className="w-6 h-6 text-purple-500" />, title: "Best Pricing", desc: "Value for your money." },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-slate-50 rounded-2xl">
                {item.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 🌟 4. CONTACT & FORM SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-20 bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100">
          
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Connect With Us</h2>
              <p className="text-slate-500 font-normal leading-relaxed">
                Whether you have a specific question or just want to say hi, we'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <a href={`tel:${phoneNumber}`} className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-600 transition-colors">
                  <Phone className="w-5 h-5 text-purple-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Call Us</p>
                  <p className="text-sm font-bold text-slate-800">{displayPhone}</p>
                </div>
              </a>

              <a href="mailto:zinhtutnaing2410@gmail.com" className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-600 transition-colors">
                  <Mail className="w-5 h-5 text-orange-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Email Us</p>
                  <p className="text-sm font-bold text-slate-800">zinhtutnaing2410@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Our Office</p>
                  <p className="text-sm font-bold text-slate-800 leading-tight">No. 133, 2nd Floor, MinMaHaw St, Dawbon, Yangon</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed Fix */}
            <div className="rounded-3xl overflow-hidden h-64 border-4 border-white shadow-2xl group relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.01254334333!2d96.1824349!3d16.7797677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1ec4439cadf2d%3A0x5e3002723e2703c2!2sO!%20Myanmar%20Car%20Rental!5e0!3m2!1sen!2smm!4v1710000000000!5m2!1sen!2smm"
                className="w-full h-full border-0 grayscale group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-50">
              <h3 className="text-xl font-bold text-slate-900 mb-8">Ready to Start? Send a Message</h3>
              
              {isSuccess && (
                <div className="mb-8 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                  <CheckCircle2 className="w-6 h-6 shrink-0" /> 
                  Message sent successfully! We will contact you soon.
                </div>
              )}

              <form action={submitMessage} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                    <input type="text" name="name" required suppressHydrationWarning={true} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-purple-100 outline-none transition-all" placeholder="Enter your name" />
                    
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" name="email" required suppressHydrationWarning={true} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-purple-100 outline-none transition-all" placeholder="example@email.com" />
                    
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Message</label>
                  <textarea name="message" required rows={4} className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-purple-100 outline-none transition-all resize-none" placeholder="What's on your mind?"></textarea>
                </div>

                <button type="submit" className="flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-500/30 active:scale-95">
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}