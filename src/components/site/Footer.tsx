import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
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
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground font-bold">C</div>
            <span className="text-lg font-semibold tracking-tight">ClothCo</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Modern Pakistani fashion. Crafted with care, delivered nationwide.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/products" search={{ category: "Women" }} className="hover:text-foreground">Women</Link></li>
            <li><Link to="/products" search={{ category: "Men" }} className="hover:text-foreground">Men</Link></li>
            <li><Link to="/products" search={{ category: "Kids" }} className="hover:text-foreground">Kids</Link></li>
            <li><Link to="/products" search={{ category: "Accessories" }} className="hover:text-foreground">Accessories</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Help</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a className="hover:text-foreground" href="#">Shipping</a></li>
            <li><a className="hover:text-foreground" href="#">Returns</a></li>
            <li><a className="hover:text-foreground" href="#">Size Guide</a></li>
            <li><a className="hover:text-foreground" href="#">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Karachi, Pakistan</li>
            <li>+92 300 1234567</li>
            <li>hello@clothco.pk</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 text-xs text-muted-foreground sm:px-6">
          <span>© {new Date().getFullYear()} ClothCo. All rights reserved.</span>
          <div className="flex gap-4"><a href="#">Privacy</a><a href="#">Terms</a></div>
        </div>
      </div>
    </footer>
  );
}
