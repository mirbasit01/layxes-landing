import type { Metadata } from "next";
import { ProductsListing } from "@/components/site/ProductsListing";

const categorySeo: Record<string, { title: string; description: string }> = {
  Hoodies: { title: "Winter Hoodies", description: "Shop oversized and heavyweight LAYXES hoodies in premium brushed fleece. Winter essentials designed in Pakistan." },
  Bottoms: { title: "Relaxed Trousers & Sweatpants", description: "Explore relaxed sweatpants and utility trousers from the LAYXES Winter Drop. Everyday fits, designed in Pakistan." },
  Sets: { title: "Matching Winter Sets", description: "Shop coordinated LAYXES hoodie and sweatpants sets. Premium winter streetwear delivered across Pakistan." },
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sale?: string; sort?: string }>;
}): Promise<Metadata> {
  const { category, sale } = await searchParams;
  const selectedCategory = category ? categorySeo[category] : undefined;
  const isSale = sale === "1";
  const title = isSale ? "Final Call — Winter Sale" : selectedCategory?.title ?? "Winter Drop 01";
  const description = isSale
    ? "Shop last-call offers on selected LAYXES winter essentials. Limited pieces available."
    : selectedCategory?.description ?? "Discover the LAYXES Winter Drop 01: premium hoodies, sweatpants and winter streetwear, designed in Pakistan.";
  const canonical = isSale ? "/products?sale=1" : selectedCategory ? `/products?category=${encodeURIComponent(category!)}` : "/products";

  return {
    title,
    description,
    alternates: { canonical },
    robots: category && !selectedCategory ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { type: "website", title: `${title} | LAYXES`, description, url: canonical, siteName: "LAYXES", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: `${title} | LAYXES`, description, images: ["/opengraph-image"] },
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sale?: string }>;
}) {
  const { category, sale } = await searchParams;
  return <ProductsListing initialCategory={category} initialSale={sale === "1"} />;
}
