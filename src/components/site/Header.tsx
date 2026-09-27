"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun, Search, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import { openCartDrawer } from "@/lib/cart-events";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV: { label: string; href: string; accent?: boolean; menu?: { heading: string; links: { label: string; href: string }[] }[] }[] = [
  { label: "Home", href: "/" },
  { label: "Final Call", href: "/products?sale=1", accent: true },
  { label: "Proportions", href: "/products?category=Bottoms" },
  { label: "New Arrivals", href: "/products?sort=latest" },
  { label: "Men", href: "/products", menu: [
    { heading: "Clothing", links: [{ label: "Hoodies", href: "/products?category=Hoodies" }, { label: "Sweatshirts", href: "/products?category=Hoodies" }, { label: "Bottoms", href: "/products?category=Bottoms" }, { label: "Sets", href: "/products?category=Sets" }] },
    { heading: "Winter collection", links: [{ label: "Shop all winter", href: "/products" }, { label: "New arrivals", href: "/products?sort=latest" }, { label: "Proportions", href: "/products?category=Bottoms" }] },
  ] },
  { label: "Winter Collection", href: "/products", menu: [
    { heading: "Winter collection", links: [{ label: "Hoodies", href: "/products?category=Hoodies" }, { label: "Sweatshirts", href: "/products?category=Hoodies" }, { label: "Jackets", href: "/products" }, { label: "Sweaters", href: "/products" }, { label: "Co-ord sets", href: "/products?category=Sets" }, { label: "Tracksuits", href: "/products?category=Sets" }, { label: "Beanies", href: "/products" }] },
  ] },
  { label: "Women", href: "/products?category=Women", menu: [
    { heading: "Clothing", links: [{ label: "New arrivals", href: "/products?sort=latest" }, { label: "Tops", href: "/products?category=Women" }, { label: "Bottoms", href: "/products?category=Women" }, { label: "Winter layers", href: "/products?category=Women" }] },
  ] },
  { label: "Footwear", href: "/products?category=Footwear", menu: [
    { heading: "Footwear", links: [{ label: "All footwear", href: "/products?category=Footwear" }, { label: "Sneakers", href: "/products?category=Footwear" }, { label: "Slides", href: "/products?category=Footwear" }] },
  ] },
  { label: "Accessories", href: "/products?category=Accessories", menu: [
    { heading: "Accessories", links: [{ label: "All accessories", href: "/products?category=Accessories" }, { label: "Caps & beanies", href: "/products?category=Accessories" }, { label: "Bags", href: "/products?category=Accessories" }, { label: "Socks", href: "/products?category=Accessories" }] },
  ] },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const homeOverlay = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
  };

  return (
    <header
      className={`${homeOverlay ? "absolute inset-x-0 top-0" : "sticky top-0 backdrop-blur"} z-40 w-full border-b transition-all ${homeOverlay ? `border-transparent bg-transparent text-white hover:border-white/10 hover:bg-black focus-within:border-white/10 focus-within:bg-black ${scrolled ? "bg-black shadow-sm" : ""}` : "border-border/60 bg-background/85 supports-[backdrop-filter]:bg-background/70"} ${scrolled ? "shadow-sm" : ""}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center gap-4 px-4 transition-all sm:px-6 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <Image src="/brand/layxes-logo.svg" alt="LAYXES" width={135} height={34} className={`h-8 w-auto ${homeOverlay ? "invert-0" : "invert dark:invert-0"}`} />
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV.map((n) => n.menu ? <div key={n.label} className="border-b border-border/70">
                <button onClick={() => setMobileMenu(mobileMenu === n.label ? null : n.label)} className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide">
                  {n.label}<ChevronDown className={`h-4 w-4 transition-transform ${mobileMenu === n.label ? "rotate-180" : ""}`} />
                </button>
                {mobileMenu === n.label && <div className="grid grid-cols-2 gap-2 px-4 pb-4">{n.menu.flatMap((group) => group.links).map((item) => <Link key={`${n.label}-${item.label}`} href={item.href} className="py-1 text-xs text-muted-foreground hover:text-foreground">{item.label}</Link>)}</div>}
              </div> : <Link key={n.label} href={n.href} className={`rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-muted ${n.accent ? "text-foreground underline underline-offset-4" : ""}`}>{n.label}</Link>)}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/brand/layxes-logo.svg" alt="LAYXES — Home" width={150} height={37} priority className={`h-8 w-auto ${homeOverlay ? "invert-0" : "invert dark:invert-0"}`} />
        </Link>

        <nav className="ml-6 hidden items-center gap-4 xl:flex">
            {NAV.filter((n) => n.label !== "Home").map((n) => {
              const active = n.href === pathname;
              const hasMenu = "menu" in n && n.menu;
              return (
              <div key={n.label} className="group/nav relative flex h-16 items-center">
                  <Link href={n.href} className={`relative whitespace-nowrap text-[10px] font-semibold uppercase tracking-[.12em] transition-colors hover:text-foreground ${homeOverlay && !scrolled ? "text-white/85 hover:text-white" : active ? "text-foreground" : "text-muted-foreground"} ${n.accent ? (homeOverlay && !scrolled ? "text-white" : "text-foreground") : ""}`}>
                  {n.label}{hasMenu && <span className="ml-1 text-[9px]">⌄</span>}
                  <span className={`absolute -bottom-1.5 left-0 h-px bg-foreground transition-all group-hover/nav:w-full ${active ? "w-full" : "w-0"}`} />
                </Link>
                {hasMenu && <div className="invisible absolute left-1/2 top-full z-50 grid w-[min(90vw,680px)] -translate-x-1/2 grid-cols-2 gap-10 border-t border-border bg-background p-8 opacity-0 shadow-xl transition-all group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:visible group-focus-within/nav:opacity-100">
                  {n.menu?.map((group) => <div key={group.heading}><p className="mb-4 text-[9px] font-bold uppercase tracking-[.18em] text-muted-foreground">{group.heading}</p><div className="flex flex-col gap-3">{group.links.map((item) => <Link key={item.label} href={item.href} className="text-xs font-medium uppercase tracking-wider hover:text-foreground hover:underline">{item.label}</Link>)}</div></div>)}
                </div>}
              </div>
              );
            })}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          {searchOpen ? (
            <form onSubmit={submitSearch} className="flex items-center gap-1 animate-fade-in">
              <Input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products..."
                className="h-9 w-44 sm:w-64"
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X className="h-5 w-5" />
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/wishlist" className="relative">
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            {wishCount > 0 && (
              <span className="pointer-events-none absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {wishCount}
              </span>
            )}
          </Link>
          <Button type="button" variant="ghost" size="icon" onClick={openCartDrawer} className="relative" aria-label="Open cart">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="pointer-events-none absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
