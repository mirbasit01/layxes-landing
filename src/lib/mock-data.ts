export type Category = "Men" | "Women" | "Kids" | "Accessories";

export interface Product {
  id: string;
  name: string;
  category: Category;
  subcategory: string;
  price: number;
  salePrice?: number;
  colors: string[]; // hex
  sizes: string[];
  outOfStockSizes?: string[];
  images: string[];
  description: string;
  isNew?: boolean;
  createdAt: number; // for "latest" sort
}

const img = (seed: string | number, w = 800, h = 1000) =>
  `https://picsum.photos/seed/clothco-${seed}/${w}/${h}`;

const gallery = (seed: string) => [
  img(`${seed}-a`),
  img(`${seed}-b`),
  img(`${seed}-c`),
  img(`${seed}-d`),
  img(`${seed}-e`),
];

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];
const KIDS_SIZES = ["2-3Y", "4-5Y", "6-7Y", "8-9Y"];
const ACC_SIZES = ["One Size"];

const COLORS = {
  emerald: "#10b981",
  navy: "#1e3a8a",
  black: "#0a0a0a",
  white: "#f5f5f4",
  beige: "#d6c6a8",
  rose: "#e11d48",
  mustard: "#d4a017",
  sky: "#38bdf8",
  charcoal: "#3f3f46",
  maroon: "#7f1d1d",
};

const now = Date.now();
const day = 86_400_000;

export const products: Product[] = [
  // Women - Lawn Suits
  { id: "p1", name: "Floral Lawn 3-Piece Suit", category: "Women", subcategory: "Lawn Suit", price: 6500, salePrice: 4990, colors: [COLORS.rose, COLORS.beige, COLORS.emerald], sizes: APPAREL_SIZES, outOfStockSizes: ["XS"], images: gallery("p1"), description: "Hand-embroidered lawn suit with chiffon dupatta. Perfect for summer events.", isNew: true, createdAt: now - 1 * day },
  { id: "p2", name: "Embroidered Lawn Kameez", category: "Women", subcategory: "Lawn Suit", price: 4200, colors: [COLORS.sky, COLORS.white], sizes: APPAREL_SIZES, images: gallery("p2"), description: "Lightweight embroidered kameez with intricate threadwork.", createdAt: now - 5 * day },
  { id: "p3", name: "Premium Lawn Suit", category: "Women", subcategory: "Lawn Suit", price: 8500, salePrice: 6800, colors: [COLORS.maroon, COLORS.navy], sizes: APPAREL_SIZES, images: gallery("p3"), description: "Premium quality lawn fabric with elegant prints.", createdAt: now - 12 * day },
  { id: "p4", name: "Printed Shalwar Kameez", category: "Women", subcategory: "Shalwar Kameez", price: 3800, colors: [COLORS.mustard, COLORS.charcoal], sizes: APPAREL_SIZES, outOfStockSizes: ["L"], images: gallery("p4"), description: "Comfortable everyday shalwar kameez with subtle prints.", createdAt: now - 3 * day, isNew: true },
  { id: "p5", name: "Chiffon Dupatta", category: "Women", subcategory: "Dupatta", price: 1200, salePrice: 899, colors: [COLORS.rose, COLORS.emerald, COLORS.mustard, COLORS.sky], sizes: ACC_SIZES, images: gallery("p5"), description: "Sheer chiffon dupatta with embroidered border.", createdAt: now - 20 * day },
  { id: "p6", name: "Silk Dupatta", category: "Women", subcategory: "Dupatta", price: 2400, colors: [COLORS.maroon, COLORS.beige], sizes: ACC_SIZES, images: gallery("p6"), description: "Pure silk dupatta with handwoven motifs.", createdAt: now - 8 * day },
  { id: "p7", name: "Festive Lehenga", category: "Women", subcategory: "Lehenga", price: 7900, salePrice: 5990, colors: [COLORS.maroon, COLORS.emerald], sizes: APPAREL_SIZES, images: gallery("p7"), description: "Festive lehenga choli for weddings and special occasions.", createdAt: now - 2 * day, isNew: true },
  { id: "p8", name: "Casual Tunic Top", category: "Women", subcategory: "Tunic", price: 2200, colors: [COLORS.white, COLORS.black, COLORS.sky], sizes: APPAREL_SIZES, images: gallery("p8"), description: "Casual tunic top, easy to pair with trousers or jeans.", createdAt: now - 15 * day },

  // Men - Kurtas / Trousers
  { id: "p9", name: "Classic Cotton Kurta", category: "Men", subcategory: "Kurta", price: 2800, colors: [COLORS.white, COLORS.beige, COLORS.navy], sizes: APPAREL_SIZES, images: gallery("p9"), description: "Breathable cotton kurta with a tailored fit.", createdAt: now - 4 * day, isNew: true },
  { id: "p10", name: "Embroidered Kurta", category: "Men", subcategory: "Kurta", price: 4500, salePrice: 3499, colors: [COLORS.charcoal, COLORS.white], sizes: APPAREL_SIZES, outOfStockSizes: ["XS", "S"], images: gallery("p10"), description: "Hand-embroidered formal kurta for occasions.", createdAt: now - 9 * day },
  { id: "p11", name: "Linen Kurta Shalwar", category: "Men", subcategory: "Shalwar Kameez", price: 5200, colors: [COLORS.beige, COLORS.white], sizes: APPAREL_SIZES, images: gallery("p11"), description: "Premium linen kurta shalwar for everyday elegance.", createdAt: now - 6 * day },
  { id: "p12", name: "Cotton Trousers", category: "Men", subcategory: "Trousers", price: 1900, colors: [COLORS.black, COLORS.beige, COLORS.charcoal], sizes: APPAREL_SIZES, images: gallery("p12"), description: "Slim-fit cotton trousers, all-day comfortable.", createdAt: now - 11 * day },
  { id: "p13", name: "Formal Dress Trousers", category: "Men", subcategory: "Trousers", price: 2600, salePrice: 1999, colors: [COLORS.navy, COLORS.black], sizes: APPAREL_SIZES, images: gallery("p13"), description: "Crisp formal trousers tailored for the office.", createdAt: now - 14 * day },
  { id: "p14", name: "Waistcoat", category: "Men", subcategory: "Waistcoat", price: 3400, colors: [COLORS.black, COLORS.maroon], sizes: APPAREL_SIZES, images: gallery("p14"), description: "Classic waistcoat to layer over a kurta or shirt.", createdAt: now - 18 * day },
  { id: "p15", name: "Casual Polo Shirt", category: "Men", subcategory: "Shirt", price: 1500, colors: [COLORS.emerald, COLORS.white, COLORS.navy, COLORS.charcoal], sizes: APPAREL_SIZES, images: gallery("p15"), description: "Soft pique polo shirt for casual days.", createdAt: now - 2 * day, isNew: true },
  { id: "p16", name: "Denim Jeans", category: "Men", subcategory: "Jeans", price: 3200, salePrice: 2499, colors: [COLORS.navy, COLORS.black], sizes: APPAREL_SIZES, images: gallery("p16"), description: "Slim-fit stretch denim jeans.", createdAt: now - 22 * day },

  // Kids
  { id: "p17", name: "Kids Floral Frock", category: "Kids", subcategory: "Frock", price: 1800, salePrice: 1290, colors: [COLORS.rose, COLORS.sky], sizes: KIDS_SIZES, images: gallery("p17"), description: "Adorable floral frock for little ones.", createdAt: now - 1 * day, isNew: true },
  { id: "p18", name: "Kids Party Frock", category: "Kids", subcategory: "Frock", price: 2400, colors: [COLORS.rose, COLORS.maroon], sizes: KIDS_SIZES, outOfStockSizes: ["2-3Y"], images: gallery("p18"), description: "Festive party frock with bow detail.", createdAt: now - 7 * day },
  { id: "p19", name: "Kids Cotton Kurta Set", category: "Kids", subcategory: "Kurta Set", price: 2100, colors: [COLORS.white, COLORS.beige], sizes: KIDS_SIZES, images: gallery("p19"), description: "Cotton kurta and shalwar set for boys.", createdAt: now - 10 * day },
  { id: "p20", name: "Kids T-Shirt", category: "Kids", subcategory: "T-Shirt", price: 800, colors: [COLORS.sky, COLORS.emerald, COLORS.mustard], sizes: KIDS_SIZES, images: gallery("p20"), description: "Soft cotton T-shirt, playful prints.", createdAt: now - 16 * day },
  { id: "p21", name: "Kids Denim Dungaree", category: "Kids", subcategory: "Dungaree", price: 2700, salePrice: 1999, colors: [COLORS.navy], sizes: KIDS_SIZES, images: gallery("p21"), description: "Adorable denim dungarees, durable and cute.", createdAt: now - 13 * day },
  { id: "p22", name: "Kids Knit Sweater", category: "Kids", subcategory: "Sweater", price: 1900, colors: [COLORS.maroon, COLORS.charcoal], sizes: KIDS_SIZES, images: gallery("p22"), description: "Warm knit sweater for chilly days.", createdAt: now - 25 * day },

  // Accessories
  { id: "p23", name: "Leather Belt", category: "Accessories", subcategory: "Belt", price: 1400, colors: [COLORS.black, COLORS.beige], sizes: ["32", "34", "36", "38"], images: gallery("p23"), description: "Genuine leather belt with metal buckle.", createdAt: now - 6 * day },
  { id: "p24", name: "Canvas Tote Bag", category: "Accessories", subcategory: "Bag", price: 1100, salePrice: 849, colors: [COLORS.beige, COLORS.black, COLORS.emerald], sizes: ACC_SIZES, images: gallery("p24"), description: "Spacious canvas tote, perfect for everyday errands.", createdAt: now - 3 * day, isNew: true },
  { id: "p25", name: "Embroidered Clutch", category: "Accessories", subcategory: "Bag", price: 2200, colors: [COLORS.rose, COLORS.maroon, COLORS.emerald], sizes: ACC_SIZES, images: gallery("p25"), description: "Statement embroidered clutch for evenings out.", createdAt: now - 19 * day },
  { id: "p26", name: "Cotton Stole", category: "Accessories", subcategory: "Stole", price: 950, colors: [COLORS.sky, COLORS.beige, COLORS.mustard], sizes: ACC_SIZES, images: gallery("p26"), description: "Lightweight cotton stole for layering.", createdAt: now - 11 * day },
  { id: "p27", name: "Sunglasses", category: "Accessories", subcategory: "Eyewear", price: 1800, salePrice: 1299, colors: [COLORS.black, COLORS.beige], sizes: ACC_SIZES, images: gallery("p27"), description: "UV protected, lightweight frames.", createdAt: now - 4 * day, isNew: true },
  { id: "p28", name: "Wool Scarf", category: "Accessories", subcategory: "Scarf", price: 1600, colors: [COLORS.charcoal, COLORS.maroon, COLORS.navy], sizes: ACC_SIZES, images: gallery("p28"), description: "Warm wool scarf for winter days.", createdAt: now - 21 * day },
  { id: "p29", name: "Khussa Shoes", category: "Accessories", subcategory: "Footwear", price: 2800, colors: [COLORS.beige, COLORS.maroon, COLORS.emerald], sizes: ["6", "7", "8", "9", "10"], outOfStockSizes: ["10"], images: gallery("p29"), description: "Traditional handcrafted khussa shoes.", createdAt: now - 8 * day },
  { id: "p30", name: "Leather Wallet", category: "Accessories", subcategory: "Wallet", price: 1300, colors: [COLORS.black, COLORS.beige], sizes: ACC_SIZES, images: gallery("p30"), description: "Slim leather wallet with multiple card slots.", createdAt: now - 17 * day },
];

export const categories: { name: Category; image: string; href: string }[] = [
  { name: "Women", image: img("cat-women"), href: "/products?category=Women" },
  { name: "Men", image: img("cat-men"), href: "/products?category=Men" },
  { name: "Kids", image: img("cat-kids"), href: "/products?category=Kids" },
  { name: "Accessories", image: img("cat-acc"), href: "/products?category=Accessories" },
];

export const heroImage = `https://picsum.photos/seed/clothco-hero/1920/900`;

export const provinces = ["Punjab", "Sindh", "KPK", "Balochistan", "AJK", "Gilgit-Baltistan"];

export const allColors = Array.from(new Set(products.flatMap((p) => p.colors)));
export const allSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
