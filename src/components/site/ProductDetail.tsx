"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, ChevronRight, Star, Heart, Share2, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products, type Product } from "@/lib/mock-data";
import { formatPrice, discountPercent } from "@/lib/format";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { openCartDrawer } from "@/lib/cart-events";

export function ProductDetail({ product }: { product: Product }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [shake, setShake] = useState(false);
  const [added, setAdded] = useState(false);
  const sizeSelectorRef = useRef<HTMLDivElement>(null);
  const addItem = useCart((s) => s.addItem);
  const wishHas = useWishlist((s) => s.ids.includes(product.id));
  const wishToggle = useWishlist((s) => s.toggle);

  const onSale = product.salePrice != null;
  const unitPrice = product.salePrice ?? product.price;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const maxQty = Math.max(1, Math.min(product.stock || 99, 99));

  const onAdd = () => {
    if (!size) {
      toast.error("Please select a size");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      sizeSelectorRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (product.outOfStockSizes?.includes(size)) {
      toast.error("That size is out of stock");
      return;
    }
    addItem(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0],
        price: unitPrice,
        size,
        color: color.name,
        colorHex: color.hex,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCartDrawer();
  };

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied!");
    } catch {
      toast.error("Couldn't copy link");
    }
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-5 pb-28 sm:px-6 sm:py-8 md:pb-8">
        <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.subcategory}</span>
        </nav>

        <div className="grid gap-6 md:grid-cols-[3fr_2fr] md:gap-10">
          {/* Gallery */}
          <div>
            <div className="group relative mx-auto aspect-[4/5] max-h-[58svh] w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60 sm:max-h-none">
              <Image
                src={product.images[imgIdx]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            {product.images.length > 1 && <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.filter((src, i, images) => images.indexOf(src) === i).slice(0, 4).map((src: string, i: number) => (
                <button
                  key={src}
                  onClick={() => setImgIdx(i)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${i === imgIdx ? "border-primary" : "border-transparent hover:border-border"}`}
                >
                  <Image src={src} alt={`${product.name} view ${i + 1}`} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>}
          </div>

          {/* Info */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{product.subcategory}</p>
            <h1 className="mt-1 font-display text-3xl font-bold tracking-tight md:text-4xl">{product.name}</h1>

            {/* Rating data and markup are kept ready, but hidden until reviews are launched. */}
            {false && <div className="mt-3 flex items-center gap-2 text-sm">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
                ))}
              </div>
              <span className="font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">· {product.reviewCount} reviews</span>
            </div>}

            {/* Price */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-3xl font-bold">{formatPrice(unitPrice)}</span>
              {onSale && (
                <>
                  <span className="text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  <Badge className="bg-[var(--sale)] text-[var(--sale-foreground)]">
                    {discountPercent(product.price, product.salePrice!)}% OFF
                  </Badge>
                </>
              )}
            </div>

            <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

            <hr className="my-6 border-border" />

            {/* Size */}
            <div ref={sizeSelectorRef}>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold">Select Size</h3>
                <button className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s: string) => {
                  const oos = product.outOfStockSizes?.includes(s);
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      disabled={oos}
                      onClick={() => setSize(s)}
                      title={oos ? "Out of stock" : s}
                      className={`min-w-12 rounded-xl border-2 px-3 py-2 text-sm font-semibold transition ${
                        active
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-foreground"
                      } ${oos ? "cursor-not-allowed text-muted-foreground line-through opacity-60" : ""}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
              {!size && shake && (
                <p className="mt-2 text-xs text-[var(--sale)]">Please select a size</p>
              )}
            </div>

            {/* Color */}
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-semibold">
                Color: <span className="font-normal text-muted-foreground">{color.name}</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c: { name: string; hex: string }) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c)}
                    aria-label={c.name}
                    title={c.name}
                    className={`h-9 w-9 rounded-full border-2 transition ${color.name === c.name ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className={`mt-8 flex items-center gap-3 ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
              <div className="flex items-center rounded-full border-2 border-border">
                <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
                <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1" onClick={onAdd}>
                {added ? "Added!" : "Add to Cart"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => wishToggle(product.id)}
                aria-label="Toggle wishlist"
                className={wishHas ? "border-[var(--sale)] text-[var(--sale)]" : ""}
              >
                <Heart className={`h-5 w-5 ${wishHas ? "fill-current" : ""}`} />
              </Button>
            </div>

            <hr className="my-6 border-border" />

            {/* Highlights */}
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Free delivery on orders over Rs. 5,000</li>
              <li className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-primary" /> Easy 7-day returns</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Genuine fabric, quality guaranteed</li>
            </ul>

            <Button variant="ghost" size="sm" onClick={onShare} className="mt-4 gap-2 text-muted-foreground">
              <Share2 className="h-4 w-4" /> Share / Copy link
            </Button>

            {/* Tabs */}
            <Tabs defaultValue="desc" className="mt-10">
              <TabsList>
                <TabsTrigger value="desc">Description</TabsTrigger>
                <TabsTrigger value="size">Size Guide</TabsTrigger>
                <TabsTrigger value="ship">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="desc" className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </TabsContent>
              <TabsContent value="size">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border text-left">
                      <tr><th className="py-2">Size</th><th>Chest (in)</th><th>Length (in)</th><th>Chest (cm)</th><th>Length (cm)</th></tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {[
                        ["XS", 34, 26, 86, 66],
                        ["S", 36, 27, 91, 68],
                        ["M", 38, 28, 96, 71],
                        ["L", 40, 29, 101, 73],
                        ["XL", 42, 30, 106, 76],
                      ].map((r) => (
                        <tr key={r[0]} className="border-b border-border/50">
                          {r.map((v, i) => <td key={i} className="py-2">{v}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              <TabsContent value="ship" className="text-sm leading-relaxed text-muted-foreground">
                Free standard shipping on orders over Rs. 5,000 across Pakistan. Delivery in 3–5 business days. Cash on delivery available.
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-4 pt-3 shadow-[0_-8px_24px_rgba(0,0,0,.08)] backdrop-blur md:hidden" style={{ paddingBottom: "max(.75rem, env(safe-area-inset-bottom))" }}>
          <div className="mx-auto flex max-w-lg items-center gap-3">
            <div className="min-w-0 shrink-0">
              <p className="truncate text-[10px] text-muted-foreground">{size ? `Size ${size}` : "Choose a size"}</p>
              <p className="text-sm font-semibold">{formatPrice(unitPrice)}</p>
            </div>
            <Button className="h-11 flex-1" onClick={onAdd}>{added ? "Added!" : "Add to Cart"}</Button>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-6 text-xl font-bold tracking-tight md:text-2xl">You may also like</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
