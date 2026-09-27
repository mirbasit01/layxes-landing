"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { openCartDrawer } from "@/lib/cart-events";
import { formatPrice } from "@/lib/format";
import { products } from "@/lib/mock-data";

export function FitBuilder() {
  const [top, setTop] = useState(products[0]);
  const [bottom, setBottom] = useState(products[3]);
  const [size, setSize] = useState("M");
  const addItem = useCart((s) => s.addItem);
  const total = (top.salePrice ?? top.price) + (bottom.salePrice ?? bottom.price) - 500;
  const addFit = () => {
    for (const product of [top, bottom]) {
      const color = product.colors[0];
      addItem({ id: product.id, slug: product.slug, name: product.name, image: product.images[0], price: (product.salePrice ?? product.price) - 250, size, color: color.name, colorHex: color.hex });
    }
    openCartDrawer();
  };
  return <div className="grid overflow-hidden bg-card text-card-foreground md:grid-cols-[1fr_1fr_.9fr]">
    {[{ label: "01 / Choose your layer", value: top, set: setTop, choices: products.slice(0, 3) }, { label: "02 / Choose your bottoms", value: bottom, set: setBottom, choices: products.slice(3, 5) }].map(({ label, value, set, choices }) => <div key={label} className="border-b border-border p-5 sm:p-7 md:border-b-0 md:border-r">
      <p className="text-[9px] font-bold uppercase tracking-[.16em] text-muted-foreground">{label}</p>
      <div className="mt-5 flex items-center gap-4"><Image src={value.images[0]} alt={value.name} width={96} height={120} sizes="96px" className="h-24 w-20 object-cover sm:h-28 sm:w-24"/><div><p className="text-sm font-semibold">{value.name}</p><p className="mt-1 text-xs text-muted-foreground">{formatPrice(value.salePrice ?? value.price)}</p></div></div>
      <div className="mt-5 flex flex-wrap gap-2">{choices.map((p) => <button key={p.id} onClick={() => set(p)} className={`border px-3 py-2 text-[9px] font-semibold uppercase tracking-wide transition ${value.id === p.id ? "border-foreground bg-foreground text-background" : "border-border text-foreground hover:border-foreground"}`}>{p.name.replace("LAYXES ", "")}</button>)}</div>
    </div>)}
    <div className="flex flex-col justify-between p-5 sm:p-7"><div><p className="text-[9px] font-bold uppercase tracking-[.16em] text-muted-foreground">03 / Make it yours</p><p className="mt-5 text-xs font-semibold">Select your size</p><div className="mt-3 flex gap-2">{["S", "M", "L", "XL", "XXL"].map((s) => <button onClick={() => setSize(s)} key={s} className={`grid h-9 w-9 place-items-center border text-[10px] font-semibold ${size === s ? "border-foreground bg-foreground text-background" : "border-border text-foreground"}`}>{s}</button>)}</div></div><div className="mt-8"><div className="flex items-end justify-between"><span className="text-[9px] font-bold uppercase tracking-[.15em] text-muted-foreground">Your fit <span className="ml-1">· Rs. 500 off</span></span><span className="font-display text-2xl font-semibold">{formatPrice(total)}</span></div><button onClick={addFit} className="mt-4 flex h-12 w-full items-center justify-between bg-primary px-4 text-[9px] font-bold uppercase tracking-[.15em] text-primary-foreground transition hover:bg-primary/90">Add complete fit <ArrowRight className="h-4 w-4" /></button><p className="mt-3 flex items-center justify-center gap-1 text-[9px] text-muted-foreground"><Check className="h-3 w-3"/> Free delivery over Rs. 5,000</p></div></div>
  </div>;
}
