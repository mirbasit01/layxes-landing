"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";

export default function OrderSuccessPage() {
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  useEffect(() => {
    setName(sessionStorage.getItem("clothco-last-name") || "");
    setOrderId(`ORD-${Math.floor(1000 + Math.random() * 9000)}`);
  }, []);

  return (
    <SiteShell>
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <div className="relative">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <svg
            viewBox="0 0 80 80"
            className="relative h-24 w-24 rounded-full bg-primary/10 p-4 text-primary"
          >
            <circle cx="40" cy="40" r="36" className="success-circle" />
            <path d="M24 42 L36 54 L58 30" className="success-check" />
          </svg>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight md:text-4xl">Order Placed Successfully!</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Thank you{name ? `, ${name}` : ""}! Your order <span className="font-semibold text-foreground">#{orderId}</span> has been placed.
        </p>

        <div className="mt-8 w-full rounded-lg border border-border p-6 text-left">
          <Row label="Order ID" value={`#${orderId}`} bold />
          <Row label="Estimated delivery" value="3–5 business days" />
          <Row label="Payment" value="Cash on Delivery" />
          <p className="mt-4 text-xs text-muted-foreground">
            A confirmation email with your full order details has been sent.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/products">Continue Shopping</Link></Button>
          <Button size="lg" variant="outline" disabled>Track Order (Coming Soon)</Button>
        </div>
      </div>
    </SiteShell>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="mt-2 flex items-center justify-between text-sm first:mt-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={bold ? "font-semibold" : "font-medium"}>{value}</span>
    </div>
  );
}
