"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const onSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    if (!email) return;
    toast.success("Subscribed!", { description: `We'll send updates to ${email}` });
    e.currentTarget.reset();
  };

  return (
    <footer className="mt-24 border-t border-border bg-muted/40">
      <div className="border-b border-border bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">Join the club</h3>
            <p className="mt-1 text-sm text-background/60">Get 10% off your first order + early access to drops.</p>
          </div>
          <form onSubmit={onSubscribe} className="flex w-full max-w-md items-center gap-2">
            <Input name="email" type="email" required placeholder="your@email.com" className="h-11 rounded-full border-background/20 bg-background/10 text-background placeholder:text-background/50" />
            <Button type="submit" size="lg" className="h-11 shrink-0">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <Image src="/brand/layxes-logo.svg" alt="LAYXES" width={150} height={37} className="h-8 w-auto invert dark:invert-0" />
          <p className="mt-3 text-sm text-muted-foreground">
            Everyday winter essentials. Designed in Pakistan, made to be worn on repeat.
          </p>
          <div className="mt-4 flex gap-2">
            <SocialBtn href="https://instagram.com/layxes.studio" label="Instagram"><Instagram className="h-4 w-4" /></SocialBtn>
            <SocialBtn href="https://facebook.com" label="Facebook"><Facebook className="h-4 w-4" /></SocialBtn>
            <SocialBtn href="https://wa.me/923704104941" label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialBtn>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">About Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#">Our Story</a></li>
            <li><a className="hover:text-foreground" href="#">Sustainability</a></li>
            <li><a className="hover:text-foreground" href="#">Careers</a></li>
            <li><a className="hover:text-foreground" href="#">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/products?category=Hoodies" className="hover:text-foreground">Hoodies</Link></li>
            <li><Link href="/products?category=Bottoms" className="hover:text-foreground">Bottoms</Link></li>
            <li><Link href="/products?category=Sets" className="hover:text-foreground">Sets</Link></li>
            <li><Link href="/products" className="hover:text-foreground">Winter Drop 01</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider">Customer Service</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link className="hover:text-foreground" href="/terms">Terms of service</Link></li>
            <li><a className="hover:text-foreground" href="#">Shipping & Returns</a></li>
            <li><a className="hover:text-foreground" href="#">Size Guide</a></li>
            <li><a className="hover:text-foreground" href="#">FAQ</a></li>
            <li><a className="hover:text-foreground" href="mailto:hello@layxes.pk">Contact Us</a></li>
            <li className="pt-2">Faisalabad, Pakistan</li>
            <li><a href="tel:+923704104941">+92 370 4104941</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} LAYXES. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <PayBadge>VISA</PayBadge>
            
            <PayBadge>Mastercard</PayBadge>
            <PayBadge>JazzCash</PayBadge>
            <PayBadge>EasyPaisa</PayBadge>
            <PayBadge>COD</PayBadge>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
    </a>
  );
}
function PayBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border bg-background px-2 py-1 text-[10px] font-semibold tracking-wide">
      {children}
    </span>
  );
}
