export type Category = "Men" | "Women" | "Kids" | "Accessories";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  subcategory: string;
  price: number;
  salePrice?: number;
  colors: ColorOption[];
  sizes: string[];
  outOfStockSizes?: string[];
  images: string[];
  description: string;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  createdAt: number;
}

const img = (seed: string, w = 600, h = 800) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const gallery = (seed: string) => [
  img(`${seed}-front`),
  img(`${seed}-back`),
  img(`${seed}-side`),
  img(`${seed}-detail`),
];

const APPAREL = ["S", "M", "L", "XL"];
const APPAREL_XL = ["S", "M", "L", "XL", "XXL"];
const KIDS = ["2-3Y", "4-5Y", "6-7Y", "8-9Y"];
const ONE = ["One Size"];

const C = {
  black: { name: "Black", hex: "#0a0a0a" },
  white: { name: "White", hex: "#f8fafc" },
  emerald: { name: "Emerald", hex: "#10b981" },
  navy: { name: "Navy", hex: "#1e3a8a" },
  beige: { name: "Beige", hex: "#d6c6a8" },
  rose: { name: "Rose", hex: "#e11d48" },
  mustard: { name: "Mustard", hex: "#d4a017" },
  sky: { name: "Sky", hex: "#38bdf8" },
  charcoal: { name: "Charcoal", hex: "#3f3f46" },
  maroon: { name: "Maroon", hex: "#7f1d1d" },
  cream: { name: "Cream", hex: "#f5efe0" },
  olive: { name: "Olive", hex: "#556b2f" },
};

const now = Date.now();
const day = 86_400_000;
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

interface Seed {
  name: string;
  category: Category;
  subcategory: string;
  price: number;
  salePrice?: number;
  colors: ColorOption[];
  sizes: string[];
  outOfStockSizes?: string[];
  description: string;
  isFeatured?: boolean;
  isNew?: boolean;
  daysAgo: number;
}

