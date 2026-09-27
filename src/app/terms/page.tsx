import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the LAYXES terms of service, including order processing, delivery, returns, and customer support.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">LAYXES · Customer care</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Terms of service</h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">These terms explain how orders, delivery, cancellations, and support work when you shop with LAYXES.</p>

        <div className="mt-10 space-y-9 border-t border-border pt-8 text-sm leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Orders and delivery</h2>
            <p>After you place an order, we validate it and send it to processing. Orders are usually dispatched within 24–48 hours. Delivery within Pakistan generally takes 2–3 business days; international delivery can take about one week. Delays may occur because of courier or other circumstances outside our control. We use courier services and share tracking details when available.</p>
            <p className="mt-3">Shipping is Rs. 250 on orders below Rs. 5,000. Delivery is free on orders of Rs. 5,000 or more.</p>
            <p className="mt-3">Prepaid orders may need up to 48 working hours for payment verification.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Packages lost in transit</h2>
            <p>If a package appears lost, contact us so we can investigate with the courier. This investigation usually takes 2–3 days. If the package cannot be located, we will contact you to arrange an appropriate replacement or resolution.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Damaged or missing items</h2>
            <p>Please contact customer support if an item arrives materially damaged or if a delivered package is open and empty. We will investigate and may ask you for photos of the parcel or product to assess the claim.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Order cancellations</h2>
            <p>You may request cancellation before your order enters processing. LAYXES may cancel an order if an item is out of stock, a price or shipping charge is incorrect, or a technical error prevents us from fulfilling it. If a prepaid order is cancelled, the amount paid will be refunded within 20 days.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Prices</h2>
            <p>Prices are shown in Pakistani rupees and include applicable sales tax. Any delivery charge is shown before you place your order.</p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">Contact LAYXES</h2>
            <ul className="space-y-1">
              <li>Email: <a className="text-foreground underline underline-offset-4" href="mailto:hello@layxes.pk">hello@layxes.pk</a></li>
              <li>Phone / WhatsApp: <a className="text-foreground underline underline-offset-4" href="tel:+923704104941">+92 370 4104941</a></li>
              <li>Instagram: <a className="text-foreground underline underline-offset-4" href="https://instagram.com/layxes.studio" target="_blank" rel="noreferrer">@layxes.studio</a></li>
            </ul>
          </section>
        </div>

        <Link href="/" className="mt-10 inline-flex text-sm font-semibold text-foreground underline underline-offset-4">Back to LAYXES</Link>
      </main>
    </SiteShell>
  );
}
