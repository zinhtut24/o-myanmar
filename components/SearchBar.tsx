"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full group max-w-xl">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
      </div>

      {/* Input Field - py-3 နဲ့ pr-28 ကိုသုံးပြီး စာသားကို နေရာပိုပေးထားပါတယ် */}
      <input
        suppressHydrationWarning
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="block w-full pl-11 pr-24 py-3 border border-gray-200 rounded-full leading-none bg-gray-50/50 focus:outline-none focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-sm placeholder:text-[14px] md:placeholder:text-[10px] placeholder-gray-400 shadow-sm"
        placeholder="Where do you want to go?"
      />

      {/* Search Button - နေရာလွတ်ပိုရအောင် ညာဘက်ကို ကပ်ထားပေးပါတယ် */}
      <button
        suppressHydrationWarning
        type="submit"
        className="absolute inset-y-1.5 right-1.5 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-5 rounded-full text-xs md:text-sm font-bold hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 active:scale-95"
      >
        Search
      </button>
    </form>
  );
}