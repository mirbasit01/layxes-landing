import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/mock-data";
import { formatPrice, discountPercent } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const onSale = product.salePrice != null;
  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
          {onSale && (
            <Badge className="bg-[var(--sale)] text-[var(--sale-foreground)]">
              -{discountPercent(product.price, product.salePrice!)}%
            </Badge>
          )}
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {product.subcategory}
        </p>
        <h3 className="text-sm font-medium leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
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
