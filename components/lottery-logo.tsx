'use client';

import Image from "next/image"

const LOGO_URLS = {
  lotto: "https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto.svg",
  lottoPlus1: "https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto_plus1.svg",
  lottoPlus2: "https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto_plus2.svg",
} as const

export function LotteryLogo({
  variant = "lotto",
  className = "",
}: {
  variant?: keyof typeof LOGO_URLS
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={LOGO_URLS[variant]}
        alt={`Irish ${variant} logo`}
        width={200}
        height={50}
        className={`object-contain ${className}`}
        priority
        loading="eager"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = "/placeholder.svg"
        }}
      />
    </div>
  )
}
