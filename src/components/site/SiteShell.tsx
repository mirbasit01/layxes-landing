import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AnnouncementBar } from "./AnnouncementBar";
import { CartDrawer } from "./CartDrawer";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <AnnouncementBar />
      <div className="relative flex-1">
        <Header />
        <CartDrawer />
        <main className="animate-fade-in">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
