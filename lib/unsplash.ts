// Unsplash API için yardımcı fonksiyonlar
const UNSPLASH_ACCESS_KEY = "pSklEQGVdF6rmySnEHUXpojcQSFq0kJMYzRuVJ-RadI"
const UNSPLASH_API_URL = "https://api.unsplash.com"

export type UnsplashImage = {
  id: string
  urls: {
    raw: string
    full: string
    regular: string
    small: string
    thumb: string
  }
  alt_description: string
  user: {
    name: string
    username: string
  }
}

export async function searchUnsplashImages(query: string, count = 1): Promise<UnsplashImage[]> {
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 86400 }, // 24 saat cache
      },
    )

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching images from Unsplash:", error)
    return []
  }
}

export async function getRandomUnsplashImage(query: string): Promise<UnsplashImage | null> {
  try {
    const response = await fetch(`${UNSPLASH_API_URL}/photos/random?query=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      next: { revalidate: 86400 }, // 24 saat cache
    })

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching random image from Unsplash:", error)
    return null
  }
}

