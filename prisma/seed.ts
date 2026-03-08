import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ 
  connectionString,
  // 💡 Vercel/Neon/Supabase တို့မှာ SSL Error မတက်အောင် ဒါလေး ထည့်ပေးရပါမယ်
  ssl: {
    rejectUnauthorized: false // 👈 ဒါက SSL certificate ကို server ကနေ လက်ခံပေးဖို့ပါ
  }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Start seeding explicit English data for ALL tours...");

  // 1. Clean up old data
  try {
    await prisma.booking.deleteMany();
    await prisma.tourPrice.deleteMany();
    await prisma.tourPlan.deleteMany();
    await prisma.tourPackage.deleteMany();
    await prisma.vehicle.deleteMany();
    console.log("🗑️ Cleaned up old data.");
  } catch (e) {}

  // 2. Create Vehicles
  const salon = await prisma.vehicle.create({ data: { name: "Saloon (4 Seater)", capacity: 4, image: "/vehicles/salon.jpg" } });
  const alphard = await prisma.vehicle.create({ data: { name: "Alphard (7 Seater)", capacity: 7, image: "/vehicles/alphard.jpg" } });
  const hiace = await prisma.vehicle.create({ data: { name: "Hiace (12 Seater)", capacity: 12, image: "/vehicles/hiace.jpg" } });
  const minibus = await prisma.vehicle.create({ data: { name: "Mini Bus (22 Seater)", capacity: 22, image: "/vehicles/minibus.jpg" } });
  const bus = await prisma.vehicle.create({ data: { name: "Express Bus (33 Seater)", capacity: 33, image: "/vehicles/bus.jpg" } });

  // Text Templates
  const inclusiveText = "Car rental, fuel, toll gate fees, and driver fees are all inclusive. Enjoy a hassle-free journey.";
  const guideInclusiveText = "Car rental, fuel, toll gate fees, driver fees, and a professional tour guide are all inclusive. Enjoy a hassle-free journey.";

  // Helper Function for Pricing (ဈေးနှုန်းများကို အလွယ်တကူ တွက်ချက်ပေးရန်)
  const getDayPrices = (basePrice: number) => ({
    create: [
      { vehicleId: salon.id, price: basePrice, deposit: basePrice * 0.2 },
      { vehicleId: alphard.id, price: basePrice * 1.5, deposit: basePrice * 1.5 * 0.2 },
      { vehicleId: hiace.id, price: basePrice * 1.8, deposit: basePrice * 1.8 * 0.2 },
      { vehicleId: minibus.id, price: basePrice * 3, deposit: basePrice * 3 * 0.2 },
      { vehicleId: bus.id, price: basePrice * 4, deposit: basePrice * 4 * 0.2 }
    ]
  });

  // ==========================================
  // အသစ်ထပ်ထည့်ထားသော DAY TRIPS & TOURS များ
  // ==========================================

  // 1. Yangon City Sightseeing (Full Day ပဲ ထားပါမည်)
  const yangon = await prisma.tourPackage.create({
    data: { title: "Yangon City Sightseeing", slug: "yangon-city", description: `Explore the commercial capital of Myanmar. ${inclusiveText}`, location: "Yangon Region", images: ["/image/Ygn.jpg"], isFeatured: true }
  });
  await prisma.tourPlan.create({ data: { name: "Full Day Tour", durationDays: 1, tourPackageId: yangon.id, prices: getDayPrices(80000) } });

  // 2. Yangon Walking Tour (Guide + Car)
  const ygnWalking = await prisma.tourPackage.create({
    data: { title: "Yangon Walking Tour", slug: "yangon-walking-tour", description: `Immerse yourself in the colonial heritage and vibrant streets of Yangon downtown. ${guideInclusiveText}`, location: "Yangon Region", images: ["/image/ygn-walking.jpg"], isFeatured: false }
  });
  await prisma.tourPlan.create({ data: { name: "Full Day Tour", durationDays: 1, tourPackageId: ygnWalking.id, prices: getDayPrices(100000) } });

  // 3. Yangon Circle Train + Shwedagon
  const circleTrain = await prisma.tourPackage.create({
    data: { title: "Yangon Circle Train & Shwedagon Pagoda", slug: "yangon-circle-train", description: `Experience the local lifestyle on the circular train and visit the majestic Shwedagon Pagoda. ${inclusiveText}`, location: "Yangon Region", images: ["/image/shwedagon.jpg"], isFeatured: false }
  });
  await prisma.tourPlan.create({ data: { name: "Full Day Tour", durationDays: 1, tourPackageId: circleTrain.id, prices: getDayPrices(90000) } });

  // 4. Dala - Museum - Shopping tour
  const dala = await prisma.tourPackage.create({
    data: { title: "Dalla, Museum & Shopping Tour", slug: "dalla-museum-shopping", description: `Cross the Yangon river to explore Dalla, visit national museums, and shop at Bogyoke Market. ${inclusiveText}`, location: "Yangon Region", images: ["/image/dalla.jpg"], isFeatured: false }
  });
  await prisma.tourPlan.create({ data: { name: "Full Day Tour", durationDays: 1, tourPackageId: dala.id, prices: getDayPrices(100000) } });

  // 5. Yangon - Kyaiktiyo Day trip (Guide + Car)
  const kyaiktiyoDay = await prisma.tourPackage.create({
    data: { title: "Yangon to Kyaiktiyo Day Trip", slug: "yangon-kyaiktiyo-day", description: `A spiritual journey to the famous Golden Rock Pagoda from Yangon. ${guideInclusiveText}`, location: "Mon State", images: ["/image/kyite.jpg"], isFeatured: true }
  });
  await prisma.tourPlan.create({ data: { name: "Day Return Tour", durationDays: 1, tourPackageId: kyaiktiyoDay.id, prices: getDayPrices(150000) } });

  // 6. Yangon - Bago Day trip (Guide + Car)
  const bagoDay = await prisma.tourPackage.create({
    data: { title: "Yangon to Bago Day Trip", slug: "yangon-bago-day", description: `Visit the famous Shwemawdaw Pagoda and historic Kanbawzathadi Palace. ${guideInclusiveText}`, location: "Bago Region", images: ["/image/ygn-bago.jpg"], isFeatured: false }
  });
  await prisma.tourPlan.create({ data: { name: "Day Return Tour", durationDays: 1, tourPackageId: bagoDay.id, prices: getDayPrices(130000) } });

  // 7. Yangon - Thanlyin Day trip (Guide + Car)
  const thanlyinDay = await prisma.tourPackage.create({
    data: { title: "Yangon to Thanlyin Day Trip", slug: "yangon-thanlyin-day", description: `Discover the ancient port city of Thanlyin and the Ye Le Pagoda. ${guideInclusiveText}`, location: "Yangon Region", images: ["/image/than.jpg"], isFeatured: false }
  });
  await prisma.tourPlan.create({ data: { name: "Day Return Tour", durationDays: 1, tourPackageId: thanlyinDay.id, prices: getDayPrices(110000) } });
  

  // 9. Bagan - Mount Popa Day trip (Guide + Car)
  const bgnPopa = await prisma.tourPackage.create({
    data: { title: "Bagan to Mount Popa Day Trip", slug: "bagan-popa-day", description: `Visit the mystical extinct volcano and the home of Myanmar's nats from Bagan. ${guideInclusiveText}`, location: "Mandalay Region", images: ["/image/bagan-pp.jpg"], isFeatured: true }
  });
  await prisma.tourPlan.create({ data: { name: "Day Return Tour", durationDays: 1, tourPackageId: bgnPopa.id, prices: getDayPrices(90000) } });

  // 10. Mandalay City Sightseeing (Guide + Car)
  const mdyCity = await prisma.tourPackage.create({
    data: { title: "Mandalay City Sightseeing", slug: "mandalay-city-sightseeing", description: `Explore Mandalay Palace, Kuthodaw, and Mandalay Hill. ${guideInclusiveText}`, location: "Mandalay Region", images: ["/image/mdyss.jpg"], isFeatured: true }
  });
  await prisma.tourPlan.create({ data: { name: "Full Day Tour", durationDays: 1, tourPackageId: mdyCity.id, prices: getDayPrices(90000) } });

  // 11. Mandalay Pyin Oo Lwin Day trip (Guide + Car)
  const mdyPolDay = await prisma.tourPackage.create({
    data: { title: "Mandalay to Pyin Oo Lwin Day Trip", slug: "mandalay-pol-day", description: `Enjoy the cool weather, botanical gardens, and waterfalls of Pyin Oo Lwin. ${guideInclusiveText}`, location: "Mandalay Region", images: ["/image/mdy-pol.jpg"], isFeatured: false }
  });
  await prisma.tourPlan.create({ data: { name: "Day Return Tour", durationDays: 1, tourPackageId: mdyPolDay.id, prices: getDayPrices(120000) } });

  // 12. Mandalay - Amarapura - Innwa Day trip (Guide + Car)
  const mdyAmaInnwa = await prisma.tourPackage.create({
    data: { title: "Mandalay - Amarapura - Innwa Day Trip", slug: "mandalay-amarapura-innwa", description: `Explore the ancient capitals, traditional workshops, and sunset at U Bein Bridge. ${guideInclusiveText}`, location: "Mandalay Region", images: ["/image/ama.jpg"], isFeatured: false }
  });
  await prisma.tourPlan.create({ data: { name: "Day Return Tour", durationDays: 1, tourPackageId: mdyAmaInnwa.id, prices: getDayPrices(110000) } });

  // 13. Airport Transfer (Pickup / Drop-off)
  const airport = await prisma.tourPackage.create({
    data: { title: "Airport Pick-up / Drop-off Transfer", slug: "airport-transfer", description: `Reliable and comfortable airport transfer services to your hotel or destination. ${inclusiveText}`, location: "Any Airport", images: ["/image/transfer.jpg"], isFeatured: false }
  });
  await prisma.tourPlan.create({ data: { name: "One Way Transfer", durationDays: 1, tourPackageId: airport.id, prices: getDayPrices(50000) } });


  // ==========================================
  // ယခင်ရှိပြီးသား (Multi-day) ခရီးစဉ်များကို မူလအတိုင်းထားရှိခြင်း
  // ==========================================

  // TOUR: Bagan (Only)
  const bagan = await prisma.tourPackage.create({
    data: {
      title: "Bagan Ancient City Exploration", slug: "bagan-only",
      description: `Discover thousands of ancient temples and the magical sunset of Bagan. ${inclusiveText}`,
      location: "Mandalay Region", images: ["/image/bagan.jpg"], isFeatured: true,
    }
  });
  
  const baganPrices = [
    { days: 2, name: "1 Night 2 Days", p: 250000 }, { days: 3, name: "2 Nights 3 Days", p: 350000 },
    { days: 4, name: "3 Nights 4 Days", p: 450000 }, { days: 5, name: "4 Nights 5 Days", p: 550000 },
    { days: 6, name: "5 Nights 6 Days", p: 650000 }, { days: 7, name: "6 Nights 7 Days", p: 750000 }
  ];
  for (const plan of baganPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: bagan.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  // ==========================================
  // TOUR 3: Bagan - Mandalay - Pyin Oo Lwin
  // ==========================================
  const bmp = await prisma.tourPackage.create({
    data: {
      title: "Bagan - Mandalay - Pyin Oo Lwin", slug: "bagan-mandalay-pol",
      description: `The ultimate upper Myanmar trip covering historical temples, ancient capitals, and the flower city. ${inclusiveText}`,
      location: "Mandalay Region", images: ["/image/pol.jpg"], isFeatured: true,
    }
  });

  const bmpPrices = [
    { days: 2, name: "1 Night 2 Days", p: 300000 }, { days: 3, name: "2 Nights 3 Days", p: 400000 },
    { days: 4, name: "3 Nights 4 Days", p: 500000 }, { days: 5, name: "4 Nights 5 Days", p: 600000 },
    { days: 6, name: "5 Nights 6 Days", p: 700000 }, { days: 7, name: "6 Nights 7 Days", p: 800000 }
  ];
  for (const plan of bmpPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: bmp.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  // ==========================================
  // TOUR 4: Mandalay (Only)
  // ==========================================
  const mandalay = await prisma.tourPackage.create({
    data: {
      title: "Mandalay Royal City", slug: "mandalay-only",
      description: `Visit Mandalay Palace, U Bein Bridge, and surrounding ancient capitals. ${inclusiveText}`,
      location: "Mandalay Region", images: ["/image/mdy.jpg"], isFeatured: false,
    }
  });

  const mdyPrices = [
    { days: 2, name: "1 Night 2 Days", p: 200000 }, { days: 3, name: "2 Nights 3 Days", p: 300000 },
    { days: 4, name: "3 Nights 4 Days", p: 400000 }, { days: 5, name: "4 Nights 5 Days", p: 500000 },
    { days: 6, name: "5 Nights 6 Days", p: 600000 }, { days: 7, name: "6 Nights 7 Days", p: 700000 }
  ];
  for (const plan of mdyPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: mandalay.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  // ==========================================
  // TOUR 5: Mandalay - Pyin Oo Lwin
  // ==========================================
  const mdyPol = await prisma.tourPackage.create({
    data: {
      title: "Mandalay & Pyin Oo Lwin Getaway", slug: "mandalay-pol",
      description: `Experience the cultural heritage of Mandalay and the cool weather of Pyin Oo Lwin. ${inclusiveText}`,
      location: "Mandalay Region", images: ["/image/mdy.jpg"], isFeatured: true,
    }
  });

  const mdyPolPrices = [
    { days: 2, name: "1 Night 2 Days", p: 250000 }, { days: 3, name: "2 Nights 3 Days", p: 350000 },
    { days: 4, name: "3 Nights 4 Days", p: 450000 }, { days: 5, name: "4 Nights 5 Days", p: 550000 },
    { days: 6, name: "5 Nights 6 Days", p: 650000 }, { days: 7, name: "6 Nights 7 Days", p: 750000 }
  ];
  for (const plan of mdyPolPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: mdyPol.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  // ==========================================
  // TOUR 6: Taunggyi - Kalaw - Inle
  // ==========================================
  const shan = await prisma.tourPackage.create({
    data: {
      title: "Taunggyi - Kalaw - Inle Lake", slug: "shan-state-trip",
      description: `Enjoy the natural beauty of Shan State, floating villages of Inle, and pine forests of Kalaw. ${inclusiveText}`,
      location: "Shan State", images: ["/image/inlay.jpg"], isFeatured: true,
    }
  });

  const shanPrices = [
    { days: 2, name: "1 Night 2 Days", p: 280000 }, { days: 3, name: "2 Nights 3 Days", p: 380000 },
    { days: 4, name: "3 Nights 4 Days", p: 480000 }, { days: 5, name: "4 Nights 5 Days", p: 580000 },
    { days: 6, name: "5 Nights 6 Days", p: 680000 }, { days: 7, name: "6 Nights 7 Days", p: 780000 }
  ];
  for (const plan of shanPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: shan.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  // ==========================================
  // TOUR 7: Ngwe Saung
  // ==========================================
  const ngwesaung = await prisma.tourPackage.create({
    data: {
      title: "Ngwe Saung Beach Vacation", slug: "ngwesaung-beach",
      description: `Relax on the pristine white sands of Ngwe Saung. ${inclusiveText}`,
      location: "Ayeyarwady Region", images: ["/image/ns.jpg"], isFeatured: true,
    }
  });

  const beachPrices = [
    { days: 2, name: "1 Night 2 Days", p: 180000 }, { days: 3, name: "2 Nights 3 Days", p: 250000 },
    { days: 4, name: "3 Nights 4 Days", p: 320000 }, { days: 5, name: "4 Nights 5 Days", p: 400000 }
  ];
  for (const plan of beachPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: ngwesaung.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  // ==========================================
  // TOUR 8: Chaung Tha
  // ==========================================
  // ==========================================
  // TOUR 8: Chaung Tha (Updated with Loop Pricing)
  // ==========================================
  const chaungtha = await prisma.tourPackage.create({
    data: {
      title: "Chaung Tha Beach Trip",
      slug: "chaungtha-beach",
      description: `A lively and fun beach destination. ${inclusiveText}`,
      location: "Ayeyarwady Region",
      images: ["/image/ct.jpg"],
      isFeatured: false,
    }
  });

  const ctPrices = [
    { days: 2, name: "1 Night 2 Days", p: 180000 },
    { days: 3, name: "2 Nights 3 Days", p: 250000 },
    { days: 4, name: "3 Nights 4 Days", p: 320000 },
    { days: 5, name: "4 Nights 5 Days", p: 400000 }
  ];

  for (const plan of ctPrices) {
    await prisma.tourPlan.create({
      data: {
        name: plan.name,
        durationDays: plan.days,
        tourPackageId: chaungtha.id,
        prices: {
          create: [
            { vehicleId: salon.id, price: plan.p, deposit: plan.p * 0.2 },
            { vehicleId: alphard.id, price: plan.p * 1.5, deposit: plan.p * 1.5 * 0.2 },
            { vehicleId: hiace.id, price: plan.p * 1.8, deposit: plan.p * 1.8 * 0.2 },
            { vehicleId: minibus.id, price: plan.p * 3, deposit: plan.p * 3 * 0.2 },
            { vehicleId: bus.id, price: plan.p * 4, deposit: plan.p * 4 * 0.2 }
          ]
        }
      }
    });
  }

  // ==========================================
  // TOUR 9: Kyaiktiyo (Updated with Loop Pricing)
  // ==========================================
  const kyaiktiyo = await prisma.tourPackage.create({
    data: {
      title: "Kyaiktiyo (Golden Rock) Pilgrimage",
      slug: "golden-rock",
      description: `A spiritual journey to the famous Golden Rock Pagoda. ${inclusiveText}`,
      location: "Mon State",
      images: ["/image/khy.jpg"],
      isFeatured: false,
    }
  });

  const kytPrices = [
    { days: 1, name: "Day Return", p: 150000 },
    { days: 2, name: "1 Night 2 Days", p: 250000 },
    { days: 3, name: "2 Nights 3 Days", p: 350000 },
    { days: 4, name: "3 Nights 4 Days", p: 450000 }
  ];

  for (const plan of kytPrices) {
    await prisma.tourPlan.create({
      data: {
        name: plan.name,
        durationDays: plan.days,
        tourPackageId: kyaiktiyo.id,
        prices: {
          create: [
            { vehicleId: salon.id, price: plan.p, deposit: plan.p * 0.2 },
            { vehicleId: alphard.id, price: plan.p * 1.5, deposit: plan.p * 1.5 * 0.2 },
            { vehicleId: hiace.id, price: plan.p * 1.8, deposit: plan.p * 1.8 * 0.2 },
            { vehicleId: minibus.id, price: plan.p * 3, deposit: plan.p * 3 * 0.2 },
            { vehicleId: bus.id, price: plan.p * 4, deposit: plan.p * 4 * 0.2 }
          ]
        }
      }
    });
  }

  // ==========================================
  // TOUR 10: Hpa-An (Adventure Trip)
  // ==========================================
  const hpaan = await prisma.tourPackage.create({
    data: {
      title: "Hpa-An Nature & Caves Adventure", slug: "hpa-an-adventure",
      description: `Explore mystical limestone caves and the iconic Kyauk Kalap monastery. ${inclusiveText}`,
      location: "Kayin State", images: ["/image/hpaan.jpg"], isFeatured: true,
    }
  });

  const hpaanPrices = [
    { days: 2, name: "1 Night 2 Days", p: 250000 },
    { days: 3, name: "2 Nights 3 Days", p: 350000 },
    { days: 4, name: "3 Nights 4 Days", p: 450000 }
  ];
  for (const plan of hpaanPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: hpaan.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  // ==========================================
  // TOUR 11: Bago (Ancient Hanthawaddy)
  // ==========================================
  const bago = await prisma.tourPackage.create({
    data: {
      title: "Ancient Hanthawaddy Bago Tour", slug: "bago-sightseeing",
      description: `Visit the famous Shwemawdaw Pagoda and the historic Kanbawzathadi Palace. ${inclusiveText}`,
      location: "Bago Region", images: ["/image/bago.jpg"], isFeatured: false,
    }
  });

  await prisma.tourPlan.create({ 
    data: { 
      name: "Day Return Tour", 
      durationDays: 1, 
      tourPackageId: bago.id, 
      prices: { 
        create: [ 
          { vehicleId: salon.id, price: 100000, deposit: 20000 }, 
          { vehicleId: alphard.id, price: 150000, deposit: 30000 }, 
          { vehicleId: hiace.id, price: 180000, deposit: 40000 } 
        ] 
      } 
    } 
  });

  // ==========================================
  // TOUR 12: Mount Popa (Spirit Mountain)
  // ==========================================
  const popa = await prisma.tourPackage.create({
    data: {
      title: "Mount Popa Spirit Mountain", slug: "mount-popa",
      description: `Visit the mystical extinct volcano and the home of Myanmar's nats (spirits). ${inclusiveText}`,
      location: "Mandalay Region", images: ["/image/popa.jpg"], isFeatured: true,
    }
  });

  await prisma.tourPlan.create({ 
    data: { 
      name: "Day Return from Bagan", 
      durationDays: 1, 
      tourPackageId: popa.id, 
      prices: { 
        create: [ 
          { vehicleId: salon.id, price: 60000, deposit: 10000 }, 
          { vehicleId: alphard.id, price: 90000, deposit: 20000 }, 
          { vehicleId: hiace.id, price: 120000, deposit: 30000 } 
        ] 
      } 
    } 
  });

  const kyPrices = [
    { days: 1, name: "Day Return", p: 150000 }, { days: 2, name: "Day Return", p: 250000 },
    { days: 2, name: "1 Nights 2 Days", p: 350000 }, { days: 3, name: "1 Nights 2 Days", p: 450000 }
  ];
  for (const plan of kyPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: kyaiktiyo.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  console.log("✅ ALL explicit pricing and new day trips seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });