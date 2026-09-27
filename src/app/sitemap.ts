import type { MetadataRoute } from "next";
import { products } from "@/lib/mock-data";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk";

export default function sitemap(): MetadataRoute.Sitemap {
  const collections: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/products?category=Hoodies`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/products?category=Bottoms`, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/products?category=Sets`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/products?sale=1`, changeFrequency: "daily", priority: 0.7 },
  ];

  return [
    ...collections,
    ...products.map((product) => ({
      url: `${siteUrl}/products/${product.slug}`,
      lastModified: new Date(product.createdAt),
      changeFrequency: "weekly" as const,
      priority: product.isFeatured ? 0.8 : 0.7,
    })),
  ];
}
