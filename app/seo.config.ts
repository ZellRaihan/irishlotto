import { Metadata } from "next"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

export const siteConfig = {
  name: "Irish Lotto Results",
  description: "Get the latest Irish Lotto results, check numbers, and view historical draws. Official source for Irish lottery numbers and jackpot information.",
  url: "https://irishlottoresults.co.uk",
  ogImage: "https://irishlottoresults.co.uk/og-image.jpg",
  social: {
    twitter: "https://twitter.com/irishlottoresults",
    facebook: "https://facebook.com/irishlottoresults",
    instagram: "https://instagram.com/irishlottoresults",
    youtube: "https://youtube.com/@irishlottoresults",
    linkedin: "https://linkedin.com/company/irishlottoresults",
    pinterest: "https://pinterest.com/irishlottoresults"
  },
  socialHandles: {
    twitter: "@irishlottoresults",
    facebook: "irishlottoresults",
    instagram: "@irishlottoresults",
    youtube: "@irishlottoresults",
    linkedin: "irishlottoresults",
    pinterest: "irishlottoresults"
  },
  keywords: [
    "Irish Lotto",
    "Lottery Results",
    "Irish Lottery",
    "Lotto Numbers",
    "Irish Lotto Results",
    "Lottery Checker",
    "Ireland Lottery",
    "Irish Lottery Results Today",
    "Irish Lotto Numbers",
    "Irish Lottery Numbers",
    "Irish Lotto Checker"
  ],
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_ID",
    bing: "YOUR_BING_VERIFICATION_ID",
    yandex: "YOUR_YANDEX_VERIFICATION_ID"
  }
}

export type SeoProps = {
  title: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: "article" | "website"
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  url = siteConfig.url,
  type = "website",
}: SeoProps): Metadata {
  return {
    title: {
      default: title,
      template: "%s",
    },
    description,
    keywords: siteConfig.keywords,
    authors: [{ name: "Zell Raihan" }],
    creator: "Zell Raihan",
    publisher: siteConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: siteConfig.verification.google,
      other: {
        'msvalidate.01': siteConfig.verification.bing,
        'yandex-verification': siteConfig.verification.yandex,
      },
    },
    openGraph: {
      title: title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_GB",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description,
      images: [image],
      creator: siteConfig.socialHandles.twitter,
      site: siteConfig.socialHandles.twitter,
    },
    alternates: {
      canonical: url,
    },
    metadataBase: new URL(siteConfig.url),
    generator: "Next.js",
    applicationName: siteConfig.name,
    referrer: "origin-when-cross-origin",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/android-chrome-192x192.png",
        }
      ],
    },
    manifest: "/site.webmanifest",
    category: "Games & Entertainment",
    appleWebApp: {
      capable: true,
      title: siteConfig.name,
      statusBarStyle: "default",
    },
  }
}
