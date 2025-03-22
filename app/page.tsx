import ProductGrid from "@/components/product-grid"
import { CartProvider } from "@/context/cart-context"
import { CompareProvider } from "@/context/compare-context"
import Header from "@/components/header"
import CategoryFilter from "@/components/category-filter"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { searchUnsplashImages } from "@/lib/unsplash"
import Image from "next/image"
import { Button } from "@/components/ui/button"

async function getHeroImage() {
  const images = await searchUnsplashImages("shopping fashion technology", 1)
  return images.length > 0 ? images[0] : null
}

export default async function Home() {
  const heroImage = await getHeroImage()

  return (
    <div className="min-h-screen bg-background">
      <CartProvider>
        <CompareProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <section className="mb-12">
              <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] flex items-center">
                {heroImage ? (
                  <>
                    <Image
                      src={heroImage.urls.regular || "/placeholder.svg"}
                      alt={heroImage.alt_description || "Hero image"}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 mix-blend-overlay"></div>
                  </div>
                )}

                <div className="relative z-10 p-8 md:p-12 max-w-2xl">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Yeni Sezon Ürünleri</h1>
                  <p className="text-white/90 text-lg mb-6">
                    En yeni ürünleri keşfedin ve trendleri yakalayın. Özel fırsatlar ve indirimler için hemen alışverişe
                    başlayın.
                  </p>
                  <Button className="bg-white text-primary hover:bg-white/90">Hemen Keşfet</Button>
                </div>
              </div>

              {heroImage && (
                <div className="mt-2 text-xs text-right text-muted-foreground">
                  Photo by{" "}
                  <a
                    href={`https://unsplash.com/@${heroImage.user.username}?utm_source=your_app&utm_medium=referral`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {heroImage.user.name}
                  </a>{" "}
                  on{" "}
                  <a
                    href="https://unsplash.com/?utm_source=your_app&utm_medium=referral"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    Unsplash
                  </a>
                </div>
              )}
            </section>

            <Suspense fallback={<Skeleton className="h-10 w-full max-w-md mb-8" />}>
              <CategoryFilter />
            </Suspense>

            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid />
            </Suspense>
          </main>
        </CompareProvider>
      </CartProvider>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-card rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            <Skeleton className="h-48 w-full" />
            <div className="p-4 flex flex-col flex-grow">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <div className="mt-auto flex justify-between items-center">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

