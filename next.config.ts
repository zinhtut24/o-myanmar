/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // အားလုံးသော Routes တွေအတွက် သတ်မှတ်မည်
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Clickjacking ကာကွယ်ရန်
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // MIME-sniffing ကာကွယ်ရန်
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin', // Referrer data ထိန်းချုပ်ရန်
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', // မလိုအပ်သော Browser Features များ ပိတ်ရန်
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', // HTTPS သာ သုံးရန် အတင်းအကျပ် ခိုင်းစေခြင်း
          },
          {
            key: 'Content-Security-Policy',
            // အစ်ကို့ Website မှာ သုံးထားတဲ့ Image/Script Domains တွေကို ဒီမှာ Whitelist လုပ်ပေးရပါမယ်
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: images.unsplash.com res.cloudinary.com; connect-src 'self'; font-src 'self' data:;",
          },
        ],
      },
    ]
  },
};

export default nextConfig;