import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Sipariş Tamamlandı - FakeStore",
  description: "Siparişiniz başarıyla tamamlandı",
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-card rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-foreground">Siparişiniz Tamamlandı!</h1>
        <p className="text-muted-foreground mb-6">
          Siparişiniz başarıyla alındı. Sipariş detaylarınız e-posta adresinize gönderildi.
        </p>
        <p className="text-muted-foreground mb-8">
          Sipariş Numarası:{" "}
          <span className="font-medium text-foreground">
            {Math.floor(Math.random() * 1000000)
              .toString()
              .padStart(6, "0")}
          </span>
        </p>
        <Link href="/">
          <Button className="w-full">Alışverişe Devam Et</Button>
        </Link>
      </div>
    </div>
  )
}

