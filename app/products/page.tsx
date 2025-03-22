import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"
import { CompareProvider } from "@/context/compare-context"
import ProductGrid from "@/components/product-grid"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Ürünler - FakeStore",
  description: "FakeStore'un tüm ürünleri",
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

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <CartProvider>
        <CompareProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Ürünler</h1>

            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid />
            </Suspense>
          </main>
        </CompareProvider>
      </CartProvider>
    </div>
  )
}

