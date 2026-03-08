/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', 
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin', 
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()', 
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', 
          },
          {
            key: 'Content-Security-Policy',
            // Google Maps အတွက် google.com နဲ့ gstatic.com တွေကို whitelist ထည့်ပေးလိုက်ပါပြီ
            value: "default-src 'self'; " +
            "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://www.google.com https://www.gstatic.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "img-src 'self' blob: data: images.unsplash.com res.cloudinary.com https://maps.gstatic.com https://maps.googleapis.com https://www.google.com; " +
            "font-src 'self' data: https://fonts.gstatic.com; " +
            "frame-src 'self' https://www.google.com https://maps.google.com; " + // 👈 ဒါက Map Embed ပေါ်ဖို့ အဓိကပါ
            "connect-src 'self' https://maps.googleapis.com;"
          },
        ],
      },
    ]
  },
};

export default nextConfig;