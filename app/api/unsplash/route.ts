import { searchUnsplashImages, getRandomUnsplashImage } from "@/lib/unsplash"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("query")
  const count = searchParams.get("count") ? Number.parseInt(searchParams.get("count") as string) : 1
  const random = searchParams.get("random") === "true"

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  try {
    if (random) {
      const image = await getRandomUnsplashImage(query)
      return NextResponse.json(image)
    } else {
      const images = await searchUnsplashImages(query, count)
      return NextResponse.json({ results: images })
    }
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}

