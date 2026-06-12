import type { Metadata } from "next";
import { ClientNavbar } from "@/components/client-navbar";
import { ScrollToTopButton } from "@/components/scroll-to-top";
import { RevealObserver } from "@/components/reveal-observer";
import { JsonLdSchema } from "@/components/json-ld-schema";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { CookieBanner } from "@/components/cookie-banner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const metadataBase = new URL("https://mymevert.id");

export const metadata: Metadata = {
  metadataBase,
  title: "MYMevert - Free YouTube to MP4 & MP3 Converter",
  description:
    "Convert YouTube videos to MP4, download MP3 audio, and convert local videos to MP3 quickly and free.",
  keywords: [
    "youtube downloader",
    "youtube to mp4",
    "youtube to mp3",
    "mp3 converter",
    "mp4 download",
    "video converter",
    "audio extractor",
    "free converter",
  ],
  authors: [
    {
      name: "MYMevert Team",
      url: "https://mymevert.id",
    },
  ],
  creator: "MYMevert Team",
  publisher: "MYMevert",
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
  alternates: {
    canonical: "https://mymevert.id",
  },
  openGraph: {
    title: "MYMevert - Free YouTube to MP4 & MP3 Converter",
    description:
      "Convert YouTube videos to MP4, download MP3 audio, and convert local videos to MP3 quickly and free.",
    siteName: "MYMevert",
    locale: "id_ID",
    type: "website",
    url: "https://mymevert.id",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MYMevert - Free YouTube to MP4 & MP3 Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MYMevert - Free YouTube to MP4 & MP3 Converter",
    description:
      "Convert YouTube videos to MP4, download MP3 audio, and convert local videos to MP3 quickly and free.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={cn("h-full antialiased", "font-sans", geist.variable)} suppressHydrationWarning>
      <head>
        <JsonLdSchema />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <TooltipProvider>
            <ClientNavbar />
            <RevealObserver />
            {children}
            <Footer/>
            <ScrollToTopButton />
            <Toaster richColors />
            <CookieBanner />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}