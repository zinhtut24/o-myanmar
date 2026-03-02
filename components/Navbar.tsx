import Link from 'next/link';
import { Menu, User, LayoutDashboard, LogOut, Ticket, MessageSquareHeart } from 'lucide-react'; // 👈 Icon အသစ်သွင်းထားသည်
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { logout } from '@/app/login/actions';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "omyalmar-super-secret-key");

export default async function Navbar() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin-token")?.value;
  const userToken = cookieStore.get("user-token")?.value;
  
  let role = null;
  let userName = null;

  if (adminToken) {
    try {
      const verified = await jwtVerify(adminToken, SECRET_KEY);
      role = verified.payload.role as string;
      userName = verified.payload.name as string;
    } catch (err) {}
  }

  if (!role && userToken) {
    try {
      const verified = await jwtVerify(userToken, SECRET_KEY);
      role = verified.payload.role as string;
      userName = verified.payload.name as string;
    } catch (err) {}
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <img src="/image/logo.png" alt="O! Myanmar Travel" className="h-12 w-auto object-contain hover:opacity-90 transition-opacity"/>
            </Link>
          </div>

          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-2 md:space-x-6">
            <NavLinks />
            
            {/* 👈 Admin Section */}
            {role === "ADMIN" && (
              <div className="hidden sm:flex items-center gap-3 ml-4">
                <Link href="/admin" className="flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2.5 rounded-full font-semibold hover:bg-orange-100 transition-colors border border-orange-100">
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </Link>
                <form action={logout}>
                  <button type="submit" className="flex items-center gap-2 text-gray-400 hover:text-red-600 font-semibold px-2 py-2 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {/* 👈 User Section */}
            {role === "USER" && (
              <div className="hidden sm:flex items-center gap-4 ml-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="max-w-[100px] truncate">{userName}</span>
                </div>

                {/* Review Link for Users */}
                <Link href="/reviews" title="Give Review" className="text-gray-400 hover:text-orange-500 transition-colors">
                  <MessageSquareHeart className="w-5 h-5" />
                </Link>

                <Link href="/my-bookings" title="My Bookings" className="text-gray-400 hover:text-purple-600 transition-colors">
                  <Ticket className="w-5 h-5" />
                </Link>

                <form action={logout}>
                  <button type="submit" className="text-gray-400 hover:text-red-600 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </form>
              </div>
            )}

            {!role && (
              <Link href="/login" className="hidden sm:flex items-center gap-2 bg-purple-50 text-purple-700 px-5 py-2.5 rounded-full font-semibold hover:bg-purple-100 transition-colors ml-4">
                <User className="w-5 h-5" /> Sign In
              </Link>
            )}

            <button className="md:hidden text-gray-700 hover:text-purple-600 p-2 ml-2">
              <Menu className="h-7 w-7" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}