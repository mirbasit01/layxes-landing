"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, Trash2, ShoppingBag, ShieldCheck, Lock } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart, shippingFor, type CartItem } from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const addItem = useCart((s) => s.addItem);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const total = Math.max(0, subtotal - discount) + shipping;

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE10") {
      const d = Math.round(subtotal * 0.1);
      setDiscount(d);
      toast.success("Coupon applied", { description: `You saved ${formatPrice(d)}` });
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const onRemove = (i: CartItem) => {
    removeItem(i.key);
    toast("Removed from cart", {
      description: i.name,
      action: {
        label: "Undo",
        onClick: () => addItem(
          { id: i.id, slug: i.slug, name: i.name, image: i.image, price: i.price, size: i.size, color: i.color, colorHex: i.colorHex },
          i.quantity,
        ),
      },
    });
  };

  if (items.length === 0) {
    return (
      <SiteShell>
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
          <div className="grid h-24 w-24 place-items-center rounded-full bg-muted">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-sm text-muted-foreground">Looks like you haven't added anything yet.</p>
          <Button asChild className="mt-6" size="lg"><Link href="/products">Shop Now</Link></Button>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Your Cart ({items.length})</h1>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="divide-y divide-border rounded-lg border border-border">
            {items.map((i) => (
              <div key={i.key} className="flex gap-4 p-4">
                <Link href={`/products/${i.slug}`} className="shrink-0">
                  <img src={i.image} alt={i.name} className="h-28 w-24 rounded-md object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link href={`/products/${i.slug}`} className="font-medium hover:text-primary">
                        {i.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Size {i.size} · <span className="inline-flex items-center gap-1">
                          <span className="inline-block h-3 w-3 rounded-full border border-border align-middle" style={{ backgroundColor: i.colorHex }} />
                          {i.color}
                        </span>
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">{formatPrice(i.price)} each</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => onRemove(i)} aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center rounded-md border border-border">
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(i.key, i.quantity - 1)} aria-label="Decrease">
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-9 text-center text-sm tabular-nums">{i.quantity}</span>
                      <Button variant="ghost" size="icon" onClick={() => updateQuantity(i.key, i.quantity + 1)} aria-label="Increase">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="font-semibold">{formatPrice(i.price * i.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-lg border border-border p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <div className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              {discount > 0 && <Row label="Discount" value={`- ${formatPrice(discount)}`} accent />}
              <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
            </div>
            <Separator className="my-4" />
            <Row label="Total" value={formatPrice(total)} large />
            <div className="mt-5">
              <label className="text-xs text-muted-foreground">Coupon code (try SAVE10)</label>
              <div className="mt-1 flex gap-2">
                <Input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="SAVE10" />
                <Button variant="outline" onClick={applyCoupon}>Apply</Button>
              </div>
            </div>
            <Button asChild size="lg" className="mt-6 w-full"><Link href="/checkout">Proceed to Checkout</Link></Button>
            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><Lock className="h-3 w-3" /> Secure</span>
              <span className="inline-flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Safe payment</span>
            </div>
            <Link href="/products" className="mt-4 block text-center text-sm text-primary hover:underline">
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </SiteShell>
  );
}

function Row({ label, value, large, accent }: { label: string; value: string; large?: boolean; accent?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${large ? "text-lg font-bold" : ""} ${accent ? "text-primary" : ""}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
