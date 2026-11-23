import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ShoppingBag } from "@/components/bag/ShoppingBag";
import { BagProvider } from "@/context/BagContext";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Piwva – Caring for Every Little Beginning",
  description: "Complete Baby Care & Parenting Community Platform. Shop quality baby products, join the parenting community, and access age-based baby care guides.",
  keywords: "baby care, parenting, baby products, parenting community, baby health",
  openGraph: {
    title: "Piwva – Caring for Every Little Beginning",
    description: "Complete Baby Care & Parenting Community Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <BagProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <ShoppingBag />
          <Toaster />
        </BagProvider>
      </body>
    </html>
  );
}