const SEEDS: Seed[] = [
  { name: "Floral Lawn 3-Piece Suit", category: "Women", subcategory: "Lawn Suit", price: 6500, salePrice: 4990, colors: [C.rose, C.beige, C.emerald], sizes: APPAREL, outOfStockSizes: ["S"], description: "Hand-embroidered lawn 3-piece with chiffon dupatta and trousers. Lightweight cotton lawn keeps you cool through Pakistani summers. Perfect for daytime events and casual gatherings.", isFeatured: true, isNew: true, daysAgo: 1 },
  { name: "Embroidered Chikankari Kameez", category: "Women", subcategory: "Kameez", price: 4200, colors: [C.sky, C.white], sizes: APPAREL, description: "Delicate Lucknowi chikankari threadwork on premium lawn fabric. A timeless silhouette that pairs effortlessly with shalwar or trousers. Soft pastels keep the look fresh.", isFeatured: true, daysAgo: 5 },
  { name: "Premium Luxury Lawn Suit", category: "Women", subcategory: "Lawn Suit", price: 8500, salePrice: 6800, colors: [C.maroon, C.navy], sizes: APPAREL, description: "Premium quality lawn with intricate Mughal-inspired prints and zari border. Includes embroidered front, plain back and printed dupatta. A statement summer piece.", isFeatured: true, daysAgo: 12 },
  { name: "Printed Shalwar Kameez Set", category: "Women", subcategory: "Shalwar Kameez", price: 3800, colors: [C.mustard, C.charcoal], sizes: APPAREL, outOfStockSizes: ["L"], description: "Easy everyday shalwar kameez in breathable cotton with subtle geometric prints. Cut for a relaxed fit that moves with you all day.", isNew: true, daysAgo: 3 },
  { name: "Chiffon Embroidered Dupatta", category: "Women", subcategory: "Dupatta", price: 1200, salePrice: 899, colors: [C.rose, C.emerald, C.mustard, C.sky], sizes: ONE, description: "Sheer chiffon dupatta finished with hand-embroidered borders and sequin detailing. The perfect finishing touch for any outfit. Long enough to drape and style.", daysAgo: 20 },
  { name: "Pure Silk Banarsi Dupatta", category: "Women", subcategory: "Dupatta", price: 2400, colors: [C.maroon, C.beige], sizes: ONE, description: "Pure silk dupatta with traditional Banarsi handwoven motifs in metallic thread. A heritage piece that elevates festive and bridal looks.", daysAgo: 8 },
  { name: "Festive Lehenga Choli", category: "Women", subcategory: "Lehenga", price: 7900, salePrice: 5990, colors: [C.maroon, C.emerald], sizes: APPAREL, description: "Heavy festive lehenga with embroidered choli and net dupatta. Designed for mehndi nights, weddings and milestone celebrations. Showstopping silhouette.", isFeatured: true, isNew: true, daysAgo: 2 },
  { name: "Casual Tunic Top", category: "Women", subcategory: "Tunic", price: 2200, colors: [C.white, C.black, C.sky], sizes: APPAREL, description: "Lightweight tunic top in soft cotton blend. A versatile staple that pairs with jeans, trousers or shalwar. Easy care, easy wear.", daysAgo: 15 },

  { name: "Classic Cotton Kurta", category: "Men", subcategory: "Kurta", price: 2800, colors: [C.white, C.beige, C.navy], sizes: APPAREL_XL, description: "Breathable cotton kurta with a clean tailored fit and side slits. Wear it for Friday prayers, family dinners or layered under a waistcoat.", isFeatured: true, isNew: true, daysAgo: 4 },
  { name: "Embroidered Wedding Kurta", category: "Men", subcategory: "Kurta", price: 4500, salePrice: 3499, colors: [C.charcoal, C.cream], sizes: APPAREL_XL, outOfStockSizes: ["S"], description: "Hand-embroidered formal kurta with tonal threadwork along the placket and cuffs. Tailored for special occasions and shaadi season.", isFeatured: true, daysAgo: 9 },
  { name: "Linen Kurta Shalwar Set", category: "Men", subcategory: "Shalwar Kameez", price: 5200, colors: [C.beige, C.white, C.olive], sizes: APPAREL_XL, description: "Premium European linen shalwar kameez in a relaxed contemporary cut. Stays crisp in summer heat while looking effortlessly put-together.", daysAgo: 6 },
  { name: "Slim Fit Cotton Trousers", category: "Men", subcategory: "Trousers", price: 1900, colors: [C.black, C.beige, C.charcoal], sizes: APPAREL_XL, description: "Slim-fit cotton trousers cut for all-day comfort. Subtle stretch in the waistband and a tapered leg for a clean modern silhouette.", daysAgo: 11 },
  { name: "Formal Dress Trousers", category: "Men", subcategory: "Trousers", price: 2600, salePrice: 1999, colors: [C.navy, C.black], sizes: APPAREL_XL, description: "Crisp formal trousers in poly-wool blend, tailored for the office and evenings out. Built-in stretch, hidden hook closure.", daysAgo: 14 },
  { name: "Classic Waistcoat", category: "Men", subcategory: "Waistcoat", price: 3400, colors: [C.black, C.maroon], sizes: APPAREL_XL, description: "Tailored waistcoat with notched lapels and welt pockets. Layer it over a kurta or button-down for instant polish.", daysAgo: 18 },
  { name: "Casual Pique Polo Shirt", category: "Men", subcategory: "Shirt", price: 1500, colors: [C.emerald, C.white, C.navy, C.charcoal], sizes: APPAREL_XL, description: "Soft pique cotton polo with a ribbed collar and two-button placket. Built for weekends, weeknights and everything in between.", isNew: true, daysAgo: 2 },
  { name: "Slim Stretch Denim Jeans", category: "Men", subcategory: "Jeans", price: 3200, salePrice: 2499, colors: [C.navy, C.black], sizes: APPAREL_XL, description: "Slim-fit stretch denim with five-pocket styling and clean topstitching. Holds shape wash after wash.", isFeatured: true, daysAgo: 22 },

  { name: "Kids Floral Frock", category: "Kids", subcategory: "Frock", price: 1800, salePrice: 1290, colors: [C.rose, C.sky], sizes: KIDS, description: "Adorable floral frock in soft cotton with a twirl-worthy hem and bow detail. Comfortable enough for play, sweet enough for portraits.", isNew: true, daysAgo: 1 },
  { name: "Kids Party Frock", category: "Kids", subcategory: "Frock", price: 2400, colors: [C.rose, C.maroon], sizes: KIDS, outOfStockSizes: ["2-3Y"], description: "Festive layered frock with satin bow and tulle underskirt. Made for birthdays, Eid and everything in between.", daysAgo: 7 },
  { name: "Kids Cotton Kurta Set", category: "Kids", subcategory: "Kurta Set", price: 2100, colors: [C.white, C.beige], sizes: KIDS, description: "Mini cotton kurta and matching shalwar for little men. Easy to wear, easy to wash, and ready for family functions.", isFeatured: true, daysAgo: 10 },
  { name: "Kids Printed T-Shirt", category: "Kids", subcategory: "T-Shirt", price: 800, colors: [C.sky, C.emerald, C.mustard], sizes: KIDS, description: "Soft 100% cotton tee with playful prints kids actually want to wear. Tagless neckline for itch-free comfort.", isNew: true, daysAgo: 16 },
  { name: "Kids Denim Dungaree", category: "Kids", subcategory: "Dungaree", price: 2700, salePrice: 1999, colors: [C.navy], sizes: KIDS, description: "Classic denim dungarees with adjustable straps and chest pocket. Durable enough for park days, cute enough for outings.", daysAgo: 13 },
  { name: "Kids Knit Sweater", category: "Kids", subcategory: "Sweater", price: 1900, colors: [C.maroon, C.charcoal], sizes: KIDS, description: "Cozy knit sweater for cooler weather, with ribbed cuffs and crew neckline. Layers easily over shirts and tees.", daysAgo: 25 },

  { name: "Genuine Leather Belt", category: "Accessories", subcategory: "Belt", price: 1400, colors: [C.black, C.beige], sizes: ["32", "34", "36", "38"], description: "Genuine cowhide leather belt with a brushed metal buckle. Ages beautifully and goes with everything from jeans to formal trousers.", daysAgo: 6 },
  { name: "Canvas Tote Bag", category: "Accessories", subcategory: "Bag", price: 1100, salePrice: 849, colors: [C.beige, C.black, C.emerald], sizes: ONE, description: "Roomy heavy-canvas tote with reinforced straps. Perfect for groceries, the gym or weekend errands.", isNew: true, daysAgo: 3 },
  { name: "Embroidered Evening Clutch", category: "Accessories", subcategory: "Bag", price: 2200, colors: [C.rose, C.maroon, C.emerald], sizes: ONE, description: "Hand-embroidered clutch with bead and sequin detailing. A statement finish for evenings, weddings and dinners out.", isFeatured: true, daysAgo: 19 },
  { name: "Cotton Stole Wrap", category: "Accessories", subcategory: "Stole", price: 950, colors: [C.sky, C.beige, C.mustard], sizes: ONE, description: "Lightweight cotton stole with tassel finish. Layer it over kurtas, drape it as a scarf or use it as a shawl on cool nights.", daysAgo: 11 },
  { name: "UV Protected Sunglasses", category: "Accessories", subcategory: "Eyewear", price: 1800, salePrice: 1299, colors: [C.black, C.beige], sizes: ONE, description: "Lightweight UV400 sunglasses with polarized lenses and acetate frame. Includes hard case and microfiber cloth.", isNew: true, daysAgo: 4 },
  { name: "Wool Winter Scarf", category: "Accessories", subcategory: "Scarf", price: 1600, colors: [C.charcoal, C.maroon, C.navy], sizes: ONE, description: "Warm wool-blend scarf in classic colors. Wide enough to wrap, soft enough to wear all day.", daysAgo: 21 },
  { name: "Handcrafted Khussa Shoes", category: "Accessories", subcategory: "Footwear", price: 2800, colors: [C.beige, C.maroon, C.emerald], sizes: ["6", "7", "8", "9", "10"], outOfStockSizes: ["10"], description: "Traditional Multani khussa handcrafted from genuine leather with tonal embroidery. Pairs beautifully with kurtas and formal wear.", daysAgo: 8 },
  { name: "Slim Leather Wallet", category: "Accessories", subcategory: "Wallet", price: 1300, colors: [C.black, C.beige], sizes: ONE, description: "Slim bifold wallet in genuine leather with six card slots and a billfold compartment. Slips into any pocket.", daysAgo: 17 },
];

