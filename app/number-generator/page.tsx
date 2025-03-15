import type { Metadata } from "next"
import { Breadcrumbs } from "@/components/breadcrumbs"
import JsonLd from "@/components/json-ld"
import { NumberGenerator } from "./number-generator"
import { constructMetadata } from "../seo.config"

export const metadata: Metadata = constructMetadata({
  title: "Irish Lotto Number Generator | Generate Lucky Numbers",
  description: "Generate random lucky numbers for Irish Lotto, Lotto Plus 1, and Lotto Plus 2. Create multiple lines, save your favorite combinations, and share with friends.",
  keywords: ["Irish Lotto number generator", "lucky lotto numbers", "random lottery numbers", "Irish Lotto Plus", "lottery number picker"],
  image: "/og-image.webp", // Using the existing OG image
})

export default function NumberGeneratorPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Number Generator", href: "/number-generator" },
        ]}
      />
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Irish Lotto Number Generator</h1>
        <p className="text-gray-600 mb-8">Generate random lucky numbers for Irish Lotto, Lotto Plus 1, and Lotto Plus 2. Create multiple lines, save your favorite combinations, and share with friends.</p>
        
        <NumberGenerator />
        
        <JsonLd
          type="Website"
          data={{
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Irish Lotto Number Generator",
            "description": "Generate random lucky numbers for Irish Lotto, Lotto Plus 1, and Lotto Plus 2.",
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            }
          }}
        />
      </div>
    </div>
  )
} 