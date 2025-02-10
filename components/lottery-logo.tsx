'use client';

import Image from "next/image"

const LOGO_URLS = {
  lotto: "https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto.svg",
  lottoPlus1: "https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto_plus1.svg",
  lottoPlus2: "https://cdn1.lottery.ie/media/Games/DBGs/logos/left/rgb/Lotto_plus2.svg",
}

export function LotteryLogo({
  variant = "lotto",
  className = "",
}: {
  variant?: "lotto" | "lottoPlus1" | "lottoPlus2"
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={LOGO_URLS[variant] || "/placeholder.svg"}
        alt={`Irish ${variant} logo`}
        width={200}
        height={50}
        className={`object-contain ${className}`}
        priority
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = "/placeholder.svg"
        }}
      />
    </div>
  )
}
