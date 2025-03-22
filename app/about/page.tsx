import Header from "@/components/header"
import { CartProvider } from "@/context/cart-context"
import { CompareProvider } from "@/context/compare-context"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Hakkımızda - FakeStore",
  description: "FakeStore hakkında bilgi edinin",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <CartProvider>
        <CompareProvider>
          <Header />
          <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-foreground">Hakkımızda</h1>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Biz Kimiz?</h2>
                <p className="text-muted-foreground">
                  FakeStore, 2015 yılında kurulmuş, müşterilerine kaliteli ürünleri uygun fiyatlarla sunmayı hedefleyen
                  bir e-ticaret platformudur. Elektronikten giyime, takıdan ev dekorasyonuna kadar geniş bir ürün
                  yelpazesi sunuyoruz.
                </p>
                <p className="text-muted-foreground">
                  Müşteri memnuniyetini her zaman ön planda tutarak, alışveriş deneyimini en üst seviyeye çıkarmak için
                  sürekli kendimizi geliştiriyoruz. Güvenilir alışveriş, hızlı teslimat ve müşteri odaklı hizmet
                  anlayışımızla sektörde fark yaratıyoruz.
                </p>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button>Bize Ulaşın</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070"
                  alt="FakeStore Ekibi"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Değerlerimiz</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Müşteri Memnuniyeti</h3>
                    <p className="text-muted-foreground">
                      Müşterilerimizin memnuniyeti bizim için en önemli önceliktir. Her zaman müşterilerimizin
                      beklentilerini aşmayı hedefliyoruz.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Kalite</h3>
                    <p className="text-muted-foreground">
                      Sunduğumuz tüm ürünlerde kaliteyi ön planda tutuyoruz. Tedarikçilerimizi titizlikle seçiyor ve
                      ürün kalitesini sürekli denetliyoruz.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-medium mb-2">Güvenilirlik</h3>
                    <p className="text-muted-foreground">
                      Müşterilerimize her zaman dürüst ve şeffaf bir alışveriş deneyimi sunuyoruz. Güven bizim için
                      vazgeçilmez bir değerdir.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-6">Tarihçemiz</h2>
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 font-bold text-xl">2015</div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-medium mb-2">Kuruluş</h3>
                    <p className="text-muted-foreground">
                      FakeStore, küçük bir ekip tarafından kuruldu ve ilk olarak elektronik ürünler satmaya başladı.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 font-bold text-xl">2018</div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-medium mb-2">Büyüme</h3>
                    <p className="text-muted-foreground">
                      Ürün yelpazemizi genişleterek giyim, takı ve ev dekorasyonu kategorilerini ekledik.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 font-bold text-xl">2020</div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-medium mb-2">Dijital Dönüşüm</h3>
                    <p className="text-muted-foreground">
                      Platformumuzu tamamen yenileyerek daha kullanıcı dostu bir arayüz ve gelişmiş özellikler ekledik.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 font-bold text-xl">2023</div>
                  <div className="md:w-3/4">
                    <h3 className="text-lg font-medium mb-2">Bugün</h3>
                    <p className="text-muted-foreground">
                      Bugün, binlerce müşteriye hizmet veren, geniş ürün yelpazesine sahip bir e-ticaret platformu
                      olarak yolumuza devam ediyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </CompareProvider>
      </CartProvider>
    </div>
  )
}

