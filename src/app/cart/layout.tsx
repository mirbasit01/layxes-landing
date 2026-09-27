import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("Shopping Cart");

export default function PrivatePageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
