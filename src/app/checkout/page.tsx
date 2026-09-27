"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, LockKeyhole, PackageCheck } from "lucide-react";
import { z } from "zod";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart, shippingFor } from "@/lib/cart-store";
import { provinces } from "@/lib/mock-data";
import { formatPrice } from "@/lib/format";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().regex(/^\+92[\s-]?3\d{2}[\s-]?\d{7}$/, "Use +92 3XX XXXXXXX"),
  address: z.string().trim().min(5, "Address is too short").max(200),
  city: z.string().trim().min(2, "Enter your city").max(60),
  province: z.string().min(1, "Select a province"),
  postal: z.string().regex(/^\d{4,6}$/, "Enter a valid postal code"),
});
type FormShape = z.infer<typeof schema>;

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) router.push("/cart");
  }, [items.length, router]);

  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" }).then((response) => response.json()).then(({ user }) => {
      const saved = user?.metadata?.customer_profile as Partial<FormShape> | undefined;
      if (!user) return;
      setForm((current) => ({ ...current, email: user.email || current.email, ...saved }));
    }).catch(() => undefined);
  }, []);

  const [form, setForm] = useState<FormShape>({
    name: "", email: "", phone: "+92 ", address: "", city: "", province: "", postal: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormShape, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: typeof errors = {};
      parsed.error.issues.forEach((iss) => {
        const k = iss.path[0] as keyof FormShape;
        if (!errs[k]) errs[k] = iss.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    sessionStorage.setItem("layxes-last-name", form.name);
    const profile = { name: form.name, phone: form.phone, address: form.address, city: form.city, province: form.province, postal: form.postal };
    localStorage.setItem("layxes-customer", JSON.stringify({ ...profile, email: form.email }));
    try {
      const session = await fetch("/api/auth/session", { cache: "no-store" }).then((response) => response.json());
      if (session.user) await fetch("/api/auth/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
    } catch { /* Keep checkout moving if account profile sync is temporarily unavailable. */ }
    setTimeout(() => {
      clear();
      router.push("/order-success");
    }, 1500);
  };

  if (items.length === 0) return null;

  const set = (k: keyof FormShape, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
        <Link href="/cart" className="inline-flex items-center gap-2 text-xs text-muted-foreground transition hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5" /> Back to bag</Link>
        <div className="mt-7 flex flex-col justify-between gap-5 border-b border-border pb-6 sm:flex-row sm:items-end">
          <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">LAYXES · Secure checkout</p><h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">Almost yours.</h1><p className="mt-2 text-sm text-muted-foreground">Add your delivery details to place your order.</p></div>
          <ol className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground sm:gap-3"><li className="text-foreground">01 <span className="hidden sm:inline">Bag</span></li><span className="h-px w-5 bg-border"/><li className="text-foreground">02 <span className="hidden sm:inline">Delivery</span></li><span className="h-px w-5 bg-border"/><li>03 <span className="hidden sm:inline">Confirmation</span></li></ol>
        </div>
        <form onSubmit={onSubmit} className="mt-7 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="min-w-0 space-y-8">
            <Section title="Contact details" number="01">
              <p className="-mt-1 text-right text-xs text-muted-foreground">Already have an account? <Link href="/account/login?next=%2Fcheckout" className="font-medium text-foreground underline underline-offset-4">Sign in</Link></p>
              <Field label="Full Name" error={errors.name}>
                <Input autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" error={errors.email}>
                  <Input autoComplete="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <Input autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+92 370 4104941" />
                </Field>
              </div>
            </Section>
            <Section title="Delivery address" number="02">
              <Field label="Address Line 1" error={errors.address}>
                <Input autoComplete="street-address" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street, area, landmarks" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City" error={errors.city}>
                  <Input autoComplete="address-level2" value={form.city} onChange={(e) => set("city", e.target.value)} />
                </Field>
                <Field label="Province" error={errors.province}>
                  <Select value={form.province} onValueChange={(v) => set("province", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {provinces.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Postal Code" error={errors.postal}>
                  <Input value={form.postal} onChange={(e) => set("postal", e.target.value)} />
                </Field>
              </div>
            </Section>
            <Section title="Payment" number="03">
              <div className="flex items-start gap-3 border border-border bg-muted/30 p-4">
                <span className="mt-0.5 grid h-4 w-4 place-items-center rounded-full border border-foreground"><span className="h-2 w-2 rounded-full bg-foreground" /></span>
                <div className="min-w-0 flex-1"><p className="text-sm font-semibold">Cash on delivery</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Pay in cash when your LAYXES order arrives.</p></div><PackageCheck className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
              <label className="flex items-start gap-2 text-xs leading-5 text-muted-foreground"><input required type="checkbox" className="mt-1 accent-current" /><span>I agree to the <Link href="/terms" target="_blank" className="text-foreground underline underline-offset-4">Terms of service</Link> and confirm my delivery details are correct.</span></label>
            </Section>
          </div>

          <aside className="h-fit min-w-0 border border-border bg-card p-4 sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between"><h2 className="font-display text-lg font-bold">Your order</h2><span className="text-xs text-muted-foreground">{items.reduce((n, i) => n + i.quantity, 0)} items</span></div>
            <ul className="mt-5 max-h-64 space-y-4 overflow-y-auto overscroll-contain pr-1">
              {items.map((i) => (
                <li key={i.key} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="h-16 w-14 shrink-0 rounded-sm object-cover" />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="line-clamp-1 font-medium">{i.name}</p>
                    <p className="text-xs text-muted-foreground">{i.size} · {i.color} · Qty {i.quantity}</p>
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
              {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Placing order...</> : "Place Order"}
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[10px] text-muted-foreground"><LockKeyhole className="h-3 w-3"/> Your details are used to fulfill this order.</p>
            <Link href="/cart" className="mt-4 block text-center text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">Edit your bag</Link>
          </aside>
        </form>
      </div>
    </SiteShell>
  );
}

function Section({ title, number, children }: { title: string; number: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 border-b border-border pb-7">
      <h2 className="mb-4 flex items-center gap-3 font-display text-lg font-semibold"><span className="text-[10px] tracking-widest text-muted-foreground">{number}</span>{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-[var(--sale)]">{error}</p>}
    </div>
  );
}
function Row({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className={`flex items-center justify-between text-sm ${large ? "text-lg font-bold" : ""}`}>
      <span>{label}</span><span>{value}</span>
    </div>
  );
}
