import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Italiana } from "next/font/google";
import { site } from "@/lib/site";
import SmoothScroll from "./components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.studio.seo.domain),
  title: {
    default: site.studio.seo.title,
    template: `%s · ${site.studio.name}`,
  },
  description: site.studio.seo.description,
  keywords: site.studio.seo.keywords,
  authors: [{ name: site.studio.name, url: site.studio.seo.domain }],
  creator: site.studio.name,
  publisher: site.studio.name,
  applicationName: site.studio.name,
  formatDetection: { telephone: true, email: true, address: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.studio.seo.domain,
    siteName: site.studio.name,
    title: site.studio.seo.title,
    description: site.studio.seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.studio.seo.title,
    description: site.studio.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "InteriorDesignBusiness",
  name: site.studio.name,
  legalName: site.studio.legalName,
  image: `${site.studio.seo.domain}/og.jpg`,
  url: site.studio.seo.domain,
  telephone: site.studio.contact.phoneE164,
  email: site.studio.contact.email,
  priceRange: "₹₹₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.studio.address.street,
    addressLocality: site.studio.address.city,
    addressRegion: site.studio.address.state,
    postalCode: site.studio.address.pin,
    addressCountry: "IN",
  },
  areaServed: site.studio.serviceCities.map((c) => ({ "@type": "City", name: c })),
  founder: { "@type": "Person", name: "Anaya Mehrotra" },
  foundingDate: `${site.studio.foundedYear}`,
  sameAs: [
    site.studio.socials.instagram,
    site.studio.socials.pinterest,
    site.studio.socials.linkedin,
    site.studio.socials.youtube,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${inter.variable} ${italiana.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body className="min-h-dvh">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
