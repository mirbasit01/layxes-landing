"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowLeft, ArrowRight, LoaderCircle, MailCheck } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

function LoginFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const sendCode = async (event?: React.FormEvent) => {
    event?.preventDefault();
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/auth/otp", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Couldn't send your code.");
      setStep("code");
      setNotice(`A verification code was sent to ${email.trim()}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't send your code.");
    } finally { setBusy(false); }
  };

  const verifyCode = async (event: React.FormEvent) => {
    event.preventDefault();
    if (code.length !== 6) { setError("Enter all six digits from your email."); return; }
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/auth/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, token: code }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "That code is invalid or expired.");
      const next = searchParams.get("next");
      router.replace(next?.startsWith("/") && !next.startsWith("//") ? next : "/account");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't verify that code.");
    } finally { setBusy(false); }
  };

  return (
    <SiteShell>
      <main className="mx-auto flex min-h-[62svh] max-w-7xl items-center justify-center px-4 py-14 sm:px-6 sm:py-20">
        <section className="w-full max-w-md">
          <Link href="/" aria-label="LAYXES home" className="mb-10 inline-flex"><Image src="/brand/layxes-logo.svg" alt="LAYXES" width={150} height={37} className="h-8 w-auto invert dark:invert-0" /></Link>
          {step === "email" ? <>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">Your LAYXES account</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Sign in</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Enter your email and we'll send you a verification code</p>
            <form onSubmit={sendCode} className="mt-8 space-y-4">
              <label htmlFor="login-email" className="text-xs font-medium">Email address</label>
              <Input id="login-email" autoComplete="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-12" />
              {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
              <Button className="h-12 w-full gap-2" disabled={busy}>{busy ? <LoaderCircle className="h-4 w-4 animate-spin"/> : <>Continue with email <ArrowRight className="h-4 w-4"/></>}</Button>
            </form>
            <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">By continuing, you agree to our <Link href="/terms" className="text-foreground underline underline-offset-4">Terms of service</Link>.</p>
          </> : <>
            <div className="mb-5 grid h-11 w-11 place-items-center rounded-full bg-muted"><MailCheck className="h-5 w-5"/></div>
            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground">LAYXES account</p>
            <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">Enter code</h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{notice || `Enter the six-digit code sent to ${email}.`}</p>
            <form onSubmit={verifyCode} className="mt-8 space-y-5">
              <InputOTP maxLength={6} value={code} onChange={setCode} containerClassName="justify-between gap-2">
                <InputOTPGroup className="w-full justify-between gap-1.5">
                  {Array.from({ length: 6 }, (_, index) => <InputOTPSlot key={index} index={index} className="h-12 min-w-0 flex-1 rounded-md border border-input text-lg sm:h-14" />)}
                </InputOTPGroup>
              </InputOTP>
              {error && <p role="alert" className="text-xs text-destructive">{error}</p>}
              <Button className="h-12 w-full" disabled={busy}>{busy ? <LoaderCircle className="h-4 w-4 animate-spin"/> : "Verify and sign in"}</Button>
            </form>
            <div className="mt-5 flex items-center justify-between text-xs"><button type="button" onClick={() => { setStep("email"); setCode(""); setError(""); }} className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3.5 w-3.5"/> Change email</button><button type="button" onClick={() => void sendCode()} className="text-muted-foreground underline underline-offset-4 hover:text-foreground">Send a new code</button></div>
          </>}
        </section>
      </main>
    </SiteShell>
  );
}

export default function LoginPage() {
  return <Suspense fallback={<div className="min-h-[60svh]"/>}><LoginFlow/></Suspense>;
}
