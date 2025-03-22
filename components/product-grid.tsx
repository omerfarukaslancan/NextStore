"use client"

import type React from "react"

import { useEffect, useState } from "react"
import ProductCard from "./product-card"
import type { Product } from "@/types/product"
import { useSearchParams } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { SlidersHorizontal, X, ArrowUpDown, ArrowDown, ArrowUp, TrendingUp } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc" | "popularity-desc"

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [minRating, setMinRating] = useState<number>(0)
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<SortOption>("default")

  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get("category")
  const searchQuery = searchParams.get("q")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://fakestoreapi.com/products")
        if (!response.ok) {
          throw new Error("Ürünler yüklenirken bir hata oluştu")
        }
        const data = await response.json()
        setProducts(data)

        // Set initial price range based on product prices
        if (data.length > 0) {
          const prices = data.map((product: Product) => product.price)
          const minPrice = Math.floor(Math.min(...prices))
          const maxPrice = Math.ceil(Math.max(...prices))
          setPriceRange([minPrice, maxPrice])
        }
      } catch (err) {
        setError("Ürünler yüklenirken bir hata oluştu")
        console.error("Error fetching products:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-destructive p-4">
        <p>{error}</p>
      </div>
    )
  }

  // Apply all filters
  let filteredProducts = products.filter((product) => {
    // Category filter
    if (categoryFilter && product.category !== categoryFilter) {
      return false
    }

    // Search query filter
    if (
      searchQuery &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Rating filter
    if (product.rating.rate < minRating) {
      return false
    }

    // In stock filter (simulated since the API doesn't have stock info)
    if (inStockOnly && product.id % 3 === 0) {
      // Simulate some products being out of stock
      return false
    }

    return true
  })

  // Apply sorting
  if (sortOption !== "default") {
    filteredProducts = [...filteredProducts].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating-desc":
          return b.rating.rate - a.rating.rate
        case "popularity-desc":
          return b.rating.count - a.rating.count
        default:
          return 0
      }
    })
  }

  const resetFilters = () => {
    const prices = products.map((product) => product.price)
    const minPrice = Math.floor(Math.min(...prices))
    const maxPrice = Math.ceil(Math.max(...prices))

    setPriceRange([minPrice, maxPrice])
    setMinRating(0)
    setInStockOnly(false)
    setSortOption("default")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-medium">
            {filteredProducts.length} ürün bulundu
            {searchQuery && <span className="ml-1">"{searchQuery}" için</span>}
            {categoryFilter && <span className="ml-1">"{categoryFilter}" kategorisinde</span>}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Select value={sortOption} onValueChange={(value) => setSortOption(value as SortOption)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Sıralama" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <span>Varsayılan Sıralama</span>
                </div>
              </SelectItem>
              <SelectItem value="price-asc">
                <div className="flex items-center">
                  <ArrowUp className="mr-2 h-4 w-4" />
                  <span>Fiyat (Artan)</span>
                </div>
              </SelectItem>
              <SelectItem value="price-desc">
                <div className="flex items-center">
                  <ArrowDown className="mr-2 h-4 w-4" />
                  <span>Fiyat (Azalan)</span>
                </div>
              </SelectItem>
              <SelectItem value="rating-desc">
                <div className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  <span>En Yüksek Puan</span>
                </div>
              </SelectItem>
              <SelectItem value="popularity-desc">
                <div className="flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  <span>Popülerlik</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filtrele
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtreleme Seçenekleri</SheetTitle>
                <SheetDescription>Ürünleri özelliklerine göre filtreleyebilirsiniz.</SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Fiyat Aralığı</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={0}
                      max={1000}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2">
                      <span>{priceRange[0]} ₺</span>
                      <span>{priceRange[1]} ₺</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Minimum Değerlendirme</h3>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant={minRating >= rating ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMinRating(rating)}
                        className="h-8 w-8 p-0"
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Minimum: {minRating} yıldız</span>
                    {minRating > 0 && (
                      <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => setMinRating(0)}>
                        <X className="h-3 w-3 mr-1" />
                        Temizle
                      </Button>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Stok Durumu</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="stock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(checked === true)}
                    />
                    <Label htmlFor="stock">Sadece stoktaki ürünleri göster</Label>
                  </div>
                </div>
              </div>

              <SheetFooter className="flex-row justify-between sm:justify-between">
                <Button variant="outline" onClick={resetFilters}>
                  Filtreleri Temizle
                </Button>
                <SheetClose asChild>
                  <Button>Uygula</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Ürün bulunamadı</h3>
          <p className="text-muted-foreground mb-4">Filtreleri değiştirerek tekrar deneyin.</p>
          <Button onClick={resetFilters}>Filtreleri Temizle</Button>
        </div>
      )}
    </div>
  )
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

