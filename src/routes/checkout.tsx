import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useCart, shippingFor } from "@/lib/cart-store";
import { provinces } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — ClothCo" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();

  // Client-side empty-cart redirect (avoids SSR mismatch with persisted store)
  useEffect(() => {
    if (items.length === 0) navigate({ to: "/cart" });
  }, [items.length, navigate]);

  const [form, setForm] = useState({
    name: "", email: "", phone: "+92 ", address: "", city: "", province: "", postal: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.province || !form.postal) {
      toast.error("Please complete all fields");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      clear();
      navigate({ to: "/order-success" });
    }, 700);
  };

  if (items.length === 0) return null;

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Checkout</h1>
        <form onSubmit={onSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Section title="Contact">
              <Field label="Full Name"><Input required value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email"><Input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} /></Field>
                <Field label="Phone"><Input required value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+92 300 1234567" /></Field>
              </div>
            </Section>
            <Section title="Shipping Address">
              <Field label="Address"><Input required value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street, area, landmarks" /></Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City"><Input required value={form.city} onChange={(e) => set("city", e.target.value)} /></Field>
                <Field label="Province">
                  <Select value={form.province} onValueChange={(v) => set("province", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {provinces.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Postal Code"><Input required value={form.postal} onChange={(e) => set("postal", e.target.value)} /></Field>
              </div>
            </Section>
          </div>

          <aside className="h-fit rounded-lg border border-border p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.key} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="h-14 w-12 rounded object-cover" />
                  <div className="flex-1 text-sm">
                    <p className="line-clamp-1 font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.size} • Qty {i.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">{formatPrice(i.price * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <Separator className="my-4" />
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
            <Separator className="my-3" />
            <Row label="Total" value={formatPrice(total)} large />
            <Button type="submit" size="lg" className="mt-5 w-full" disabled={submitting}>
              {submitting ? "Placing order..." : "Place Order"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              <Link to="/cart" className="hover:text-foreground">← Return to cart</Link>
            </p>
          </aside>
        </form>
      </div>
    </SiteShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border p-6">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
function Row({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className={`flex items-center justify-between text-sm ${large ? "text-base font-semibold" : ""}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
