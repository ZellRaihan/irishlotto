import { Metadata } from "next"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

export const siteConfig = {
  name: "Irish Lotto Results",
  description: "Get the latest Irish Lotto results, check numbers, and view historical draws. Official source for Irish lottery numbers and jackpot information.",
  url: "https://irishlottoresults.ie", // Replace with your actual domain
  ogImage: "https://irishlottoresults.ie/og.jpg", // Replace with your actual OG image
  links: {
    twitter: "https://twitter.com/irishlotto",
    github: "https://github.com/ZellRaihan"
  },
  keywords: [
    "Irish Lotto",
    "Lottery Results",
    "Irish Lottery",
    "Lotto Numbers",
    "Irish Lotto Results",
    "Lottery Checker",
    "Ireland Lottery"
  ]
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
      default: `${title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
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
      locale: "en_IE",
      ...(type === "article" ? { type: "article" } : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@irishlotto",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    alternates: {
      canonical: url,
    },
    metadataBase: new URL(url),
    authors: [{ name: "Zell Raihan" }],
    creator: "Zell Raihan",
    verification: {
      google: "your-google-site-verification",
      other: {
        yandex: "your-yandex-verification",
      },
    },
  }
}
