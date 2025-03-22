"use client"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { Trash2, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

export default function CartSheet() {
  const { cartItems, removeFromCart, clearCart } = useCart()

  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
        <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">Sepetiniz boş</h3>
        <p className="text-muted-foreground">Sepetinize ürün ekleyin</p>
        <SheetClose asChild>
          <Link href="/">
            <Button>Alışverişe Başla</Button>
          </Link>
        </SheetClose>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-semibold">Sepetim ({cartItems.length} ürün)</h2>
        <Button variant="ghost" size="sm" onClick={clearCart} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Sepeti Temizle
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1 my-4">
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.product.id} className="flex gap-4">
              <div className="relative h-20 w-20 bg-muted rounded">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium line-clamp-2">{item.product.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.product.price.toFixed(2)} ₺</span>
                    <span className="text-sm text-muted-foreground">x {item.quantity}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.product.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="mt-auto">
        <Separator />
        <div className="py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-muted-foreground">Toplam</span>
            <span className="text-lg font-bold">{totalPrice.toFixed(2)} ₺</span>
          </div>
          <SheetClose asChild>
            <Link href="/checkout">
              <Button className="w-full">Ödemeye Geç</Button>
            </Link>
          </SheetClose>
        </div>
      </div>
    </div>
  )
}

