import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/site/ProductDetail";
import { findBySlug } from "@/lib/mock-data";
import { products } from "@/lib/mock-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = findBySlug(slug);
  if (!product) return { title: "Product not found", robots: { index: false, follow: false } };
  return {
    title: product.name,
    description: `${product.description.slice(0, 130)} Shop online in Pakistan at LAYXES.`,
    alternates: { canonical: `/products/${product.slug}` },
    keywords: [product.name, product.subcategory, "winter streetwear Pakistan", "LAYXES"],
    openGraph: {
      type: "website",
      title: product.name,
      description: product.description,
      url: `/products/${product.slug}`,
      siteName: "LAYXES",
      images: [product.images[0]],
    },
    twitter: { card: "summary_large_image", title: product.name, description: product.description, images: [product.images[0]] },
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
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    image: product.images,
    category: product.subcategory,
    brand: { "@type": "Brand", name: "LAYXES" },
    color: product.colors.map((color) => color.name),
    size: product.sizes,
    offers: {
      "@type": "Offer",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk"}/products/${product.slug}`,
      priceCurrency: "PKR",
      price: product.salePrice ?? product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "LAYXES" },
    },
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk"}/` },
      { "@type": "ListItem", position: 2, name: "Winter Drop 01", item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk"}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk"}/products/${product.slug}` },
    ],
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([productJsonLd, breadcrumbJsonLd]).replace(/</g, "\\u003c") }} />
    <ProductDetail product={product} />
  </>;
}
