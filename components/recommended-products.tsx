"use client"

import { useEffect, useState } from "react"
import type { Product } from "@/types/product"
import ProductCard from "./product-card"
import { Skeleton } from "@/components/ui/skeleton"
import type { UnsplashImage } from "@/lib/unsplash"

export default function RecommendedProducts({ currentProduct }: { currentProduct: Product }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryImage, setCategoryImage] = useState<UnsplashImage | null>(null)

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true)
        // Fetch products from the same category
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${encodeURIComponent(currentProduct.category)}`,
        )
        if (!response.ok) {
          throw new Error("Ürünler yüklenirken bir hata oluştu")
        }
        const data = await response.json()

        // Filter out the current product
        const filteredProducts = data.filter((product: Product) => product.id !== currentProduct.id)
        setProducts(filteredProducts)

        // Fetch a category image from Unsplash
        try {
          const imageResponse = await fetch(
            `/api/unsplash?query=${encodeURIComponent(currentProduct.category + " products")}&random=true`,
          )
          if (imageResponse.ok) {
            const imageData = await imageResponse.json()
            setCategoryImage(imageData)
          }
        } catch (error) {
          console.error("Error fetching category image:", error)
        }
      } catch (error) {
        console.error("Error fetching recommended products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendedProducts()
  }, [currentProduct])

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Benzer Ürünler</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Benzer Ürünler</h2>

        {categoryImage && (
          <div className="hidden md:block text-xs text-muted-foreground">
            Background by{" "}
            <a
              href={`https://unsplash.com/@${categoryImage.user.username}?utm_source=your_app&utm_medium=referral`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {categoryImage.user.name}
            </a>{" "}
            on Unsplash
          </div>
        )}
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-xl"
        style={
          categoryImage
            ? {
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${categoryImage.urls.regular})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

