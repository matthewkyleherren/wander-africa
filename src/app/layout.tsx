import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wander | Luxury Vacation Rentals",
    template: "%s | Wander",
  },
  description:
    "Discover extraordinary vacation homes with hotel-grade amenities, inspiring views, and 24/7 concierge service. Find your happy place with Wander.",
  keywords: [
    "vacation rentals",
    "luxury homes",
    "vacation homes",
    "beach house",
    "mountain cabin",
    "ski chalet",
  ],
  authors: [{ name: "Wander" }],
  creator: "Wander",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wander.com",
    title: "Wander | Luxury Vacation Rentals",
    description:
      "Discover extraordinary vacation homes with hotel-grade amenities, inspiring views, and 24/7 concierge service.",
    siteName: "Wander",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wander | Luxury Vacation Rentals",
    description:
      "Discover extraordinary vacation homes with hotel-grade amenities, inspiring views, and 24/7 concierge service.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
