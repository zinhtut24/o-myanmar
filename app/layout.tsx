import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "O! Myanmar Travel",
  description: "Explore the beauty of Myanmar with us.",
};

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "omyalmar-super-secret-key");

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("user-token")?.value || cookieStore.get("admin-token")?.value;

  let role = null;
  let userName = null;

  if (token) {
    try {
      const verified = await jwtVerify(token, SECRET_KEY);
      role = verified.payload.role as string;
      userName = verified.payload.name as string;
    } catch (err) {
      console.log("Auth error in layout:", err);
    }
  }

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar role={role} userName={userName} />
        
        <main className="min-h-screen">
          {children} 
        </main>

        <Footer /> 
      </body>
    </html>
  );
}