"use client"

import Image from "next/image"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ShoppingCart, Heart, Star, Share2, ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import RecommendedProducts from "./recommended-products"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import type { UnsplashImage } from "@/lib/unsplash"

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [categoryImage, setCategoryImage] = useState<UnsplashImage | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Kategori için Unsplash'ten görsel çek
    const fetchCategoryImage = async () => {
      try {
        const response = await fetch(`/api/unsplash?query=${encodeURIComponent(product.category)}&random=true`)
        if (response.ok) {
          const imageData = await response.json()
          setCategoryImage(imageData)
        }
      } catch (error) {
        console.error("Error fetching category image:", error)
      }
    }

    fetchCategoryImage()
  }, [product.category])

  const handleAddToCart = () => {
    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      for (let i = 0; i < quantity; i++) {
        addToCart(product)
      }

      toast({
        title: "Sepete eklendi",
        description: `${product.title} sepetinize eklendi.`,
      })

      setIsLoading(false)
    }, 600)
  }

  return (
    <div className="space-y-12">
      <Button variant="ghost" className="mb-4 group" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Geri Dön
      </Button>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-4">
          <Card className="overflow-hidden p-6 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all hover:shadow-lg">
            <div className="relative h-[400px] w-full">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </Card>

          <div className="grid grid-cols-4 gap-2">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="overflow-hidden p-2 cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                >
                  <div className="relative h-20 w-full">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={`${product.title} thumbnail ${i + 1}`}
                      fill
                      className="object-contain"
                      sizes="25vw"
                    />
                  </div>
                </Card>
              ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                {product.category}
              </Badge>
              <Badge variant="outline" className="text-yellow-600 dark:text-yellow-400">
                {product.rating.rate} ★
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>

            <div className="flex items-center gap-1 mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.round(product.rating.rate) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              <span className="text-sm text-muted-foreground ml-2">({product.rating.count} değerlendirme)</span>
            </div>

            <p className="text-3xl font-bold text-primary mb-4">{product.price.toFixed(2)} ₺</p>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="mb-2">
                <TabsTrigger value="description">Açıklama</TabsTrigger>
                <TabsTrigger value="details">Detaylar</TabsTrigger>
                <TabsTrigger value="shipping">Kargo</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="text-muted-foreground">
                {product.description}
              </TabsContent>
              <TabsContent value="details">
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Kategori: {product.category}</li>
                  <li>Değerlendirme: {product.rating.rate}/5</li>
                  <li>Stok Durumu: Mevcut</li>
                  <li>Garanti: 2 Yıl</li>
                </ul>
              </TabsContent>
              <TabsContent value="shipping">
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Ücretsiz kargo (100₺ ve üzeri siparişlerde)</li>
                  <li>1-3 iş günü içinde kargoya verilir</li>
                  <li>30 gün içinde ücretsiz iade</li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex flex-col gap-6 mt-auto">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-10"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                Stokta <span className="font-medium text-foreground">50+</span> adet
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" size="lg" onClick={handleAddToCart} disabled={isLoading}>
                {isLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full mr-2" />
                ) : (
                  <ShoppingCart className="h-5 w-5 mr-2" />
                )}
                Sepete Ekle
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Heart className="h-5 w-5 mr-2 group-hover:fill-red-500 group-hover:text-red-500 transition-colors" />
                Favorilere Ekle
              </Button>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {categoryImage && (
        <div className="relative rounded-lg overflow-hidden h-48 md:h-64 my-12">
          <Image
            src={categoryImage.urls.regular || "/placeholder.svg"}
            alt={categoryImage.alt_description || product.category}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8">
            <div className="max-w-md">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)} Koleksiyonu
              </h2>
              <p className="text-white/80 mb-4">En yeni {product.category} ürünlerimizi keşfedin</p>
              <Button variant="outline" className="bg-transparent text-white border-white hover:bg-white/20">
                Tümünü Gör
              </Button>
            </div>
          </div>

          <div className="absolute bottom-2 right-2 text-xs text-white/70">
            Photo by{" "}
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
        </div>
      )}

      <RecommendedProducts currentProduct={product} />
    </div>
  )
}

