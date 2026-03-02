import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import { submitMessage } from "./actions";

export const metadata = {
  title: "About & Contact | O! Myanmar Travel",
  description: "Get in touch with O! Myanmar Travel. Send us a message or find our contact details.",
};

export default async function AboutPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const resolvedParams = await searchParams;
  const isSuccess = resolvedParams.success === "true";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Section */}
      <div className="bg-slate-900 py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-orange-500/30 to-purple-600/30 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">About & Contact Us</h1>
          <p className="text-slate-300 text-lg">
            We are dedicated to making your journey through Myanmar unforgettable. Reach out to us for any inquiries, custom tours, or bookings.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* ဘယ်ဘက် - ဆက်သွယ်ရန် အချက်အလက်များ */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get in Touch</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Have a question or need to plan a special trip? Our team is available 24/7 to assist you. Drop us a message or use the contact details below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Phone Number</h3>
                  <p className="text-slate-600 mt-1">+95 9 123 456 789</p>
                  <p className="text-slate-600">+95 9 987 654 321</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Email Address</h3>
                  <p className="text-slate-600 mt-1">info@omyalmar.com</p>
                  <p className="text-slate-600">booking@omyalmar.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Office Location</h3>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    No. 123, Travel Street,<br/>
                    Yangon, Myanmar (Burma)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ညာဘက် - စာပို့ရန် Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 p-8 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send Us a Message</h2>
              
              {isSuccess && (
                <div className="mb-8 bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-xl flex items-center gap-3 font-medium">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" /> 
                  Thank you! Your message has been sent successfully. Our team will get back to you soon.
                </div>
              )}

              <form action={submitMessage} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 outline-none transition-all bg-slate-50 focus:bg-white" placeholder="john@example.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Message</label>
                  <textarea name="message" required rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-400 outline-none transition-all bg-slate-50 focus:bg-white resize-none" placeholder="How can we help you?..."></textarea>
                </div>

                <button type="submit" className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors">
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