import { Suspense } from "react"
import { notFound } from "next/navigation"
import ProductDetail from "@/components/product-detail"
import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"
import { CompareProvider } from "@/context/compare-context"
import { Skeleton } from "@/components/ui/skeleton"

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!res.ok) {
      throw new Error("Failed to fetch product")
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
      description: "Aradığınız ürün bulunamadı.",
    }
  }

  return {
    title: `${product.title} - FakeStore`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <CartProvider>
        <CompareProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Suspense fallback={<ProductDetailSkeleton />}>
              <ProductDetail product={product} />
            </Suspense>
          </main>
        </CompareProvider>
      </CartProvider>
    </div>
  )
}

function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Skeleton className="aspect-square rounded-lg" />
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-full max-w-xs" />
      </div>
    </div>
  )
}

