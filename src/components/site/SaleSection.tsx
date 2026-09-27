"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/site/ProductCard";
import type { Product } from "@/lib/mock-data";

export function SaleSection({ products }: { products: Product[] }) {
  const [t, setT] = useState({ d: 2, h: 14, m: 32, s: 10 });
  useEffect(() => {
    const id = setInterval(() => {
      setT((prev) => {
        let { d, h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; d -= 1; }
        if (d < 0) return prev;
        return { d, h, m, s };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="bg-neutral-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/80">Limited time</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Flash Sale</h2>
            <p className="mt-1 text-sm text-white/70">Save on selected winter essentials.</p>
          </div>
          <div className="flex gap-3 text-center">
            <TimeBox label="Days" value={t.d} />
            <TimeBox label="Hours" value={t.h} />
            <TimeBox label="Min" value={t.m} />
            <TimeBox label="Sec" value={t.s} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p.id} className="rounded-xl bg-background p-2 text-foreground">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-16 rounded-none bg-white/10 px-3 py-2 ring-1 ring-white/20 backdrop-blur">
      <div className="font-display text-3xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/80">{label}</div>
    </div>
  );
}
