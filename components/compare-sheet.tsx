"use client"

import { useCompare } from "@/context/compare-context"
import { Button } from "@/components/ui/button"
import { SheetClose } from "@/components/ui/sheet"
import { Trash2, BarChart2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CompareSheet() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare()

  if (compareItems.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
        <BarChart2 className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-lg font-medium">Karşılaştırma listeniz boş</h3>
        <p className="text-muted-foreground">Karşılaştırmak için ürün ekleyin</p>
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
        <h2 className="text-lg font-semibold">Ürün Karşılaştırma ({compareItems.length})</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCompare}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Temizle
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1 my-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Ürün</TableHead>
              {compareItems.map((item) => (
                <TableHead key={item.id} className="min-w-[150px]">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => removeFromCompare(item.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <div className="relative h-20 w-20 mx-auto mb-2">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-contain" />
                    </div>
                    <p className="text-xs text-center line-clamp-2">{item.title}</p>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Fiyat</TableCell>
              {compareItems.map((item) => (
                <TableCell key={`${item.id}-price`} className="text-center font-bold text-primary">
                  {item.price.toFixed(2)} ₺
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Kategori</TableCell>
              {compareItems.map((item) => (
                <TableCell key={`${item.id}-category`} className="text-center">
                  {item.category}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Değerlendirme</TableCell>
              {compareItems.map((item) => (
                <TableCell key={`${item.id}-rating`} className="text-center">
                  {item.rating.rate}/5 ({item.rating.count} değerlendirme)
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Açıklama</TableCell>
              {compareItems.map((item) => (
                <TableCell key={`${item.id}-description`} className="text-xs">
                  <p className="line-clamp-3">{item.description}</p>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              {compareItems.map((item) => (
                <TableCell key={`${item.id}-action`} className="text-center">
                  <SheetClose asChild>
                    <Link href={`/product/${item.id}`}>
                      <Button size="sm" variant="outline">
                        Görüntüle
                      </Button>
                    </Link>
                  </SheetClose>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}

