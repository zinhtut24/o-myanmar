"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { submitReview } from "./actions";

export default function ReviewForm() {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());
    
    try {
      await submitReview(formData);
      (e.target as HTMLFormElement).reset();
      setRating(5);
      alert("Review submitted successfully! Thank you.");
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6 md:p-8 mb-10">
      <h2 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tighter">Write a Review</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Rating Stars */}
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Rating</label>
            <div className="flex items-center gap-1 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-100 w-fit">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    className={`w-8 h-8 ${star <= (hoveredRating || rating) ? "fill-orange-400 text-orange-400" : "text-slate-300"}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Type Selection */}
          <div className="flex-1">
            <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">What are you reviewing?</label>
            <select name="type" className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all font-medium text-slate-800 font-bold">
              <option value="GENERAL">General Experience</option>
              <option value="CAR">Vehicle Quality</option>
              <option value="DRIVER">Driver / Guide</option>
              <option value="SERVICE">Customer Service</option>
            </select>
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-widest">Your Review</label>
          <textarea 
            name="comment" 
            rows={4} 
            required
            placeholder="Tell us about your trip..."
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50 outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all font-medium text-slate-800 resize-none"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`px-8 py-4 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-300 ${isSubmitting ? 'bg-slate-300 cursor-not-allowed' : 'bg-slate-900 hover:bg-orange-600 shadow-xl hover:-translate-y-1'}`}
        >
          {isSubmitting ? "Submitting..." : "Post Review"}
        </button>
      </form>
    </div>
  );
}