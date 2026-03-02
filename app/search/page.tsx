import { prisma } from "../../lib/prisma";
import { MapPin, ArrowRight, SearchX, Map } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Search Results | O! Myanmar Travel",
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";

  // ဧည့်သည် ရှာလိုက်သော စာသားကို ခရီးစဉ် နာမည် (သို့) တည်နေရာများတွင် ရှာဖွေခြင်း
  const results = query ? await prisma.tourPackage.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: "insensitive" } },
        { location: { contains: query, mode: "insensitive" } },
      ]
    }
  }) : [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-slate-900 py-16 text-center px-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Search Results
        </h1>
        <p className="text-slate-300 text-lg">
          Showing results for: <span className="font-bold text-orange-400">"{query}"</span>
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        
        {/* ခရီးစဉ် တွေ့ရှိပါက ပြသမည့် အပိုင်း */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((tour) => (
              <div key={tour.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col group">
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  {tour.images && tour.images.length > 0 && (
                    <img src={tour.images[0]} alt={tour.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 to-orange-900 opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-purple-600 text-sm font-semibold mb-2">
                    <MapPin className="w-4 h-4" /> {tour.location}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{tour.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">{tour.description}</p>
                  <Link href={`/destinations/${tour.slug}`} className="block w-full text-center bg-purple-50 text-purple-700 py-3 rounded-xl font-bold hover:bg-purple-600 hover:text-white transition-colors">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* ခရီးစဉ် မတွေ့ပါက (Custom Tour အတွက် Contact Us သို့ လွှတ်မည့်အပိုင်း) */
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10 md:p-16 text-center max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchX className="w-12 h-12 text-orange-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              We couldn't find exactly what you're looking for
            </h2>
            <p className="text-slate-600 mb-8 text-lg">
              Don't worry! We specialize in creating <strong>100% customized tour itineraries</strong> anywhere in Myanmar. Let us build a unique trip just for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold px-8 py-4 rounded-full hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                <Map className="w-5 h-5" /> Request a Custom Tour
              </Link>
              <Link href="/destinations" className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold px-8 py-4 rounded-full hover:bg-slate-200 transition-colors">
                Browse All Destinations
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}