"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/types/product"
import { useToast } from "@/hooks/use-toast"

type CompareContextType = {
  compareItems: Product[]
  addToCompare: (product: Product) => void
  removeFromCompare: (productId: number) => void
  clearCompare: () => void
  isInCompare: (productId: number) => boolean
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const { toast } = useToast()

  const MAX_COMPARE_ITEMS = 4

  // Load compare items from localStorage on initial render
  useEffect(() => {
    const storedItems = localStorage.getItem("compareItems")
    if (storedItems) {
      try {
        setCompareItems(JSON.parse(storedItems))
      } catch (error) {
        console.error("Error parsing compare data from localStorage:", error)
      }
    }
    setIsInitialized(true)
  }, [])

  // Save compare items to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("compareItems", JSON.stringify(compareItems))
    }
  }, [compareItems, isInitialized])

  const addToCompare = (product: Product) => {
    setCompareItems((prevItems) => {
      // Check if product is already in compare list
      if (prevItems.some((item) => item.id === product.id)) {
        toast({
          title: "Zaten eklenmiş",
          description: "Bu ürün zaten karşılaştırma listenizde bulunuyor.",
          variant: "destructive",
        })
        return prevItems
      }

      // Check if compare list is full
      if (prevItems.length >= MAX_COMPARE_ITEMS) {
        toast({
          title: "Karşılaştırma listesi dolu",
          description: `En fazla ${MAX_COMPARE_ITEMS} ürünü karşılaştırabilirsiniz.`,
          variant: "destructive",
        })
        return prevItems
      }

      return [...prevItems, product]
    })
  }

  const removeFromCompare = (productId: number) => {
    setCompareItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const clearCompare = () => {
    setCompareItems([])
  }

  const isInCompare = (productId: number) => {
    return compareItems.some((item) => item.id === productId)
  }

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}

