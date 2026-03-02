import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
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

  const inclusiveText = "Car rental, fuel, toll gate fees, and driver fees are all inclusive. Enjoy a hassle-free journey.";

  // ==========================================
  // TOUR 1: Yangon City Tour
  // ==========================================
  const yangon = await prisma.tourPackage.create({
    data: {
      title: "Yangon City Sightseeing", slug: "yangon-city",
      description: `Explore the commercial capital of Myanmar. ${inclusiveText}`,
      location: "Yangon Region", images: ["/image/Ygn.jpg"], isFeatured: true,
    }
  });
  
  await prisma.tourPlan.create({ 
    data: { 
        name: "Half Day Tour", 
        durationDays: 1, 
        tourPackageId: yangon.id, 
        prices: { 
            create: [ {
                 vehicleId: salon.id, price: 50000, deposit: 10000 }, { vehicleId: alphard.id, price: 80000, deposit: 20000 }, { vehicleId: hiace.id, price: 100000, deposit: 20000 }, { vehicleId: minibus.id, price: 150000, deposit: 30000 }, { vehicleId: bus.id, price: 200000, deposit: 50000 } ] } } });
  await prisma.tourPlan.create({ data: { name: "Full Day Tour", durationDays: 1, tourPackageId: yangon.id, prices: { create: [ { vehicleId: salon.id, price: 80000, deposit: 20000 }, { vehicleId: alphard.id, price: 120000, deposit: 30000 }, { vehicleId: hiace.id, price: 150000, deposit: 40000 }, { vehicleId: minibus.id, price: 250000, deposit: 50000 }, { vehicleId: bus.id, price: 350000, deposit: 80000 } ] } } });


  // ==========================================
  // TOUR 2: Bagan (Only)
  // ==========================================
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
  const chaungtha = await prisma.tourPackage.create({
    data: {
      title: "Chaung Tha Beach Trip", slug: "chaungtha-beach",
      description: `A lively and fun beach destination. ${inclusiveText}`,
      location: "Ayeyarwady Region", images: ["/image/ct.jpg"], isFeatured: false,
    }
  });


  // ==========================================
  // TOUR 9: Kyaiktiyo
  // ==========================================
  const kyaiktiyo = await prisma.tourPackage.create({
    data: {
      title: "Kyaiktiyo (Golden Rock) Pilgrimage", slug: "golden-rock",
      description: `A spiritual journey to the famous Golden Rock Pagoda. ${inclusiveText}`,
      location: "Mon State", images: ["/image/khy.jpg"], isFeatured: false,
    }
  });

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
    { days: 1, name: "Day Return", p: 150000 }, { days: 2, name: "1 Night 2 Days", p: 250000 },
    { days: 3, name: "2 Nights 3 Days", p: 350000 }, { days: 4, name: "3 Nights 4 Days", p: 450000 }
  ];
  for (const plan of kyPrices) {
    await prisma.tourPlan.create({ data: { name: plan.name, durationDays: plan.days, tourPackageId: kyaiktiyo.id, prices: { create: [ { vehicleId: salon.id, price: plan.p, deposit: plan.p*0.2 }, { vehicleId: alphard.id, price: plan.p*1.5, deposit: plan.p*1.5*0.2 }, { vehicleId: hiace.id, price: plan.p*1.8, deposit: plan.p*1.8*0.2 }, { vehicleId: minibus.id, price: plan.p*3, deposit: plan.p*3*0.2 }, { vehicleId: bus.id, price: plan.p*4, deposit: plan.p*4*0.2 } ] } } });
  }

  console.log("✅ ALL explicit explicit pricing seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });