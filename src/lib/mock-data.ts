export type Category = "Hoodies" | "Bottoms" | "Sets";
export interface ColorOption { name: string; hex: string }
export interface Product {
  id: string; slug: string; name: string; category: Category; subcategory: string;
  price: number; salePrice?: number; colors: ColorOption[]; sizes: string[];
  outOfStockSizes?: string[]; images: string[]; description: string; stock: number;
  isNew?: boolean; isFeatured?: boolean; rating: number; reviewCount: number; createdAt: number;
}

const sizes = ["S", "M", "L", "XL", "XXL"];
const colors = {
  black: { name: "Washed Black", hex: "#242421" },
  grey: { name: "Heather Grey", hex: "#9a9994" },
  cream: { name: "Oatmeal", hex: "#d7ccba" },
  navy: { name: "Midnight Navy", hex: "#252b37" },
  olive: { name: "Moss", hex: "#626554" },
};
const catalog = [
  { name: "LAYXES Oversized Hoodie", category: "Hoodies" as Category, type: "Heavyweight hoodie", price: 4999, shades: [colors.black, colors.grey, colors.cream], image: "photo-1556821840-3a63f95609a7", desc: "Our signature oversized hoodie in 320 GSM cotton-rich fleece. Dropped shoulders, double-layer hood, and a brushed interior for lasting warmth.", featured: true },
  { name: "LAYXES Essential Hoodie", category: "Hoodies" as Category, type: "Everyday hoodie", price: 4499, salePrice: 3999, shades: [colors.navy, colors.cream, colors.black], image: "photo-1578681994506-b8f463449011", desc: "An easy everyday layer in soft 300 GSM fleece. Clean lines, a relaxed fit, and a shape that holds its own season after season.", featured: true },
  { name: "LAYXES Heavyweight Hoodie", category: "Hoodies" as Category, type: "Premium fleece", price: 5499, shades: [colors.grey, colors.black], image: "photo-1620799140408-edc6dcb6d633", desc: "Built for the coldest days. Dense 380 GSM brushed cotton fleece with ribbed cuffs and hem that keep their shape.", featured: true },
  { name: "LAYXES Relaxed Sweatpants", category: "Bottoms" as Category, type: "Relaxed sweatpants", price: 3499, shades: [colors.grey, colors.black], image: "photo-1552902865-b72c031ac5ea", desc: "Relaxed straight-leg sweatpants in brushed fleece. Adjustable drawcord, deep pockets, and an easy all-day fit.", featured: true },
  { name: "LAYXES Utility Trouser", category: "Bottoms" as Category, type: "Utility trouser", price: 3999, shades: [colors.black, colors.olive], image: "photo-1517438476312-10d79c077509", desc: "A clean utility trouser with a relaxed taper, roomy pockets, and durable cotton twill for everyday wear.", featured: false },
  { name: "LAYXES Winter Set", category: "Sets" as Category, type: "Hoodie + sweatpants", price: 7999, shades: [colors.black, colors.grey, colors.cream], image: "photo-1556821840-3a63f95609a7", desc: "A matching heavyweight hoodie and relaxed sweatpant set. Two winter essentials, one effortless fit.", featured: true },
  { name: "LAYXES Everyday Zip Hoodie", category: "Hoodies" as Category, type: "Zip-up hoodie", price: 4999, shades: [colors.black, colors.grey], image: "photo-1556821840-3a63f95609a7", desc: "A full-zip layer in soft brushed fleece, finished with a structured hood and practical split pockets.", featured: true },
  { name: "LAYXES Core Crewneck", category: "Hoodies" as Category, type: "Crewneck sweatshirt", price: 4299, shades: [colors.cream, colors.black], image: "photo-1578681994506-b8f463449011", desc: "A clean crewneck built from substantial fleece, with ribbed cuffs and an easy relaxed shape.", featured: false },
  { name: "LAYXES Essential Pullover", category: "Hoodies" as Category, type: "Pullover hoodie", price: 4799, shades: [colors.navy, colors.grey], image: "photo-1620799140408-edc6dcb6d633", desc: "Everyday warmth in a straightforward pullover silhouette with a roomy hood and soft brushed finish.", featured: false },
  { name: "LAYXES Fleece Joggers", category: "Bottoms" as Category, type: "Tapered joggers", price: 3299, shades: [colors.black, colors.grey], image: "photo-1552902865-b72c031ac5ea", desc: "Soft fleece joggers with a tapered leg, elasticated cuffs, and an adjustable drawcord waist.", featured: true },
  { name: "LAYXES Straight Leg Sweatpants", category: "Bottoms" as Category, type: "Straight-leg sweatpants", price: 3699, shades: [colors.grey, colors.black], image: "photo-1517438476312-10d79c077509", desc: "A relaxed straight-leg profile with a comfortable elastic waist and deep everyday pockets.", featured: false },
  { name: "LAYXES Cargo Trouser", category: "Bottoms" as Category, type: "Utility cargo pants", price: 4499, shades: [colors.olive, colors.black], image: "photo-1551488831-00ddcb6c6bd3", desc: "Durable cotton cargo trousers with practical side pockets and a relaxed fit for daily wear.", featured: true },
  { name: "LAYXES Relaxed Chino", category: "Bottoms" as Category, type: "Relaxed-fit trouser", price: 4199, shades: [colors.cream, colors.olive], image: "photo-1523398002811-999ca8dec234", desc: "An easy relaxed trouser with a clean finish, made to pair with everything from tees to heavyweight layers.", featured: false },
  { name: "LAYXES Essential Co-ord Set", category: "Sets" as Category, type: "Sweatshirt + joggers", price: 7499, shades: [colors.grey, colors.black], image: "photo-1556821840-3a63f95609a7", desc: "A coordinated fleece sweatshirt and jogger set designed for comfortable off-duty days.", featured: true },
  { name: "LAYXES Zip Hoodie Set", category: "Sets" as Category, type: "Zip hoodie + joggers", price: 8299, shades: [colors.black, colors.navy], image: "photo-1578681994506-b8f463449011", desc: "A matching full-zip hoodie and tapered jogger set with a soft interior and relaxed everyday fit.", featured: false },
  { name: "LAYXES Heavyweight Lounge Set", category: "Sets" as Category, type: "Heavyweight fleece set", price: 8999, shades: [colors.cream, colors.grey], image: "photo-1620799140408-edc6dcb6d633", desc: "A substantial fleece top and relaxed bottoms, made as a versatile matching set for colder days.", featured: false },
];
const now = Date.now();
export const products: Product[] = catalog.map((p, i) => {
  const image = `https://images.unsplash.com/${p.image}?auto=format&fit=crop&w=900&q=85`;
  return { id: `p${i + 1}`, slug: `${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-p${i + 1}`, name: p.name, category: p.category, subcategory: p.type, price: p.price, salePrice: "salePrice" in p ? p.salePrice : undefined, colors: p.shades, sizes, images: [image], description: p.desc, stock: 24 + i * 7, isNew: true, isFeatured: p.featured, rating: 4.8, reviewCount: 18 + i * 7, createdAt: now - i * 86_400_000 };
});
export const categories = [
  { name: "Hoodies" as Category, image: products[0].images[0], href: "/products?category=Hoodies" },
  { name: "Bottoms" as Category, image: products[3].images[0], href: "/products?category=Bottoms" },
  { name: "Sets" as Category, image: products[5].images[0], href: "/products?category=Sets" },
];
export const heroImage = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=2000&q=90";
export const provinces = ["Punjab", "Sindh", "KPK", "Balochistan", "AJK", "Gilgit-Baltistan"];
export const allColors: ColorOption[] = Object.values(colors);
export const allSizes = sizes;
export const findBySlug = (slug: string) => products.find((p) => p.slug === slug);
