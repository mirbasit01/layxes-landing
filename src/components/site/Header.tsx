"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Moon, Sun, Search, ShoppingBag, Heart, Menu, X, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/lib/theme";
import { useCart } from "@/lib/cart-store";
import { useWishlist } from "@/lib/wishlist-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Women", href: "/products?category=Women" },
  { label: "Men", href: "/products?category=Men" },
  { label: "Kids", href: "/products?category=Kids" },
  { label: "Accessories", href: "/products?category=Accessories" },
  { label: "Sale", href: "/products?sale=1" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
      className={`sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur transition-all supports-[backdrop-filter]:bg-background/70 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center gap-4 px-4 transition-all sm:px-6 ${
          scrolled ? "h-14" : "h-16"
        }`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 font-display">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                  <Shirt className="h-4 w-4" />
                </span>
                ABWRH Threads
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className="rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wide transition-colors hover:bg-muted"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Shirt className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">ABWRH Threads</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-7 md:flex">
          {NAV.map((n) => {
            const active = n.href === pathname;
            return (
              <Link
                key={n.label}
                href={n.href}
                className={`group relative text-xs font-semibold uppercase tracking-wider transition-colors hover:text-foreground ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-primary transition-all group-hover:w-full ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
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
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
            </Button>
            {count > 0 && (
              <span className="pointer-events-none absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
