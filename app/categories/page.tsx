import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"
import { CompareProvider } from "@/context/compare-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { searchUnsplashImages } from "@/lib/unsplash"

export const metadata = {
  title: "Kategoriler - FakeStore",
  description: "FakeStore'un tüm ürün kategorileri",
}

async function getCategories() {
  try {
    const response = await fetch("https://fakestoreapi.com/products/categories", {
      next: { revalidate: 3600 }, // 1 saat cache
    })

    if (!response.ok) {
      throw new Error("Kategoriler yüklenirken bir hata oluştu")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

async function getCategoryImages(categories: string[]) {
  const images: Record<string, any> = {}

  for (const category of categories) {
    const categoryImages = await searchUnsplashImages(category, 1)
    images[category] = categoryImages.length > 0 ? categoryImages[0] : null
  }

  return images
}

export default async function CategoriesPage() {
  const categories = await getCategories()
  const categoryImages = await getCategoryImages(categories)

  // Kategori açıklamaları
  const categoryDescriptions: Record<string, string> = {
    electronics: "En son teknoloji ürünleri, akıllı cihazlar, bilgisayarlar ve daha fazlası.",
    jewelery: "Zarif takılar, kolyeler, yüzükler ve özel tasarım mücevherler.",
    "men's clothing": "Erkekler için şık ve rahat giyim ürünleri, tişörtler, pantolonlar ve daha fazlası.",
    "women's clothing": "Kadınlar için moda giyim ürünleri, elbiseler, bluzlar ve daha fazlası.",
  }

  // Alt kategoriler
  const subCategories: Record<string, string[]> = {
    electronics: ["Akıllı Telefonlar", "Bilgisayarlar", "Tabletler", "Kulaklıklar", "Kameralar", "Akıllı Saatler"],
    jewelery: ["Kolyeler", "Yüzükler", "Küpeler", "Bilezikler", "Saatler", "Özel Tasarımlar"],
    "men's clothing": ["Tişörtler", "Gömlekler", "Pantolonlar", "Ceketler", "Ayakkabılar", "Aksesuarlar"],
    "women's clothing": ["Elbiseler", "Bluzlar", "Etekler", "Pantolonlar", "Ayakkabılar", "Çantalar"],
  }

  return (
    <div className="min-h-screen bg-background">
      <CartProvider>
        <CompareProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Kategoriler</h1>

            <div className="grid gap-12">
              {categories.map((category: string) => (
                <div key={category} className="space-y-6">
                  <div className="relative h-[300px] rounded-xl overflow-hidden">
                    <Image
                      src={categoryImages[category]?.urls.regular || "/placeholder.svg"}
                      alt={category}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center p-8">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </h2>
                        <p className="text-white/80 max-w-md mb-6">{categoryDescriptions[category]}</p>
                        <Link href={`/?category=${category}`}>
                          <Button>Ürünleri Görüntüle</Button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {subCategories[category].map((subCategory, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                          <h3 className="font-medium">{subCategory}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </CompareProvider>
      </CartProvider>
    </div>
  )
}

