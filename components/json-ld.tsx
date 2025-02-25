'use client';

import { formatDate } from "@/utils/formatters";

type JsonLdProps = {
  type: "LotteryResult" | "Website" | "Organization" | "BreadcrumbList" | "Article";
  data?: any;
};

export default function JsonLd({ type, data }: JsonLdProps) {
  let schema: any = {};

  switch (type) {
    case "Website":
      schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Irish Lotto Results",
        url: "https://www.irishlottoresults.co.uk",
        description: "Get the latest Irish Lotto results, check winning numbers, and view historical draws.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.irishlottoresults.co.uk/results/history?date={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      };
      break;

    case "Organization":
      schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Irish Lotto Results",
        url: "https://www.irishlottoresults.co.uk",
        logo: "https://www.irishlottoresults.co.uk/logo.png",
        sameAs: [
          "https://www.facebook.com/irishlottoresults",
          "https://twitter.com/irishlotto",
        ],
      };
      break;

    case "LotteryResult":
      if (!data) return null;
      schema = {
        "@context": "https://schema.org",
        "@type": "Game",
        name: `Irish Lotto Results - ${formatDate(data.drawDate)}`,
        description: `Irish Lotto results and winning numbers for ${formatDate(data.drawDate)}. Jackpot: ${data.mainDraw.jackpotAmount}`,
        url: `https://www.irishlottoresults.co.uk/results/${data._id}`,
        provider: {
          "@type": "Organization",
          name: "Irish National Lottery",
          url: "https://www.lottery.ie",
        },
        datePublished: data.drawDate,
        offers: {
          "@type": "Offer",
          price: data.mainDraw.jackpotAmount,
          priceCurrency: "EUR",
        },
      };
      break;

    case "Article":
      if (!data) return null;
      schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.date,
        dateModified: data.date,
        author: {
          "@type": "Organization",
          name: "Irish Lotto Results",
        },
      };
      break;

    case "BreadcrumbList":
      if (!data || !Array.isArray(data)) return null;
      schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.map((item: any, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
      break;
  }

  if (!schema || Object.keys(schema).length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
