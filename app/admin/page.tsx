import { prisma } from "../../lib/prisma";
import { confirmBooking, cancelBooking, updatePrice, markMessageAsRead } from "./actions";
import { 
  CheckCircle, XCircle, Clock, MapPin, Phone, Calendar, 
  Users, Map, DollarSign, Save, MessageSquare, CheckCircle2, 
  Image as ImageIcon, Eye
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.tab || "bookings";

  // Data Fetching
  const bookings = await prisma.booking.findMany({ 
    orderBy: { createdAt: 'desc' }, 
    include: { user: true, tourPlan: { include: { tourPackage: true } }, vehicle: true } 
  });
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  const tours = await prisma.tourPackage.findMany({ 
    include: { plans: { include: { prices: { include: { vehicle: true } } } } } 
  });
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });

  const unreadCount = messages.filter(m => !m.isRead).length;
  const confirmedBookings = bookings.filter(b => b.status === "CONFIRMED");
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + Number(b.totalPrice), 0);

  const formatMoney = (amount: any) => new Intl.NumberFormat('en-MM').format(Number(amount));
  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 italic">
      <div className="max-w-7xl mx-auto">
        
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
          <div className="w-2 h-10 bg-orange-500 rounded-full"></div>
          Admin Workspace
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"><Calendar className="w-6 h-6 text-purple-600"/></div>
              <div><p className="text-slate-500 text-sm">Bookings</p><p className="text-2xl font-bold text-slate-900">{bookings.length}</p></div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><DollarSign className="w-6 h-6 text-green-600"/></div>
              <div><p className="text-slate-500 text-sm">Revenue</p><p className="text-2xl font-bold text-slate-900">{formatMoney(totalRevenue)}</p></div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Users className="w-6 h-6 text-blue-600"/></div>
              <div><p className="text-slate-500 text-sm">Users</p><p className="text-2xl font-bold text-slate-900">{users.length}</p></div>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center"><MessageSquare className="w-6 h-6 text-orange-600"/></div>
              <div><p className="text-slate-500 text-sm">Messages</p><p className="text-2xl font-bold text-slate-900">{unreadCount}</p></div>
           </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2 overflow-x-auto">
          <Link href="?tab=bookings" className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${currentTab === 'bookings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
            Manage Bookings
          </Link>
          <Link href="?tab=tours" className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${currentTab === 'tours' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
            Tours & Pricing
          </Link>
          <Link href="?tab=users" className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${currentTab === 'users' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
            User Directory
          </Link>
          <Link href="?tab=messages" className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 whitespace-nowrap ${currentTab === 'messages' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
            Messages 
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs shadow-sm">{unreadCount}</span>
            )}
          </Link>
        </div>

        {/* ========================================== */}
        {/* TAB 1: BOOKINGS LIST + PAYMENT SCREENSHOT */}
        {/* ========================================== */}
        {currentTab === "bookings" && (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row border-l-8 border-l-slate-900">
                <div className="p-6 md:w-2/3 border-b md:border-b-0 md:border-r border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-black text-slate-900 uppercase">{booking.tourPlan.tourPackage.title}</h2>
                      <p className="text-orange-600 font-bold text-sm tracking-wide">{booking.tourPlan.name} • {booking.vehicle.name}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       {booking.status === "PENDING" && <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">Pending Approval</span>}
                       {booking.status === "CONFIRMED" && <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase">Success</span>}
                       {booking.status === "CANCELLED" && <span className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold"><XCircle className="w-3 h-3"/> CANCELLED</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2">
                       <p className="flex items-center gap-2 text-sm font-bold"><MapPin className="w-4 h-4 text-slate-400"/> {booking.user.name || "Guest"}</p>
                       <p className="flex items-center gap-2 text-sm text-slate-500"><Phone className="w-4 h-4 text-slate-400"/> {booking.user.phone || booking.user.email}</p>
                       <p className="flex items-center gap-2 text-sm text-slate-500"><Calendar className="w-4 h-4 text-orange-400" /> Travel: <span className="font-semibold">{formatDate(booking.bookingDate)}</span></p>
                    </div>
                    
                    {/* Payment Screenshot Section */}
                    <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                      <p className="text-[10px] font-black text-purple-600 uppercase mb-2">Payment Verification</p>
                      {booking.paymentProof ? (
                        <a href={booking.paymentProof} target="_blank" className="flex items-center gap-2 text-sm font-bold text-purple-900 hover:underline">
                          <ImageIcon className="w-5 h-5" /> View Kpay Slip <Eye className="w-4 h-4"/>
                        </a>
                      ) : (
                        <p className="text-xs text-red-500 font-bold">No Screenshot Uploaded</p>
                      )}
                      <p className="text-[10px] text-purple-400 mt-1 uppercase font-bold">Method: {booking.paymentMethod}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:w-1/3 bg-slate-50/50 flex flex-col justify-center gap-4">
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase">Deposit To Check</span>
                    <span className="text-lg font-black text-orange-600">{formatMoney(booking.depositPaid)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-2 px-2 text-sm">
                    <span className="text-slate-500">Total Price:</span>
                    <span className="font-bold text-slate-900">{formatMoney(booking.totalPrice)}</span>
                  </div>
                  
                  {booking.status === "PENDING" && (
                    <div className="flex gap-2 mt-2">
                      <form action={confirmBooking} className="flex-1">
                        <input type="hidden" name="bookingId" value={booking.id} />
                        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-green-700 transition-all shadow-lg shadow-green-200">
                          Approve
                        </button>
                      </form>
                      <form action={cancelBooking} className="flex-1">
                        <input type="hidden" name="bookingId" value={booking.id} />
                        <button type="submit" className="w-full bg-white text-red-600 py-3 rounded-xl font-black text-xs uppercase tracking-widest border-2 border-red-50 border-b-4 hover:bg-red-50 transition-all">
                          Cancel
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: TOURS & PRICING */}
        {/* ========================================== */}
        {currentTab === "tours" && (
          <div className="space-y-8">
            {tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <Map className="w-6 h-6 text-orange-500"/> {tour.title}
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {tour.plans.map((plan) => (
                    <div key={plan.id} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                      <h3 className="font-black text-purple-700 mb-4 uppercase tracking-tighter italic">
                        {plan.name} ({plan.durationDays} Days)
                      </h3>
                      <div className="space-y-3">
                        {plan.prices.map((price) => (
                          <form key={price.id} action={updatePrice} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center bg-white p-4 rounded-xl border border-slate-100 group">
                            <input type="hidden" name="priceId" value={price.id} />
                            <div className="text-xs font-black text-slate-500 uppercase">{price.vehicle.name}</div>
                            <div className="flex flex-col gap-1">
                               <label className="text-[10px] font-bold text-slate-400 uppercase">Total Price</label>
                               <input type="number" name="price" defaultValue={Number(price.price)} className="bg-slate-50 border-none rounded-lg p-2 text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none" required />
                            </div>
                            <div className="flex flex-col gap-1">
                               <label className="text-[10px] font-bold text-slate-400 uppercase">Deposit</label>
                               <input type="number" name="deposit" defaultValue={Number(price.deposit)} className="bg-slate-50 border-none rounded-lg p-2 text-sm font-bold focus:ring-2 focus:ring-orange-500 outline-none" required />
                            </div>
                            <button type="submit" className="bg-slate-900 text-white p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-all mt-4 md:mt-0">
                               <Save className="w-4 h-4"/> <span className="text-[10px] font-black uppercase tracking-widest">Update</span>
                            </button>
                          </form>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: USER DIRECTORY */}
        {/* ========================================== */}
        {currentTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                  <tr><th className="px-6 py-4">Name</th><th className="px-6 py-4">Email</th><th className="px-6 py-4">Phone</th><th className="px-6 py-4">Role</th><th className="px-6 py-4">Joined Date</th></tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 font-semibold text-slate-900">{user.name || "N/A"}</td>
                      <td className="px-6 py-4 text-slate-600">{user.email}</td>
                      <td className="px-6 py-4 text-slate-600">{user.phone || "N/A"}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'}`}>{user.role}</span></td>
                      <td className="px-6 py-4 text-slate-500">{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: MESSAGES */}
        {/* ========================================== */}
        {currentTab === "messages" && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-500 text-lg">No messages received yet.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`p-6 rounded-2xl shadow-sm border transition-colors ${msg.isRead ? 'bg-slate-50 border-slate-200 opacity-80' : 'bg-white border-purple-200 border-l-4 border-l-purple-500'}`}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                      <h3 className={`text-lg ${msg.isRead ? 'font-semibold text-slate-700' : 'font-bold text-slate-900'}`}>{msg.name}</h3>
                      <p className="text-sm text-slate-500 mt-1">{msg.email}</p>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-1 w-full md:w-auto">
                      <p className="text-xs text-slate-400 font-medium whitespace-nowrap">{formatDate(msg.createdAt)}</p>
                      
                      {!msg.isRead ? (
                        <form action={markMessageAsRead} className="ml-auto md:ml-0 mt-1">
                          <input type="hidden" name="messageId" value={msg.id} />
                          <button type="submit" className="text-xs bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full hover:bg-purple-200 font-bold transition-colors shadow-sm">
                            Mark as Read
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-green-600 flex items-center gap-1 mt-1 font-semibold ml-auto md:ml-0 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                          <CheckCircle2 className="w-3 h-3" /> Read
                        </span>
                      )}
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl text-sm leading-relaxed ${msg.isRead ? 'bg-white border border-slate-100 text-slate-600' : 'bg-purple-50/50 border border-purple-100 text-slate-800'}`}>
                    <p className="whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}