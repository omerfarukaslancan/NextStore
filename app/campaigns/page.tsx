import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"
import { CompareProvider } from "@/context/compare-context"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { searchUnsplashImages } from "@/lib/unsplash"
import { Badge } from "@/components/ui/badge"
import { Clock, Tag, Percent } from "lucide-react"

export const metadata = {
  title: "Kampanyalar - FakeStore",
  description: "FakeStore'un güncel kampanyaları ve indirimleri",
}

async function getCampaignImages() {
  const images = await searchUnsplashImages("shopping sale discount", 4)
  return images
}

export default async function CampaignsPage() {
  const campaignImages = await getCampaignImages()

  const campaigns = [
    {
      id: 1,
      title: "Yaz Sezonu İndirimleri",
      description: "Tüm yaz ürünlerinde %50'ye varan indirimler sizi bekliyor!",
      endDate: "30 Haziran 2025",
      discount: "50%",
      category: "Giyim",
      code: "YAZ2025",
    },
    {
      id: 2,
      title: "Elektronik Fırsatları",
      description: "Seçili elektronik ürünlerde kaçırılmayacak fırsatlar!",
      endDate: "15 Temmuz 2025",
      discount: "30%",
      category: "Elektronik",
      code: "TECH30",
    },
    {
      id: 3,
      title: "Takı Koleksiyonu",
      description: "Yeni sezon takı koleksiyonunda özel fiyatlar!",
      endDate: "1 Ağustos 2025",
      discount: "25%",
      category: "Takı",
      code: "JEWEL25",
    },
    {
      id: 4,
      title: "Kış Hazırlıkları",
      description: "Kış sezonu ürünlerinde erken rezervasyon indirimleri!",
      endDate: "15 Eylül 2025",
      discount: "40%",
      category: "Giyim",
      code: "WINTER40",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <CartProvider>
        <CompareProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Kampanyalar</h1>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Özel Fırsatlar</h2>
                <p className="text-muted-foreground">
                  FakeStore'un özel kampanyaları ve indirimlerinden yararlanarak alışverişinizi daha avantajlı hale
                  getirin. Sınırlı süreli fırsatları kaçırmayın!
                </p>
                <div className="pt-4">
                  <Link href="/">
                    <Button>Alışverişe Başla</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src={
                    campaignImages[0]?.urls.regular ||
                    "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=2070"
                  }
                  alt="Kampanyalar"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div>
                    <Badge className="bg-primary mb-2">Sınırlı Süre</Badge>
                    <h2 className="text-2xl font-bold text-white">Büyük Yaz İndirimi</h2>
                    <p className="text-white/80">Tüm ürünlerde %50'ye varan indirimler</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {campaigns.map((campaign, index) => (
                <Card key={campaign.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={
                        campaignImages[index]?.urls.regular ||
                        `https://images.unsplash.com/photo-${1607083206968 + index}?q=80&w=2070`
                      }
                      alt={campaign.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-white font-bold">{campaign.discount}</Badge>
                    </div>
                  </div>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{campaign.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{campaign.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{campaign.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Bitiş: {campaign.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Kupon Kodu: <span className="font-bold">{campaign.code}</span>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Kampanyaya Git</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Kampanya Kuralları</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>• Kampanyalar belirtilen tarihe kadar geçerlidir.</p>
                <p>• Kampanyalar stoklarla sınırlıdır.</p>
                <p>• Kampanyalar birleştirilemez ve başka indirimlerle kullanılamaz.</p>
                <p>• FakeStore, kampanya koşullarında değişiklik yapma hakkını saklı tutar.</p>
                <p>• Kupon kodları sepette ilgili alana girilmelidir.</p>
                <p>• İade durumunda, ürün kampanya fiyatı üzerinden iade edilir.</p>
              </div>
            </div>
          </main>
        </CompareProvider>
      </CartProvider>
    </div>
  )
}

