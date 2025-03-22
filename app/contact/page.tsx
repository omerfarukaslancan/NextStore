import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"
import { CompareProvider } from "@/context/compare-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata = {
  title: "İletişim - FakeStore",
  description: "FakeStore ile iletişime geçin",
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <CartProvider>
        <CompareProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">İletişim</h1>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Bize Ulaşın</CardTitle>
                    <CardDescription>
                      Sorularınız, önerileriniz veya şikayetleriniz için bizimle iletişime geçebilirsiniz.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Ad</Label>
                          <Input id="firstName" placeholder="Adınız" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Soyad</Label>
                          <Input id="lastName" placeholder="Soyadınız" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input id="email" type="email" placeholder="E-posta adresiniz" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Konu</Label>
                        <Input id="subject" placeholder="Mesajınızın konusu" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Mesaj</Label>
                        <Textarea id="message" placeholder="Mesajınız" rows={5} required />
                      </div>
                      <Button type="submit" className="w-full">
                        Gönder
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>İletişim Bilgilerimiz</CardTitle>
                    <CardDescription>Aşağıdaki kanallardan bize ulaşabilirsiniz.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Adres</h3>
                        <p className="text-muted-foreground">
                          Atatürk Bulvarı No: 123
                          <br />
                          Çankaya / Ankara
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Telefon</h3>
                        <p className="text-muted-foreground">+90 (312) 123 45 67</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">E-posta</h3>
                        <p className="text-muted-foreground">info@fakestore.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-medium">Çalışma Saatleri</h3>
                        <p className="text-muted-foreground">
                          Pazartesi - Cuma: 09:00 - 18:00
                          <br />
                          Cumartesi: 10:00 - 14:00
                          <br />
                          Pazar: Kapalı
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Müşteri Hizmetleri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Sipariş, iade ve değişim işlemleri için müşteri hizmetlerimize 7/24 ulaşabilirsiniz.
                    </p>
                    <Button variant="outline" className="w-full">
                      Müşteri Hizmetleri
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-12">
              <Card>
                <CardHeader>
                  <CardTitle>Konum</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full rounded-md overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5400922519166!2d32.85345491744384!3d39.90903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f190a9cea8f%3A0xd3862ea8248d08a0!2sAtat%C3%BCrk%20Bulvar%C4%B1%2C%20%C3%87ankaya%2FAnkara!5e0!3m2!1str!2str!4v1651234567890!5m2!1str!2str"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </CompareProvider>
      </CartProvider>
    </div>
  )
}

