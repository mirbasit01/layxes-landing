import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/order-success")({
  head: () => ({ meta: [{ title: "Order Placed — ClothCo" }] }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  return (
    <SiteShell>
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
        <div className="relative grid h-20 w-20 place-items-center rounded-full bg-primary/10">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <Check className="relative h-10 w-10 text-primary" strokeWidth={3} />
        </div>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">Order Placed!</h1>
        <p className="mt-2 text-sm text-muted-foreground">Thank you for shopping with ClothCo. Your order is on its way.</p>

        <div className="mt-8 w-full rounded-lg border border-border p-6 text-left">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-semibold">#ORD-2847</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated delivery</span>
            <span className="font-medium">3–5 business days</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Payment</span>
            <span className="font-medium">Cash on Delivery</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            A confirmation email with full order details has been sent to your inbox.
          </p>
        </div>

        <Button asChild size="lg" className="mt-8"><Link to="/products">Continue Shopping</Link></Button>
      </div>
    </SiteShell>
  );
}
