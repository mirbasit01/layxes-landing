import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
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

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — ClothCo" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) navigate({ to: "/cart" });
  }, [items.length, navigate]);

  const [form, setForm] = useState<FormShape>({
    name: "", email: "", phone: "+92 ", address: "", city: "", province: "", postal: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormShape, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const onSubmit = (e: React.FormEvent) => {
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
    sessionStorage.setItem("clothco-last-name", form.name);
    setTimeout(() => {
      clear();
      navigate({ to: "/order-success" });
    }, 1500);
  };

  if (items.length === 0) return null;

  const set = (k: keyof FormShape, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  return (
    <SiteShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Checkout</h1>
        <form onSubmit={onSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Section title="Contact Information">
              <Field label="Full Name" error={errors.name}>
                <Input value={form.name} onChange={(e) => set("name", e.target.value)} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email" error={errors.email}>
                  <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </Field>
                <Field label="Phone" error={errors.phone}>
                  <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+92 300 1234567" />
                </Field>
              </div>
            </Section>
            <Section title="Shipping Address">
              <Field label="Address Line 1" error={errors.address}>
                <Input value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Street, area, landmarks" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City" error={errors.city}>
                  <Input value={form.city} onChange={(e) => set("city", e.target.value)} />
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
          </div>

          <aside className="h-fit rounded-lg border border-border p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold">Order Summary</h2>
            <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {items.map((i) => (
                <li key={i.key} className="flex items-center gap-3">
                  <img src={i.image} alt={i.name} className="h-14 w-12 rounded object-cover" />
                  <div className="flex-1 text-sm">
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
