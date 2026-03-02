"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Browser အလိုလို Refresh ဖြစ်ခြင်းကို တားမည်
    if (query.trim()) {
      // စာရိုက်ထားရင် search စာမျက်နှာဆီသို့ စာသားလေးသယ်ပြီး သွားပါမည်
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
      </div>
      <input
        suppressHydrationWarning
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-11 pr-24 py-2.5 border border-gray-200 rounded-full leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all duration-300"
        placeholder="Where do you want to go?"
      />
      <button
        suppressHydrationWarning
        type="submit"
        className="absolute inset-y-1.5 right-1.5 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
      >
        Search
      </button>
    </form>
  );
}