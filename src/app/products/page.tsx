import type { Metadata } from "next";
import { ProductsListing } from "@/components/site/ProductsListing";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse our full collection of Pakistani clothing and accessories.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sale?: string }>;
}) {
  const { category, sale } = await searchParams;
  return <ProductsListing initialCategory={category} initialSale={sale === "1"} />;
}
