import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; 

export const metadata: Metadata = {
  title: "O! Myanmar Travel",
  description: "Discover the beauty of Myanmar with O! Myanmar Travel. Car rental, tours, and inclusive packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="antialiased bg-slate-50 flex flex-col min-h-screen">
       
        {/* Navbar, Main, Footer အားလုံးသည် body အထဲတွင်သာ ရှိရပါမည် */}
        <Navbar />
        
        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        
      </body>
    </html>
  );
}