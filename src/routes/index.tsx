import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Star, Truck, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories, heroImage } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClothCo — Wear the Tradition | Pakistani Fashion" },
      { name: "description", content: "Premium Pakistani clothing for every occasion. Lawn suits, kurtas, kidswear and accessories. Free delivery over Rs. 2000." },
      { property: "og:title", content: "ClothCo — Wear the Tradition" },
      { property: "og:description", content: "Premium Pakistani clothing for every occasion." },
      { property: "og:image", content: heroImage },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const onSale = products.filter((p) => p.salePrice != null).slice(0, 4);
  const cats = categories.slice(0, 4);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative h-[calc(100vh-7rem)] min-h-[560px] w-full overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
          <div className="max-w-2xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.25em] backdrop-blur">
              <Sparkles className="h-3 w-3" /> Summer Edit 2026
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
              Wear the<br />Tradition.
            </h1>
            <p className="mt-6 max-w-lg text-base text-white/85 md:text-lg">
              Premium Pakistani clothing for every occasion. Lawn, formal, festive — crafted in Pakistan, delivered to your door.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 px-7 text-base">
                <Link to="/products">Shop Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 border-white/50 bg-white/10 px-7 text-base text-white hover:bg-white/20 hover:text-white">
                <Link to="/products">View Collections</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4">
          <ValueProp icon={<Truck className="h-5 w-5" />} title="Free Delivery" subtitle="Orders over Rs. 2,000" />
          <ValueProp icon={<RefreshCw className="h-5 w-5" />} title="Easy Returns" subtitle="7-day return policy" />
          <ValueProp icon={<ShieldCheck className="h-5 w-5" />} title="Genuine Fabric" subtitle="Quality guaranteed" />
          <ValueProp icon={<Sparkles className="h-5 w-5" />} title="New Drops" subtitle="Every week" />
        </div>
      </section>

      {/* Featured */}
      <Section title="Featured Collection" subtitle="Hand-picked styles for the season." link={{ to: "/products", label: "View all" }}>
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-8 md:overflow-visible md:p-0">
          {featured.map((p) => (
            <div key={p.id} className="w-[70%] shrink-0 snap-start md:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Section>

      {/* Categories */}
      <Section title="Shop by Category">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {cats.map((c) => (
            <Link
              key={c.name}
              to="/products"
              search={{ category: c.name }}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-x-4 bottom-4">
                <h3 className="text-2xl font-bold text-white">{c.name}</h3>
                <p className="mt-1 inline-flex items-center gap-1 text-xs text-white/85">
                  Shop {c.name} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* New Arrivals */}
      <Section title="New Arrivals" subtitle="Fresh on the rack this week." link={{ to: "/products", label: "View All" }}>
        <Grid>{newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}</Grid>
      </Section>

      {/* Sale */}
      <SaleSection products={onSale} />

      {/* Testimonials */}
      <Section title="Loved by customers" subtitle="What our buyers say.">
        <div className="grid gap-4 md:grid-cols-3">
          <Review name="Fatima K." city="Lahore" rating={5} text="The lawn suit fabric is gorgeous and the embroidery is even better in person. Delivery was super quick to Lahore!" />
          <Review name="Ahmed R." city="Karachi" rating={5} text="Bought two kurtas for Eid — perfect fit, premium feel. ClothCo is my go-to now." />
          <Review name="Sara M." city="Islamabad" rating={4} text="Beautiful festive pieces and the customer service was very responsive. Will order again." />
        </div>
      </Section>
    </SiteShell>
  );
}

function ValueProp({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">{icon}</div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

function Section({ title, subtitle, link, children }: { title: string; subtitle?: string; link?: { to: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {link && (
          <Link to={link.to as any} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            {link.label} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{children}</div>;
}

function SaleSection({ products }: { products: typeof import("@/lib/mock-data").products }) {
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
    <section className="bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-white/80">Limited time</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Flash Sale</h2>
            <p className="mt-1 text-sm text-white/85">Save up to 30% on selected pieces.</p>
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
    <div className="min-w-16 rounded-lg bg-white/15 px-3 py-2 backdrop-blur">
      <div className="text-2xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
      <div className="text-[10px] uppercase tracking-wider text-white/80">{label}</div>
    </div>
  );
}

function Review({ name, city, rating, text }: { name: string; city: string; rating: number; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">"{text}"</p>
      <div className="mt-4 text-sm">
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{city}</p>
      </div>
    </div>
  );
}
