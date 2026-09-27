import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Instagram, MoveUpRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { HomeHero } from "@/components/site/HomeHero";
import { ProductCard } from "@/components/site/ProductCard";
import { products } from "@/lib/mock-data";
import { FitBuilder } from "@/components/site/FitBuilder";

export const metadata: Metadata = {
  title: { absolute: "LAYXES — Winter, Reimagined." },
  description: "Premium winter essentials, made for the everyday. Discover the LAYXES Winter Drop 01.",
  alternates: { canonical: "/" },
  openGraph: { url: "/", title: "LAYXES — Winter, Reimagined.", description: "Premium winter essentials, made for the everyday. Discover the LAYXES Winter Drop 01.", images: ["/opengraph-image"] },
};

export default function Home() {
  const featured = products.slice(0, 4);
  const heroSlides = [
    { id: "winter-drop", imageUrl: products[0].images[0], eyebrow: "Pakistan · Winter Drop 01 / 26", title: "Winter Reimagined.", description: "Everyday layers. Exceptional weight. Made for the cold days and long nights ahead.", buttonLabel: "Shop the drop", href: "/products" },
    { id: "everyday-layers", imageUrl: products[1].images[0], eyebrow: "LAYXES · Everyday essentials", title: "Made to last.", description: "Meet the layers you will reach for, season after season.", buttonLabel: "Shop hoodies", href: "/products?category=Hoodies" },
    { id: "relaxed-fit", imageUrl: products[3].images[0], eyebrow: "LAYXES · Relaxed fits", title: "Find your fit.", description: "Relaxed silhouettes and considered details for everyday wear.", buttonLabel: "Explore bottoms", href: "/products?category=Bottoms" },
  ];
  return <SiteShell>
    <HomeHero mode="slider" slides={heroSlides} />

    <section className="mx-auto grid max-w-[1440px] grid-cols-2 border-b border-border px-6 py-6 text-[9px] font-semibold uppercase tracking-[.16em] text-muted-foreground sm:grid-cols-4 sm:px-10 lg:px-16">
      {["Heavyweight, always", "Designed in Pakistan", "Free delivery over Rs. 5,000", "Easy 7-day exchanges"].map((item) => <div key={item} className="flex items-center gap-2 py-2"><Check className="h-3 w-3" />{item}</div>)}
    </section>

    <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
      <div className="mb-10 flex items-end justify-between gap-5">
        <div><p className="eyebrow text-muted-foreground">01 / The collection</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.06em] text-foreground sm:text-6xl">Cold weather. <span className="text-muted-foreground">Handled.</span></h2></div>
        <Link href="/products" className="mb-1 hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] sm:flex">View all <MoveUpRight className="h-4 w-4" /></Link>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      <Link href="/products" className="mt-9 flex h-12 items-center justify-center gap-2 border border-border text-[10px] font-bold uppercase tracking-[.15em] text-foreground sm:hidden">Explore the drop <ArrowRight className="h-3.5 w-3.5" /></Link>
    </section>

    <section className="grid bg-neutral-950 text-white lg:grid-cols-2">
      <div className="relative min-h-[460px] overflow-hidden lg:min-h-[680px]"><Image src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1200&q=85" alt="Close-up of heavyweight brushed fleece fabric" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover opacity-75" /><span className="absolute bottom-6 left-6 text-[9px] uppercase tracking-[.18em] text-white/70">320 GSM · Brushed fleece</span></div>
      <div className="flex items-center px-7 py-16 sm:px-12 lg:px-16"><div className="max-w-xl"><p className="eyebrow text-[#aaa397]">02 / The LAYXES standard</p><h2 className="mt-5 font-display text-5xl font-semibold leading-[.98] tracking-[-.07em] sm:text-7xl">Good layers.<br />Long winters.</h2><p className="mt-7 max-w-md text-sm leading-7 text-white/60">Thoughtful weight, relaxed cuts, and the kind of softness you reach for every morning. Winter staples, without the noise.</p><Link href="/products" className="mt-8 inline-flex items-center gap-4 border-b border-[#aaa397] pb-3 text-[10px] font-bold uppercase tracking-[.17em]">Meet the essentials <ArrowRight className="h-3.5 w-3.5" /></Link></div></div>
    </section>

    <section className="bg-muted px-6 py-20 text-foreground sm:px-10 lg:px-16 lg:py-28"><div className="mx-auto max-w-[1280px]"><div className="mb-9 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"><div><p className="eyebrow text-muted-foreground">03 / Your uniform, your way</p><h2 className="mt-3 font-display text-4xl font-semibold tracking-[-.06em] text-foreground sm:text-6xl">Build your fit.</h2></div><p className="max-w-xs text-xs leading-5 text-muted-foreground">Pair a hoodie with your go-to bottoms. Better together, at a better price.</p></div><FitBuilder /></div></section>

    <section className="mx-auto grid max-w-[1440px] gap-8 px-6 py-20 text-foreground sm:px-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:px-16 lg:py-28"><div><p className="eyebrow text-muted-foreground">04 / From the studio</p><h2 className="mt-4 font-display text-5xl font-semibold leading-[.95] tracking-[-.07em] text-foreground sm:text-7xl">Less, but<br />better.</h2><p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">A considered wardrobe starts with pieces you wear on repeat. We make fewer things, choose better fabric, and give every detail a reason to be there.</p><a href="https://instagram.com/layxes.studio" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-foreground"><Instagram className="h-4 w-4" /> Follow @layxes.studio</a></div><div className="grid grid-cols-2 gap-3"><Image src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=900&q=85" alt="Streetwear winter styling" width={900} height={1125} sizes="(max-width: 768px) 50vw, 35vw" className="aspect-[4/5] w-full object-cover"/><Image src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85" alt="Neutral winter wardrobe essentials" width={900} height={1125} sizes="(max-width: 768px) 50vw, 35vw" className="mt-10 aspect-[4/5] w-full object-cover"/></div></section>
  </SiteShell>;
}
