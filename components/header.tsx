"use client"

import type React from "react"

import { ShoppingCart, Menu, X, Search, BarChart2 } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ThemeToggle } from "./theme-toggle"
import CartSheet from "./cart-sheet"
import { Input } from "@/components/ui/input"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCompare } from "@/context/compare-context"
import CompareSheet from "./compare-sheet"

export default function Header() {
  const { cartItems } = useCart()
  const { compareItems } = useCompare()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const compareItemCount = compareItems.length

  const navItems = [
    { label: "Ana Sayfa", href: "/" },
    { label: "Ürünler", href: "/products" },
    { label: "Kategoriler", href: "/categories" },
    { label: "Kampanyalar", href: "/campaigns" },
    { label: "Hakkımızda", href: "/about" },
    { label: "İletişim", href: "/contact" },
  ]

  useEffect(() => {
    // Get search query from URL on initial load
    const query = searchParams.get("q")
    if (query) {
      setSearchQuery(query)
    }

    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      // Create new URLSearchParams object
      const params = new URLSearchParams(searchParams.toString())

      // Update or add the search query parameter
      params.set("q", searchQuery)

      // Navigate to the search results page
      router.push(`/?${params.toString()}`)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            <Link href="/" className="text-2xl font-bold text-primary">
              FakeStore
            </Link>

            <nav className="hidden md:flex items-center gap-6 ml-10">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors font-medium ${
                    pathname === item.href ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Ürün ara..."
                className="w-[200px] lg:w-[300px] pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <ThemeToggle />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BarChart2 className="h-5 w-5" />
                  {compareItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {compareItemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <CompareSheet />
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <CartSheet />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className={`mt-4 ${mobileMenuOpen ? "block" : "hidden"} md:hidden`}>
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="search"
              placeholder="Ürün ara..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-card border-t">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`transition-colors ${
                  pathname === item.href ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

