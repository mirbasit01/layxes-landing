"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/mock-data";
import { formatPrice, discountPercent } from "@/lib/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-store";
import { openCartDrawer } from "@/lib/cart-events";

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
    openCartDrawer();
  };

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted ring-1 ring-border/60 transition-shadow duration-300 group-hover:shadow-xl group-hover:ring-foreground/20">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-opacity duration-500"
          style={{ opacity: hovering ? 0 : 1 }}
        />
        <Image
          src={product.images[1] ?? product.images[0]}
          alt=""
          loading="lazy"
          aria-hidden
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ opacity: hovering ? 1 : 0 }}
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && <Badge className="bg-primary text-primary-foreground shadow-sm">New</Badge>}
          {onSale && (
            <Badge className="bg-[var(--sale)] text-[var(--sale-foreground)] shadow-sm">
              -{discountPercent(product.price, product.salePrice!)}%
            </Badge>
          )}
        </div>
        <div className="absolute inset-x-2 bottom-2 opacity-100 transition-all duration-200 md:inset-x-3 md:bottom-3">
          <Button onClick={quickAdd} size="sm" className="h-9 w-full gap-2 shadow-lg">
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {product.subcategory}
        </p>
        <h3 className="text-sm font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {/* Rating data and markup are kept ready, but hidden until reviews are launched. */}
        {false && <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-current text-foreground" />
          <span>{product.rating.toFixed(1)}</span>
          <span>· {product.reviewCount}</span>
        </div>}
        <div className="flex items-center gap-2 text-sm">
          {onSale ? (
            <>
              <span className="font-bold text-[var(--sale)]">{formatPrice(product.salePrice!)}</span>
              <span className="text-muted-foreground line-through text-xs">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-bold">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
