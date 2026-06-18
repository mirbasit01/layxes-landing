import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories, heroImage } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ClothCo — Modern Pakistani Fashion" },
      { name: "description", content: "Lawn suits, kurtas, kidswear and accessories. Free shipping over Rs. 2000." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 8);
  const newArrivals = [...products].sort((a, b) => b.createdAt - a.createdAt).slice(0, 4);
  const onSale = products.filter((p) => p.salePrice != null).slice(0, 4);

  return (
    <SiteShell>
      {/* Hero */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6">
          <div className="max-w-xl text-white">
            <p className="text-sm uppercase tracking-[0.25em] text-white/80">Summer Collection 2026</p>
            <h1 className="mt-4 text-5xl font-bold leading-tight md:text-6xl">
              Modern fashion, crafted in Pakistan.
            </h1>
            <p className="mt-4 text-base text-white/80 md:text-lg">
              Discover lawn suits, kurtas, kidswear and accessories — designed for everyday and special occasions.
            </p>
            <div className="mt-8 flex gap-3">
              <Button asChild size="lg">
                <Link to="/products">Shop Now <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/40 hover:bg-white/20 hover:text-white">
                <Link to="/products" search={{ sale: "1" }}>Shop Sale</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      <Section title="Featured" subtitle="Hand-picked styles for the season.">
        <Grid>
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </Grid>
      </Section>

      {/* Categories */}
      <Section title="Shop by category">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.name} to="/products" search={{ category: c.name }} className="group relative aspect-[3/4] overflow-hidden rounded-xl">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-semibold text-white">{c.name}</h3>
                <p className="text-xs text-white/80 inline-flex items-center gap-1 mt-1">
                  Shop {c.name} <ArrowRight className="h-3 w-3" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* New Arrivals */}
      <Section title="New arrivals" subtitle="Fresh on the rack this week.">
        <Grid>
          {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
        </Grid>
      </Section>

      {/* Sale */}
      <Section title="On sale" subtitle="Limited-time prices.">
        <Grid>
          {onSale.map((p) => <ProductCard key={p.id} product={p} />)}
        </Grid>
        <div className="mt-8 text-center">
          <Button asChild variant="outline"><Link to="/products" search={{ sale: "1" }}>View all sale items</Link></Button>
        </div>
      </Section>
    </SiteShell>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">{children}</div>;
}
