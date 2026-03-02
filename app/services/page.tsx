import { Car, Map, Users, ShieldCheck, Wallet, Headphones, Star, ArrowRight, Hotel, Plane, MapPinned } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Our Services | O! Myanmar Travel",
  description: "Discover the premium travel services we offer across Myanmar, including private car rentals and customized tours.",
};

export default function ServicesPage() {
  const mainServices = [
    {
      icon: <Car className="w-8 h-8 text-orange-500" />,
      title: "Private Vehicle Rental",
      desc: "From comfortable 4-seater saloons to spacious 33-seater express buses. All vehicles are fully air-conditioned and well-maintained.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100"
    },
    {
      icon: <Map className="w-8 h-8 text-purple-600" />,
      title: "Customized Tour Packages",
      desc: "Tailor-made itineraries to Bagan, Mandalay, Inle Lake, and pristine beaches. We plan every detail so you can focus on enjoying the journey.",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100"
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: "Professional Local Drivers",
      desc: "Our drivers are highly experienced, polite, and deeply knowledgeable about local routes, ensuring a smooth and authentic travel experience.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    }
  ];

  const contactServices = [
    {
      icon: <Hotel className="w-7 h-7 text-rose-500" />,
      title: "Hotel Reservations",
      desc: "Need a place to stay? We can book the best hotels, resorts, and guesthouses across Myanmar at special partner rates.",
      bgColor: "bg-rose-50",
      btnColor: "bg-rose-100 text-rose-700 hover:bg-rose-200",
      linkText: "Contact for Hotels"
    },
    {
      icon: <Plane className="w-7 h-7 text-sky-500" />,
      title: "Flight Ticketing",
      desc: "Domestic and international flight booking services. Let us handle your air travel arrangements hassle-free.",
      bgColor: "bg-sky-50",
      btnColor: "bg-sky-100 text-sky-700 hover:bg-sky-200",
      linkText: "Book Flights"
    },
    {
      icon: <MapPinned className="w-7 h-7 text-emerald-500" />,
      title: "Unique Custom Tours",
      desc: "Looking for a destination not listed on our site? We can craft a 100% personalized itinerary just for you.",
      bgColor: "bg-emerald-50",
      btnColor: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      linkText: "Request Custom Tour"
    }
  ];

  const features = [
    { icon: <Wallet className="w-6 h-6 text-green-500" />, title: "All-Inclusive Pricing", desc: "Fuel, toll gate fees, and driver expenses are all included. No hidden charges." },
    { icon: <ShieldCheck className="w-6 h-6 text-purple-500" />, title: "Safe & Reliable", desc: "Your safety is our priority. We monitor all trips and ensure vehicles are in top condition." },
    { icon: <Headphones className="w-6 h-6 text-orange-500" />, title: "24/7 Support", desc: "Our customer service team is always on standby to assist you throughout your trip." },
    { icon: <Star className="w-6 h-6 text-yellow-500" />, title: "Premium Quality", desc: "We are committed to providing a 5-star travel experience from start to finish." },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Section */}
      <div className="bg-slate-900 py-20 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-purple-600/30 to-orange-500/30 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Exceptional Services for Your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">Perfect Journey</span>
          </h1>
          <p className="text-slate-300 text-lg">
            Whether you need a quick airport transfer, a multi-day adventure, or help with hotel and flight bookings, we've got you covered.
          </p>
        </div>
      </div>

      {/* ========================================== */}
      {/* နေရာပြောင်းထားသော On-Demand Services (အပေါ်ပိုင်း) */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-40px] relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactServices.map((srv, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col items-center text-center shadow-lg shadow-slate-200/50 hover:-translate-y-2 transition-all duration-300">
              <div className={`w-14 h-14 ${srv.bgColor} rounded-full flex items-center justify-center mb-4`}>
                {srv.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h3>
              <p className="text-slate-600 text-sm mb-6 flex-grow">{srv.desc}</p>
              <Link href="/about" className={`w-full py-3 rounded-xl font-semibold transition-colors ${srv.btnColor}`}>
                {srv.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================== */}
      {/* နေရာပြောင်းထားသော Main Services (အောက်ပိုင်း) */}
      {/* ========================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200 pt-16 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Travel Services</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Explore our premium private vehicle rentals and expertly crafted tour packages across Myanmar.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainServices.map((service, index) => (
            <div key={index} className={`bg-white rounded-2xl p-8 border ${service.borderColor} shadow-sm hover:shadow-md transition-shadow duration-300`}>
              <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">The O! Myanmar Difference</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We don't just provide cars; we provide peace of mind. Here is what makes our service stand out.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center hover:border-purple-200 transition-colors">
              <div className="w-12 h-12 mx-auto bg-slate-50 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl shadow-orange-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your adventure?</h2>
            <p className="text-purple-100 mb-10 max-w-2xl mx-auto text-lg">
              Browse our handcrafted tour packages or contact us to build your own custom itinerary today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/destinations" className="bg-white text-purple-700 font-bold px-8 py-4 rounded-full hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                Explore Tours <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/about" className="bg-transparent border border-white/50 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}