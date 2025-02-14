import { revalidateTag } from "next/cache"
import { NextResponse } from "next/server"
import { validateCacheToken } from "@/lib/cache"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  const tags = searchParams.get("tags")?.split(",") || []

  // Validate token
  if (!validateCacheToken(token)) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    )
  }

  try {
    // If specific tags are provided, only revalidate those
    if (tags.length > 0) {
      tags.forEach(tag => {
        revalidateTag(tag)
      })
    } else {
      // Otherwise revalidate all result-related tags
      revalidateTag('results')
    }

    return NextResponse.json({
      revalidated: true,
      message: tags.length > 0 
        ? `Cache cleared for tags: ${tags.join(", ")}` 
        : "All results cache cleared"
    })
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating cache", error: err },
      { status: 500 }
    )
  }
}
