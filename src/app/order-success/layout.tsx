import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("Order Confirmation");

export default function PrivatePageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
