"use client"

import type React from "react"

import Image from "next/image"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/types/product"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart, Eye, BarChart2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useCompare } from "@/context/compare-context"
import { useState } from "react"

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const { addToCompare, isInCompare } = useCompare()
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart(product)

    toast({
      title: "Sepete eklendi",
      description: `${product.title} sepetinize eklendi.`,
    })
  }

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCompare(product)

    toast({
      title: "Karşılaştırmaya eklendi",
      description: `${product.title} karşılaştırma listesine eklendi.`,
    })
  }

  return (
    <Card
      className="overflow-hidden flex flex-col h-full group transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative h-48 bg-white dark:bg-gray-800 transition-transform duration-500 ease-in-out">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className={`object-contain p-4 transition-all duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Quick action buttons that appear on hover */}
        <div
          className={`absolute top-2 right-2 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
            onClick={handleAddToCompare}
          >
            <BarChart2 className={`h-4 w-4 ${isInCompare(product.id) ? "text-primary" : ""}`} />
            <span className="sr-only">Karşılaştır</span>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Favorilere Ekle</span>
          </Button>
          <Link href={`/product/${product.id}`}>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800"
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Ürünü İncele</span>
            </Button>
          </Link>
        </div>

        {/* Category badge */}
        <Badge className="absolute top-2 left-2 bg-primary/80 backdrop-blur-sm">{product.category}</Badge>
      </div>

      <CardContent className="p-4 flex-grow">
        <Link href={`/product/${product.id}`} className="hover:underline">
          <h2 className="text-lg font-semibold line-clamp-2 mb-2 transition-colors hover:text-primary">
            {product.title}
          </h2>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span
                key={i}
                className={`text-xs ${i < Math.round(product.rating.rate) ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          <span className="text-xs text-muted-foreground ml-1">({product.rating.count})</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-xl font-bold text-primary">{product.price.toFixed(2)} ₺</p>
        <Button onClick={handleAddToCart} size="sm" className="transition-transform hover:scale-105">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Sepete Ekle
        </Button>
      </CardFooter>
    </Card>
  )
}

