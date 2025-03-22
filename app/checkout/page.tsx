import { CartProvider } from "@/context/cart-context"
import { CompareProvider } from "@/context/compare-context"
import Header from "@/components/header"
import CheckoutForm from "@/components/checkout-form"

export const metadata = {
  title: "Ödeme - FakeStore",
  description: "Siparişinizi tamamlayın",
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background">
      <CartProvider>
        <CompareProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Ödeme</h1>
            <CheckoutForm />
          </main>
        </CompareProvider>
      </CartProvider>
    </div>
  )
}

