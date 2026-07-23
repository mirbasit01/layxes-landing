import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/site/ProductDetail";
import { findBySlug } from "@/lib/mock-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      images: [product.images[0]],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = findBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
