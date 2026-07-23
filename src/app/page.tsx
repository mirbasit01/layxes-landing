import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, Truck, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { SaleSection } from "@/components/site/SaleSection";
import { Button } from "@/components/ui/button";
import { products, categories, heroImage } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: { absolute: "ClothCo — Wear the Tradition | Pakistani Fashion" },
  description:
    "Premium Pakistani clothing for every occasion. Lawn suits, kurtas, kidswear and accessories. Free delivery over Rs. 2000.",
  openGraph: {
    title: "ClothCo — Wear the Tradition",
    description: "Premium Pakistani clothing for every occasion.",
    images: [heroImage],
  },
};

export default function Home() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const onSale = products.filter((p) => p.salePrice != null).slice(0, 4);
  const cats = categories.slice(0, 4);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative h-[calc(100vh-7rem)] min-h-[600px] w-full overflow-hidden bg-foreground">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        {/* electric accent glow */}
        <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
          <div className="max-w-3xl text-white">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Summer Edit 2026
            </p>
            <h1 className="mt-6 font-display text-6xl font-bold leading-[0.92] tracking-tighter md:text-8xl lg:text-9xl">
              Wear the<br />
              <span className="text-primary">Tradition.</span>
            </h1>
            <p className="mt-7 max-w-lg text-base text-white/80 md:text-lg">
              Premium Pakistani clothing for every occasion. Lawn, formal, festive — crafted in Pakistan, delivered to your door.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/products">Shop Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:border-white hover:bg-white/10 hover:text-white">
                <Link href="/products">View Collections</Link>
              </Button>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              <HeroStat value="30+" label="Styles" />
              <HeroStat value="4.7★" label="Avg. Rating" />
              <HeroStat value="24h" label="Dispatch" />
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-y border-border bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          <ValueProp icon={<Truck className="h-5 w-5" />} title="Free Delivery" subtitle="Orders over Rs. 2,000" />
          <ValueProp icon={<RefreshCw className="h-5 w-5" />} title="Easy Returns" subtitle="7-day return policy" />
          <ValueProp icon={<ShieldCheck className="h-5 w-5" />} title="Genuine Fabric" subtitle="Quality guaranteed" />
          <ValueProp icon={<Sparkles className="h-5 w-5" />} title="New Drops" subtitle="Every week" />
        </div>
      </section>

      {/* Featured */}
      <Section title="Featured Collection" subtitle="Hand-picked styles for the season." link={{ href: "/products", label: "View all" }}>
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
              href={`/products?category=${encodeURIComponent(c.name)}`}
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
      <Section title="New Arrivals" subtitle="Fresh on the rack this week." link={{ href: "/products", label: "View All" }}>
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

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">{value}</div>
      <div className="text-[11px] font-semibold uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}

function ValueProp({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">{icon}</div>
      <div>
        <p className="text-sm font-bold">{title}</p>
        <p className="text-xs text-background/60">{subtitle}</p>
      </div>
    </div>
  );
}

function Section({ title, subtitle, link, children }: { title: string; subtitle?: string; link?: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 h-1 w-10 rounded-full bg-primary" />
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {link && (
          <Link href={link.href} className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-foreground/15 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors hover:border-foreground/40">
            {link.label} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
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

function Review({ name, city, rating, text }: { name: string; city: string; rating: number; text: string }) {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6 transition-colors hover:border-primary/40">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{text}"</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
          {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </div>
        <div className="text-sm">
          <p className="font-bold">{name}</p>
          <p className="text-xs text-muted-foreground">{city}</p>
        </div>
      </div>
    </div>
  );
}
