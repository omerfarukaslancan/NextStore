"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import type { UnsplashImage } from "@/lib/unsplash"

type Category = {
  name: string
  image: UnsplashImage | null
}

export default function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([])
  const [categoryImages, setCategoryImages] = useState<Record<string, UnsplashImage | null>>({})
  const [loading, setLoading] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get("category")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Kategorileri API'den çek
        const response = await fetch("https://fakestoreapi.com/products/categories")
        if (!response.ok) {
          throw new Error("Kategoriler yüklenirken bir hata oluştu")
        }
        const data = await response.json()
        setCategories(data)

        // Her kategori için Unsplash'ten görsel çek
        const images: Record<string, UnsplashImage | null> = {}

        for (const category of data) {
          try {
            const response = await fetch(`/api/unsplash?query=${encodeURIComponent(category)}&count=1`)
            if (response.ok) {
              const imageData = await response.json()
              if (imageData.results && imageData.results.length > 0) {
                images[category] = imageData.results[0]
              } else {
                images[category] = null
              }
            }
          } catch (error) {
            console.error(`Error fetching image for ${category}:`, error)
            images[category] = null
          }
        }

        setCategoryImages(images)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (category: string | null) => {
    const params = new URLSearchParams(searchParams.toString())

    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }

    router.push(`/?${params.toString()}`)
  }

  // Kategori görsellerini manuel olarak ayarla (API çağrısı yapılana kadar)
  const getCategoryImageUrl = (category: string) => {
    if (categoryImages[category]?.urls?.regular) {
      return categoryImages[category]?.urls?.regular
    }

    // Fallback görseller
    const fallbackImages: Record<string, string> = {
      electronics: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070",
      jewelery: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070",
      "men's clothing": "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=2070",
      "women's clothing": "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070",
    }

    return fallbackImages[category] || "/placeholder.svg"
  }

  if (loading) {
    return <div className="h-10 animate-pulse bg-muted rounded-md mb-8" />
  }

  return (
    <div className="mb-12" id="categories">
      <h2 className="text-2xl font-bold mb-6 relative inline-block">
        Kategoriler
        <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary rounded-full transform origin-left animate-[pulse_2s_ease-in-out_infinite]"></span>
      </h2>

      <div className="relative mb-8">
        <div className="absolute -top-6 left-0 w-full overflow-hidden h-12 pointer-events-none">
          <div className="flex animate-[scroll_20s_linear_infinite]">
            {[...categories, ...categories, ...categories].map((category, index) => (
              <span key={`${category}-${index}`} className="text-4xl font-bold opacity-10 whitespace-nowrap mr-8">
                {category.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category}
            className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
              activeCategory === category ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="relative h-40 bg-muted group">
              <Image
                src={getCategoryImageUrl(category) || "/placeholder.svg"}
                alt={category}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* İç içe geçmiş kategori isimleri */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className="absolute text-white font-bold text-center whitespace-nowrap transform"
                      style={{
                        fontSize: `${Math.max(1, (i + 1) * 1.2)}rem`,
                        opacity: 1 - i * 0.15,
                        top: `${10 + i * 10}%`,
                        transform: `rotate(${(i % 2 === 0 ? -1 : 1) * i * 5}deg)`,
                      }}
                    >
                      {category.toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>
            <CardContent className="p-4 absolute bottom-0 left-0 right-0 z-10">
              <h3 className="font-medium text-white text-lg transition-transform duration-300 group-hover:translate-x-1">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 pb-2">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => handleCategoryClick(null)}
              className="transition-all duration-300 hover:scale-105"
            >
              Tümü
            </Button>

            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryClick(category)}
                className="transition-all duration-300 hover:scale-105"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}

