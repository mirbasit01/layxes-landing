"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CART_DRAWER_OPEN } from "@/lib/cart-events";
import { formatPrice } from "@/lib/format";
import { shippingFor, useCart } from "@/lib/cart-store";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const items = useCart((state) => state.items);
  const subtotal = useCart((state) => state.subtotal());
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const shipping = shippingFor(subtotal);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(CART_DRAWER_OPEN, show);
    return () => window.removeEventListener(CART_DRAWER_OPEN, show);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex h-dvh w-[min(92vw,440px)] flex-col gap-0 overflow-hidden p-0">
        <SheetHeader className="border-b border-border px-5 py-5 pr-12 text-left sm:px-6">
          <SheetTitle className="flex items-center gap-2 font-display text-lg uppercase tracking-[.1em]">
            <ShoppingBag className="h-4 w-4" /> Your bag <span className="text-sm font-normal text-muted-foreground">({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
          </SheetTitle>
          {items.length > 0 && <p className="text-xs text-muted-foreground">Added to your bag</p>}
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            <p className="mt-4 font-display text-xl font-semibold">Your bag is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">Find your next winter essential.</p>
            <Button asChild className="mt-6 rounded-none px-7 uppercase tracking-wider">
              <Link href="/products" onClick={() => setOpen(false)}>Shop the drop</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6">
              {subtotal < 5000 && <div className="border border-border p-3 text-xs leading-5">You’re {formatPrice(5000 - subtotal)} away from free delivery.</div>}
              {items.map((item) => (
                <div key={item.key} className="flex gap-4 border-b border-border pb-5">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-muted sm:h-32">
                    <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div><h3 className="text-sm font-semibold leading-snug">{item.name}</h3><p className="mt-1 text-xs text-muted-foreground">{item.size} · {item.color}</p></div>
                      <p className="shrink-0 text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex h-8 items-center border border-border">
                        <button aria-label={`Decrease ${item.name} quantity`} onClick={() => updateQuantity(item.key, item.quantity - 1)} className="grid h-8 w-8 place-items-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
                        <span className="w-7 text-center text-xs">{item.quantity}</span>
                        <button aria-label={`Increase ${item.name} quantity`} onClick={() => updateQuantity(item.key, item.quantity + 1)} className="grid h-8 w-8 place-items-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => removeItem(item.key)} className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border bg-background px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between text-sm"><span>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground"><span>Delivery</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
              <Button asChild className="mt-5 h-12 w-full rounded-none uppercase tracking-[.12em]">
                <Link href="/cart" onClick={() => setOpen(false)}>View bag · {formatPrice(subtotal + shipping)}</Link>
              </Button>
              <Link href="/products" onClick={() => setOpen(false)} className="mt-4 block text-center text-xs underline underline-offset-4">Continue shopping</Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
