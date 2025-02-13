import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  const paths = searchParams.get("paths")?.split(",") || []

  // Validate token
  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    )
  }

  try {
    // If specific paths are provided, only revalidate those
    if (paths.length > 0) {
      paths.forEach(path => {
        revalidatePath(path)
      })
    } else {
      // Otherwise revalidate main paths
      revalidatePath("/")
      revalidatePath("/results")
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: paths.length > 0 ? paths : ["/", "/results"]
    })
  } catch (err) {
    return NextResponse.json(
      { message: "Error revalidating", error: err },
      { status: 500 }
    )
  }
}
