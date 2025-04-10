import { Metadata } from "next"
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types"

export const siteConfig = {
  name: "Irish Lotto Results",
  description: "Get the latest Irish Lotto results, check numbers, and view historical draws. Official source for Irish lottery numbers and jackpot information.",
  url: process.env.NODE_ENV === 'production' 
    ? "https://www.irishlottoresults.co.uk"
    : "http://localhost:3000",
  ogImage: "https://www.irishlottoresults.co.uk/og-image.webp",
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
    // Replace these with your actual verification codes from search engine webmaster tools
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
    bing: "YOUR_BING_VERIFICATION_CODE",
    yandex: "YOUR_YANDEX_VERIFICATION_CODE"
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
  const metadataBase = new URL(siteConfig.url)
  
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
          type: "image/webp",
        },
      ],
      locale: "en_IE",
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.socialHandles.twitter,
      site: siteConfig.socialHandles.twitter,
    },
    alternates: {
      canonical: url,
      languages: {
        'en-IE': url,
        'en-GB': url,
        'en-US': url,
      },
    },
    metadataBase,
  }
}
