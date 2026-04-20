import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const STORE_MARQUEE_ROWS = [
  {
    label: "Fashion & Lifestyle",
    tiles: [
      { name: "Zara", floor: "Level 0", image: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?auto=format&fit=crop&q=80&w=800", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg", description: "Global fashion leader offering the latest runway-inspired styles." },
      { name: "H&M", floor: "Level 0", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800", logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg", description: "Sustainable fashion and high-quality design." },
      { name: "Nike", floor: "Level 1", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg", description: "Innovative footwear and apparel." },
      { name: "Uniqlo", floor: "Level 0", image: "https://images.unsplash.com/photo-1618245472861-b2b4e88431ed?auto=format&fit=crop&q=80&w=800", logo: "https://placehold.co/400x150/transparent/FFFFFF/svg?text=UNIQLO", description: "Simple, high-quality everyday clothing." },
      { name: "Urban Outfitters", floor: "Level 1", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=800", logo: "https://placehold.co/400x150/transparent/FFFFFF/svg?text=URBAN+OUTFITTERS", description: "Lifestyle retailer for the creative-minded." }
    ]
  },
  {
    label: "Luxury & Accessories",
    tiles: [
      { name: "Rolex", floor: "Level 2", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800", logo: "https://placehold.co/400x150/transparent/FFFFFF/svg?text=ROLEX", description: "Epitome of luxury timekeeping." },
      { name: "Cartier", floor: "Level 2", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800", logo: "https://placehold.co/400x150/transparent/FFFFFF/svg?text=CARTIER", description: "Prestigious jewelry and watches." },
      { name: "Ray-Ban", floor: "Level 1", image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800", logo: "https://placehold.co/400x150/transparent/FFFFFF/svg?text=RAY-BAN", description: "Iconic eyewear and sunglasses." },
      { name: "Swarovski", floor: "Level 2", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800", logo: "https://placehold.co/400x150/transparent/FFFFFF/svg?text=SWAROVSKI", description: "Beauty of precision-cut crystals." },
      { name: "Louis Vuitton", floor: "Level 2", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=800", logo: "https://placehold.co/400x150/transparent/FFFFFF/svg?text=LOUIS+VUITTON", description: "Sophisticated luxury accessories." }
    ]
  }
];

async function main() {
  console.log("Cleaning database...");
  await prisma.shop.deleteMany();

  console.log("Seeding shops with floor data...");
  
  for (const row of STORE_MARQUEE_ROWS) {
    for (const tile of row.tiles) {
      await prisma.shop.create({
        data: {
          name: tile.name,
          image: tile.image,
          logo: tile.logo,
          description: tile.description,
          category: row.label,
          floor: tile.floor, // Added this line!
        },
      });
    }
  }
  
  console.log("Database successfully seeded with floor data!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });