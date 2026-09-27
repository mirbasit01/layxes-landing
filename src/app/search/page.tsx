import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search" },
  openGraph: { url: "/search", title: "Search LAYXES", description: "Find products in the LAYXES winter collection." },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim().toLowerCase();
  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query),
      )
    : [];

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {query ? <>Search results for <span className="text-primary">"{q}"</span></> : "Search"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {query ? `${results.length} product${results.length === 1 ? "" : "s"} found` : "Type a query in the header to search."}
        </p>

        {query && results.length === 0 && (
          <div className="mt-10 rounded-lg border border-dashed border-border p-16 text-center">
            <p className="text-muted-foreground">No products match your search.</p>
            <Button asChild variant="outline" className="mt-4"><Link href="/products">Browse all products</Link></Button>
          </div>
        )}

        {results.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
