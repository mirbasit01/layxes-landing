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
  title: {
    default: "ClothCo — Modern Pakistani Fashion",
    template: "%s — ClothCo",
  },
  description: "Shop curated lawn suits, kurtas, kidswear and accessories at ClothCo.",
  openGraph: {
    title: "ClothCo — Modern Pakistani Fashion",
    description: "Shop curated lawn suits, kurtas, kidswear and accessories at ClothCo.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

// Apply the persisted theme before hydration to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('clothco-theme');var d=t?t==='dark':(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
