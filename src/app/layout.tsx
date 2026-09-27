import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk"),
  title: {
    default: "LAYXES | Premium Winter Streetwear in Pakistan",
    template: "%s — LAYXES",
  },
  applicationName: "LAYXES",
  creator: "LAYXES",
  publisher: "LAYXES",
  category: "fashion",
  description: "Shop premium hoodies, sweatpants and winter streetwear by LAYXES. Heavyweight everyday essentials, designed in Pakistan and delivered nationwide.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: {
    title: "LAYXES | Premium Winter Streetwear in Pakistan",
    description: "Shop premium hoodies, sweatpants and winter streetwear by LAYXES.",
    type: "website",
    url: "/",
    siteName: "LAYXES",
    locale: "en_PK",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "LAYXES Winter Drop 01" }],
  },
  twitter: { card: "summary_large_image", title: "LAYXES | Winter Streetwear", description: "Premium winter essentials, designed in Pakistan.", images: ["/opengraph-image"] },
};

// Apply the persisted theme before hydration to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('layxes-theme');var d=t?t==='dark':false;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-PK"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([
          { "@context": "https://schema.org", "@type": "Organization", name: "LAYXES", url: process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk", logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk"}/icon.svg`, description: "Premium winter streetwear designed in Pakistan." },
          { "@context": "https://schema.org", "@type": "WebSite", name: "LAYXES", url: process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk", inLanguage: "en-PK", potentialAction: { "@type": "SearchAction", target: `${process.env.NEXT_PUBLIC_SITE_URL || "https://layxes.pk"}/search?q={search_term_string}`, "query-input": "required name=search_term_string" } },
        ]).replace(/</g, "\\u003c") }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
