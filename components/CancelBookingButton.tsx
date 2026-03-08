"use client";

import { XCircle } from "lucide-react";
import { useState } from "react";

export default function CancelBookingButton({ 
  bookingId, 
  cancelAction 
}: { 
  bookingId: string, 
  cancelAction: (id: string) => Promise<void> 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = async () => {
    // အစ်ကိုပေးထားတဲ့ Policy အတိုင်း အတိအကျ စာသားစီထားပါတယ်
    const policyMessage = 
      "Are you sure you want to cancel this booking?\n\n" +
      "Cancellation Policy:\n" +
      "• Visa approval letter: 100% charge and no refund.\n" +
      "• 30+ Days before arrival: No cancellation charge.\n" +
      "• 29 - 21 Days: 50% of tour fare charge.\n" +
      "• 20 - 15 Days: 75% of tour fare charge.\n" +
      "• Less than 15 Days: 100% of tour fare charge.\n\n" +
      "* All cancellations must be made in writing via email.";

    const confirmed = window.confirm(policyMessage);
    
    if (confirmed) {
      try {
        setIsLoading(true);
        await cancelAction(bookingId);
      } catch (error) {
        alert("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button 
      onClick={handleCancel}
      disabled={isLoading}
      className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${
        isLoading ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:text-red-700"
      }`}
    >
      <XCircle className={`w-4 h-4 ${isLoading ? "animate-pulse" : ""}`} /> 
      {isLoading ? "Processing..." : "Cancel Booking"}
    </button>
  );
}