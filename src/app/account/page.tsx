"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, LogOut, MapPin, UserRound } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";

type User = { email: string; metadata?: { customer_profile?: { name?: string; phone?: string; address?: string; city?: string; province?: string; postal?: string } } };

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" }).then((r) => r.json()).then((data) => {
      if (!data.user) router.replace("/account/login");
      else setUser(data.user);
    }).catch(() => router.replace("/account/login")).finally(() => setLoading(false));
  }, [router]);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  };
  const profile = user?.metadata?.customer_profile;

  return <SiteShell><main className="mx-auto min-h-[62svh] max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
    <p className="text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">LAYXES · Your account</p>
    <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Your details</h1>
    {loading ? <p className="mt-8 text-sm text-muted-foreground">Loading your account…</p> : user && <>
      <section className="mt-8 border-y border-border py-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold"><UserRound className="h-4 w-4"/> Sign-in details</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-xs text-muted-foreground">Email</dt><dd className="mt-1 break-all">{user.email}</dd></div><div><dt className="text-xs text-muted-foreground">Name</dt><dd className="mt-1">{profile?.name || "Add your details at checkout"}</dd></div><div><dt className="text-xs text-muted-foreground">Phone</dt><dd className="mt-1">{profile?.phone || "Not added yet"}</dd></div></dl>
      </section>
      <section className="mt-6 border-b border-border pb-6">
        <h2 className="flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4"/> Saved delivery address</h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{profile?.address ? [profile.address, profile.city, profile.province, profile.postal].filter(Boolean).join(", ") : "Your delivery details will be saved here after your next checkout."}</p>
      </section>
      <div className="mt-7 flex flex-wrap gap-3"><Button asChild><Link href="/products">Continue shopping <ArrowRight className="ml-2 h-4 w-4"/></Link></Button><Button variant="outline" onClick={signOut}><LogOut className="mr-2 h-4 w-4"/>Sign out</Button></div>
    </>}
  </main></SiteShell>;
}
