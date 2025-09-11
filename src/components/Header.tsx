import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu, X } from "@phosphor-icons/react"

interface HeaderProps {
  onContactClick: (service: string) => void
}

export default function Header({ onContactClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-primary">ModulSoft</div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#product" className="text-foreground hover:text-primary transition-colors cursor-pointer">Продукт</a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors cursor-pointer">Функції</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors cursor-pointer">Ціна</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors cursor-pointer">FAQ</a>
            <div className="flex items-center space-x-4">
              <a href="tel:+48123456789" className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                +48 123 456 789
              </a>
              <Button 
                onClick={() => onContactClick("Замовити дзвінок")} 
                variant="outline" 
                size="sm"
                className="cursor-pointer"
              >
                Замовити дзвінок
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <a href="#product" className="text-foreground hover:text-primary transition-colors cursor-pointer">Продукт</a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors cursor-pointer">Функції</a>
              <a href="#pricing" className="text-foreground hover:text-primary transition-colors cursor-pointer">Ціна</a>
              <a href="#faq" className="text-foreground hover:text-primary transition-colors cursor-pointer">FAQ</a>
              <Separator />
              <a href="tel:+48123456789" className="text-muted-foreground cursor-pointer">+48 123 456 789</a>
              <Button 
                onClick={() => onContactClick("Замовити дзвінок")} 
                variant="outline" 
                size="sm" 
                className="w-fit cursor-pointer"
              >
                Замовити дзвінок
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}