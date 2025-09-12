import { Separator } from "@/components/ui/separator"
import { OwlAnalyst } from "@/components"

interface FooterProps {
  onContactsClick?: () => void
  onPrivacyClick?: () => void
  onHomeClick?: () => void
}

export default function Footer({ onContactsClick, onPrivacyClick, onHomeClick }: FooterProps) {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <OwlAnalyst size="xs" animated={false} className="filter invert" />
              <div className="text-2xl font-bold">ModulSoft</div>
            </div>
            <p className="text-background/80 mb-4">
              Професійні рішення для автоматизації бізнесу
            </p>
            <p className="text-background/70 text-sm leading-relaxed">
              Понад 16 років досвіду, більше 200 успішних впроваджень.<br />
              40+ сертифікованих спеціалістів.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-background mb-4">Навігація</h3>
            <nav className="space-y-2">
              <button 
                onClick={onHomeClick}
                className="block text-background/80 hover:text-background transition-colors cursor-pointer"
              >
                Головна
              </button>
              <a 
                href="#product"
                className="block text-background/80 hover:text-background transition-colors cursor-pointer"
              >
                Продукт
              </a>
              <a 
                href="#features"
                className="block text-background/80 hover:text-background transition-colors cursor-pointer"
              >
                Функції
              </a>
              <a 
                href="#pricing"
                className="block text-background/80 hover:text-background transition-colors cursor-pointer"
              >
                Ціни
              </a>
              <button 
                onClick={onContactsClick}
                className="block text-background/80 hover:text-background transition-colors cursor-pointer"
              >
                Контакти
              </button>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold text-background mb-4">Наші контакти</h3>
            <div className="space-y-2 text-sm">
              <a 
                href="tel:+380931776504"
                className="block text-background/80 hover:text-background transition-colors cursor-pointer"
              >
                +38 (093) 177-65-04
              </a>
              <a 
                href="mailto:info@modulsoft.eu"
                className="block text-background/80 hover:text-background transition-colors cursor-pointer"
              >
                info@modulsoft.eu
              </a>
              <p className="text-background/70">
                Пн. - Пт.: з 8:00 до 17:00<br />
                Сб. - Нд.: вихідні
              </p>
              <p className="text-background/70">
                43025, м. Луцьк,<br />
                вул. Святовасилівська 4/3
              </p>
            </div>
          </div>
        </div>
        
        <Separator className="bg-background/20 mb-6" />
        
        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-background/60 text-sm mb-2">
            © 2024 ModulSoft. Всі права захищені.
          </p>
          <button 
            onClick={onPrivacyClick}
            className="text-background/80 hover:text-background transition-colors text-sm cursor-pointer underline"
          >
            Політика приватності
          </button>
        </div>
      </div>
    </footer>
  )
}