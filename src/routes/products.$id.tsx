import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, ChevronRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/lib/mock-data";
import { formatPrice, discountPercent } from "@/lib/format";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = products.find((p) => p.id === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — ClothCo` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:image", content: loaderData.product.images[0] },
        ]
      : [],
  }),
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string>(product.colors[0]);
  const [qty, setQty] = useState(1);
  const addItem = useCart((s) => s.addItem);

  const onSale = product.salePrice != null;
  const unitPrice = product.salePrice ?? product.price;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const onAdd = () => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }
    if (product.outOfStockSizes?.includes(size)) {
      toast.error("That size is out of stock");
      return;
    }
    addItem(
      {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: unitPrice,
        size,
        color,
      },
      qty,
    );
    toast.success("Added to cart", { description: `${product.name} • ${size}` });
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/products" search={{ category: product.category }} className="hover:text-foreground">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <img src={product.images[imgIdx]} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((src, i) => (
                <button
                  key={src}
                  onClick={() => setImgIdx(i)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition ${i === imgIdx ? "border-primary" : "border-transparent"}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.subcategory}</p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-semibold">{formatPrice(unitPrice)}</span>
              {onSale && (
                <>
                  <span className="text-muted-foreground line-through">{formatPrice(product.price)}</span>
                  <Badge className="bg-[var(--sale)] text-[var(--sale-foreground)]">
                    -{discountPercent(product.price, product.salePrice!)}%
                  </Badge>
                </>
              )}
            </div>

            {/* Size */}
            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium">Size</h3>
                <button className="text-xs text-muted-foreground hover:text-foreground">Size guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const oos = product.outOfStockSizes?.includes(s);
                  const active = size === s;
                  return (
                    <button
                      key={s}
                      disabled={oos}
                      onClick={() => setSize(s)}
                      className={`min-w-12 rounded-md border px-3 py-2 text-sm transition ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-foreground"
                      } ${oos ? "cursor-not-allowed text-muted-foreground line-through opacity-60" : ""}`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color */}
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    aria-label={c}
                    className={`h-8 w-8 rounded-full border-2 transition ${color === c ? "border-primary ring-2 ring-primary/30" : "border-border"}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-md border border-border">
                <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <Button variant="ghost" size="icon" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button size="lg" className="flex-1" onClick={onAdd}>Add to cart</Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="desc" className="mt-10">
              <TabsList>
                <TabsTrigger value="desc">Description</TabsTrigger>
                <TabsTrigger value="size">Size Guide</TabsTrigger>
                <TabsTrigger value="ship">Shipping Info</TabsTrigger>
              </TabsList>
              <TabsContent value="desc" className="text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </TabsContent>
              <TabsContent value="size" className="text-sm leading-relaxed text-muted-foreground">
                Refer to the standard size chart. If between sizes, we recommend sizing up. Models wear size M.
              </TabsContent>
              <TabsContent value="ship" className="text-sm leading-relaxed text-muted-foreground">
                Free standard shipping on orders over Rs. 2,000 across Pakistan. Delivery in 3–5 business days.
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="mb-6 text-xl font-semibold tracking-tight">You may also like</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </div>
    </SiteShell>
  );
}
