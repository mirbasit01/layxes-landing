"use client";

import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products, type Category } from "@/lib/mock-data";

const SORTS = [
  { value: "latest", label: "Latest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "featured", label: "Featured" },
];

const CATEGORY_LABELS: Record<Category, string> = {
  Hoodies: "Hoodies",
  Bottoms: "Proportions",
  Sets: "Winter Sets",
};

export function ProductsListing({
  initialCategory,
  initialSale,
}: {
  initialCategory?: string;
  initialSale?: boolean;
}) {
  const [sort, setSort] = useState("latest");
  const category = initialCategory && initialCategory in CATEGORY_LABELS
    ? (initialCategory as Category)
    : undefined;

  const visibleProducts = useMemo(() => {
    const list = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (initialSale && product.salePrice == null) return false;
      return true;
    });
    switch (sort) {
      case "price-asc": list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "price-desc": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "featured": list.sort((a, b) => Number(!!b.isFeatured) - Number(!!a.isFeatured)); break;
      default: list.sort((a, b) => b.createdAt - a.createdAt);
    }
    return list;
  }, [category, initialSale, sort]);

  const title = initialSale ? "Final Call" : category ? CATEGORY_LABELS[category] : "Winter Drop 01";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk";
  const collectionUrl = initialSale
    ? `${siteUrl}/products?sale=1`
    : category
      ? `${siteUrl}/products?category=${encodeURIComponent(category)}`
      : `${siteUrl}/products`;
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: `Shop ${title} from LAYXES, premium winter streetwear designed in Pakistan.`,
    url: collectionUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: visibleProducts.length,
      itemListElement: visibleProducts.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/products/${product.slug}`,
        name: product.name,
      })),
    },
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd).replace(/</g, "\\u003c") }} />
      <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-12 lg:px-12">
        <div className="mb-7 flex items-end justify-between gap-4 border-b border-border pb-5 sm:mb-9 sm:pb-7">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-muted-foreground">LAYXES · 2026</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-.06em] sm:text-5xl">{title}</h1>
            <p className="mt-2 text-xs text-muted-foreground">{visibleProducts.length} pieces</p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">Premium heavyweight hoodies, relaxed sweatpants and everyday winter streetwear, designed in Pakistan by LAYXES.</p>
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-36 border-0 bg-transparent text-xs sm:w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              {SORTS.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {visibleProducts.length === 0 ? (
          <div className="py-24 text-center"><p className="font-display text-2xl">Coming soon</p><p className="mt-2 text-sm text-muted-foreground">New pieces are on the way.</p></div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
