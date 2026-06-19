import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/lib/wishlist-store";
import { products } from "@/lib/mock-data";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — ClothCo" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Your Wishlist</h1>
        {items.length === 0 ? (
          <div className="mx-auto mt-12 flex max-w-md flex-col items-center text-center">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-muted">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="mt-6 text-lg font-semibold">No saved items yet</p>
            <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any product to save it for later.</p>
            <Button asChild className="mt-6"><Link to="/products">Browse Products</Link></Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </SiteShell>
  );
}
