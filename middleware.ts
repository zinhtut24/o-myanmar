import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET || "omyalmar-super-secret-key");

export async function middleware(request: NextRequest) {
  // admin နဲ့စတဲ့ လမ်းကြောင်းတွေကိုပဲ စစ်ဆေးပါမည်
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin-token")?.value;

    // Token မရှိလျှင် Login စာမျက်နှာသို့ ကန်ထုတ်မည်
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      // Token မှန်ကန်မှု ရှိမရှိ စစ်ဆေးမည်
      await jwtVerify(token, SECRET_KEY);
      return NextResponse.next(); // မှန်ကန်ပါက ဝင်ခွင့်ပြုမည်
    } catch (error) {
      // Token သက်တမ်းကုန်လျှင် သို့မဟုတ် မှားယွင်းနေလျှင်
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// မည်သည့် လမ်းကြောင်းများတွင် Middleware အလုပ်လုပ်မည်ကို သတ်မှတ်ခြင်း
export const config = {
  matcher: ["/admin/:path*"],
};