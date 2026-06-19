import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { formatPrice, discountPercent } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.salePrice != null;
  const unitPrice = product.salePrice ?? product.price;
  const addItem = useCart((s) => s.addItem);
  const [hovering, setHovering] = useState(false);

  const quickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const firstAvail = product.sizes.find((s) => !product.outOfStockSizes?.includes(s));
    if (!firstAvail) {
      toast.error("Out of stock");
      return;
    }
    const color = product.colors[0];
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0],
      price: unitPrice,
      size: firstAvail,
      color: color.name,
      colorHex: color.hex,
    });
    toast.success("Added to cart", { description: `${product.name} • ${firstAvail}` });
  };

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: hovering ? 0 : 1 }}
        />
        <img
          src={product.images[1] ?? product.images[0]}
          alt=""
          loading="lazy"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ opacity: hovering ? 1 : 0 }}
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
          {onSale && (
            <Badge className="bg-[var(--sale)] text-[var(--sale-foreground)]">
              -{discountPercent(product.price, product.salePrice!)}%
            </Badge>
          )}
        </div>
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <Button onClick={quickAdd} size="sm" className="w-full gap-2 shadow-lg">
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.subcategory}
        </p>
        <h3 className="text-sm font-medium leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
          <span>· {product.reviewCount}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {onSale ? (
            <>
              <span className="font-semibold">{formatPrice(product.salePrice!)}</span>
              <span className="text-muted-foreground line-through text-xs">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-semibold">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
