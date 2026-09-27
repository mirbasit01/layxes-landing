import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("Wishlist");

export default function PrivatePageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
