import { Separator } from "@/components/ui/separator"

export default function Footer() {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">ModulSoft</div>
          <p className="text-background/80 mb-6">
            Професійні рішення для автоматизації бізнесу
          </p>
          <div className="flex justify-center space-x-8 mb-6">
            <a 
              href="mailto:info@modulsoft.eu" 
              className="text-background/80 hover:text-background transition-colors cursor-pointer"
            >
              info@modulsoft.eu
            </a>
            <a 
              href="tel:+48123456789" 
              className="text-background/80 hover:text-background transition-colors cursor-pointer"
            >
              +48 123 456 789
            </a>
          </div>
          <Separator className="bg-background/20 mb-6" />
          <p className="text-background/60 text-sm">
            © 2024 ModulSoft. Всі права захищені. | 
            <a href="#" className="hover:text-background transition-colors ml-2 cursor-pointer">Політика приватності</a>
          </p>
        </div>
      </div>
    </footer>
  )
}