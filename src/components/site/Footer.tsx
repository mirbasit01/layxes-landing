import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Instagram, Facebook, MessageCircle, Shirt } from "lucide-react";
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
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Join our newsletter</h3>
            <p className="text-sm text-muted-foreground">Get 10% off your first order.</p>
          </div>
          <form onSubmit={onSubscribe} className="flex w-full max-w-md items-center gap-2">
            <Input name="email" type="email" required placeholder="your@email.com" className="h-10" />
            <Button type="submit" className="h-10">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground">
              <Shirt className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight">ClothCo</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Modern Pakistani fashion. Crafted with care, delivered nationwide.
          </p>
          <div className="mt-4 flex gap-2">
            <SocialBtn href="https://instagram.com" label="Instagram"><Instagram className="h-4 w-4" /></SocialBtn>
            <SocialBtn href="https://facebook.com" label="Facebook"><Facebook className="h-4 w-4" /></SocialBtn>
            <SocialBtn href="https://wa.me/923001234567" label="WhatsApp"><MessageCircle className="h-4 w-4" /></SocialBtn>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">About Us</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#">Our Story</a></li>
            <li><a className="hover:text-foreground" href="#">Sustainability</a></li>
            <li><a className="hover:text-foreground" href="#">Careers</a></li>
            <li><a className="hover:text-foreground" href="#">Press</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" search={{ category: "Women" }} className="hover:text-foreground">Women</Link></li>
            <li><Link to="/products" search={{ category: "Men" }} className="hover:text-foreground">Men</Link></li>
            <li><Link to="/products" search={{ category: "Kids" }} className="hover:text-foreground">Kids</Link></li>
            <li><Link to="/products" search={{ sale: "1" }} className="hover:text-foreground">Sale</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Customer Service</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#">Shipping & Returns</a></li>
            <li><a className="hover:text-foreground" href="#">Size Guide</a></li>
            <li><a className="hover:text-foreground" href="#">FAQ</a></li>
            <li><a className="hover:text-foreground" href="#">Contact Us</a></li>
            <li className="pt-2">Karachi, Pakistan</li>
            <li>+92 300 1234567</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} ClothCo. All rights reserved.</span>
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
