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
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 mb-10">
          {/* Company Info */}
          <div className="text-center md:text-left md:col-span-12 lg:col-span-4">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="text-3xl font-bold tracking-tight">ModulSoft</div>
            </div>
            <p className="text-background/80 mb-4 text-lg leading-relaxed">
              Професійні рішення для автоматизації бізнесу
            </p>
            <p className="text-background/70 text-sm leading-relaxed max-w-md">
              Понад 16 років досвіду, більше 200 успішних впроваджень.<br />
              40+ сертифікованих спеціалістів.
            </p>
          </div>

          {/* Navigation and Contact Info layout with centered owl */}
          <div className="md:col-span-12 lg:col-span-8">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
              
              {/* Navigation Section */}
              <div className="text-center md:text-left flex-1">
                <h3 className="text-lg font-bold text-background mb-4">Навігація</h3>
                <nav className="space-y-3">
                  <button 
                    onClick={onHomeClick}
                    className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
                  >
                    Головна
                  </button>
                  <button 
                    onClick={onContactsClick}
                    className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
                  >
                    Контакти
                  </button>
                  <a 
                    href="#product"
                    className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
                  >
                    Продукт
                  </a>
                  <a 
                    href="#features"
                    className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
                  >
                    Функції
                  </a>
                  <a 
                    href="#pricing"
                    className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
                  >
                    Ціни
                  </a>
                </nav>
              </div>
              
              {/* Owl positioned between navigation and contacts with proper spacing */}
              <div className="flex justify-center items-center pt-4 md:pt-0 px-6 md:px-10 lg:px-12">
                <OwlAnalyst 
                  size="md" 
                  animated={true} 
                  withTerminal={false}
                  className="filter invert" 
                />
              </div>

              {/* Contact Info Section */}
              <div className="text-center md:text-left flex-1">
                <h3 className="text-lg font-bold text-background mb-4">Наші контакти</h3>
                <div className="space-y-4 text-sm leading-relaxed">
                  <div className="space-y-2">
                    <a 
                      href="tel:+380931776504"
                      className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1 text-lg font-medium"
                    >
                      +38 (093) 177-65-04
                    </a>
                    <a 
                      href="mailto:info@modulsoft.eu"
                      className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
                    >
                      info@modulsoft.eu
                    </a>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-background/70 mb-2 font-medium">Режим роботи:</p>
                    <p className="text-background/70">
                      Пн. - Пт.: з 8:00 до 17:00<br />
                      Сб. - Нд.: вихідні
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-background/70 mb-2 font-medium">Адреса:</p>
                    <p className="text-background/70">
                      43025, м. Луцьк,<br />
                      вул. Святовасилівська 4/3
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="bg-background/20 mb-6" />
        
        {/* Bottom Section */}
        <div className="text-center space-y-3">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-background/60 text-sm">
              © 2024 ModulSoft. Всі права захищені.
            </p>
            <button 
              onClick={onPrivacyClick}
              className="text-background/80 hover:text-background transition-all duration-300 text-sm cursor-pointer underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              Політика приватності
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}