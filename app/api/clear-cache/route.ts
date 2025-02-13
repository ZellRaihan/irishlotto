import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    // Get the secret token from the request
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    // Check if the token matches (replace 'your-secret-token' with a secure token)
    if (token !== process.env.REVALIDATE_TOKEN) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Revalidate the main pages
    revalidatePath('/')
    revalidatePath('/results/history')
    revalidatePath('/results/[date]')

    return NextResponse.json(
      { 
        revalidated: true,
        message: 'Cache cleared successfully',
        timestamp: new Date().toISOString()
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Error revalidating cache',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
