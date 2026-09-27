import { privatePageMetadata } from "@/lib/seo";

export const metadata = privatePageMetadata("Your account");

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return children;
}
