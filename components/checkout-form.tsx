"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2 } from "lucide-react"

export default function CheckoutForm() {
  const { cartItems, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const totalPrice = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
    }, 1500)
  }

  if (cartItems.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold mb-2">Sepetiniz boş</h2>
            <p className="text-muted-foreground mb-4">Ödeme yapmak için sepetinize ürün ekleyin</p>
            <Button onClick={() => router.push("/")}>Alışverişe Devam Et</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Teslimat Bilgileri</h2>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ad</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" type="tel" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adres</Label>
                      <Input id="address" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">Şehir</Label>
                        <Input id="city" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Posta Kodu</Label>
                        <Input id="postalCode" required />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Ödeme Yöntemi</Label>
                      <RadioGroup defaultValue="credit-card">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card">Kredi Kartı</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal">PayPal</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                          <Label htmlFor="bank-transfer">Banka Havalesi</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName">Kart Üzerindeki İsim</Label>
                      <Input id="cardName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Kart Numarası</Label>
                      <Input id="cardNumber" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                        <Input id="expiryDate" placeholder="AA/YY" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" required />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Siparişi Tamamla
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Sipariş Özeti</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.product.title.substring(0, 20)}...</p>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} x {item.product.price.toFixed(2)} ₺
                    </p>
                  </div>
                  <p className="font-medium">{(item.quantity * item.product.price).toFixed(2)} ₺</p>
                </div>
              ))}

              <Separator />

              <div className="flex justify-between">
                <p>Ara Toplam</p>
                <p>{totalPrice.toFixed(2)} ₺</p>
              </div>
              <div className="flex justify-between">
                <p>Kargo</p>
                <p>Ücretsiz</p>
              </div>
              <Separator />
              <div className="flex justify-between font-bold">
                <p>Toplam</p>
                <p>{totalPrice.toFixed(2)} ₺</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