export const products: Product[] = SEEDS.map((s, i) => {
  const id = `p${i + 1}`;
  return {
    id,
    slug: `${slugify(s.name)}-${id}`,
    name: s.name,
    category: s.category,
    subcategory: s.subcategory,
    price: s.price,
    salePrice: s.salePrice,
    colors: s.colors,
    sizes: s.sizes,
    outOfStockSizes: s.outOfStockSizes,
    images: gallery(`clothco-${id}`),
    description: s.description,
    stock: rand(0, 100),
    isNew: s.isNew,
    isFeatured: s.isFeatured,
    rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
    reviewCount: rand(10, 200),
    createdAt: now - s.daysAgo * day,
  };
});
export const categories = [
  { name: "Women" as Category, image: img("clothco-cat-women", 800, 1000), href: "/products?category=Women" },
  { name: "Men" as Category, image: img("clothco-cat-men", 800, 1000), href: "/products?category=Men" },
  { name: "Kids" as Category, image: img("clothco-cat-kids", 800, 1000), href: "/products?category=Kids" },
  { name: "Accessories" as Category, image: img("clothco-cat-acc", 800, 1000), href: "/products?category=Accessories" },
  { name: "Lawn" as any, image: img("clothco-cat-lawn", 800, 1000), href: "/products?category=Women" },
  { name: "Formal" as any, image: img("clothco-cat-formal", 800, 1000), href: "/products?category=Men" },
  { name: "Casual" as any, image: img("clothco-cat-casual", 800, 1000), href: "/products" },
  { name: "Festive" as any, image: img("clothco-cat-festive", 800, 1000), href: "/products" },
];

export const heroImage = img("clothco-hero-banner", 1920, 1080);

export const provinces = ["Punjab", "Sindh", "KPK", "Balochistan", "AJK", "Gilgit-Baltistan"];

export const allColors: ColorOption[] = (() => {
  const map = new Map<string, ColorOption>();
  products.forEach((p) => p.colors.forEach((c) => map.set(c.name, c)));
  return Array.from(map.values());
})();

export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));

export const findBySlug = (slug: string) => products.find((p) => p.slug === slug);
