import { Separator } from "@/components/ui/separator"

interface FooterProps {
  onContactsClick?: () => void
  onPrivacyClick?: () => void
  onHomeClick?: () => void
}

export default function Footer({ onContactsClick, onPrivacyClick, onHomeClick }: FooterProps) {
  return (
    <footer className="py-12 bg-foreground text-background">
      <div className="container mx-auto">
        {/* Top Section - Centered Layout */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 lg:space-y-0 lg:flex-row lg:justify-between lg:items-start lg:text-left mb-10">
          
          {/* Company Info - Centered on mobile, left-aligned on desktop */}
          <div className="flex-1 max-w-sm lg:max-w-md">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
              <div className="text-3xl font-bold tracking-tight">ModulSoft</div>
            </div>
            <p className="text-background/80 mb-4 text-lg leading-relaxed">
              Професійні рішення для автоматизації бізнесу
            </p>
            <p className="text-background/70 text-sm leading-relaxed">
              Понад 16 років досвіду, більше 200 успішних впроваджень.<br />
              40+ сертифікованих спеціалістів.
            </p>
          </div>

          {/* Navigation Section - Centered */}
          <div className="flex-shrink-0">
            <h3 className="text-lg font-bold text-background mb-4">Навігація</h3>
            <nav className="space-y-3">
              <button 
                onClick={() => {
                  onHomeClick?.();
                  // Плавний скрол до верху сторінки
                  window.scrollTo({ 
                    top: 0, 
                    behavior: 'smooth' 
                  });
                }}
                className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1 w-full text-left"
              >
                Головна
              </button>
              <button 
                onClick={onContactsClick}
                className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1 w-full text-left"
              >
                Контакти
              </button>
              <a 
                href="#product"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('product');
                  if (element) {
                    const offsetTop = element.offsetTop - 100; // Offset для хедера
                    window.scrollTo({ 
                      top: offsetTop, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
              >
                Продукт
              </a>
              <a 
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('features');
                  if (element) {
                    const offsetTop = element.offsetTop - 100; // Offset для хедера
                    window.scrollTo({ 
                      top: offsetTop, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
              >
                Функції
              </a>
              <a 
                href="#pricing"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('pricing');
                  if (element) {
                    const offsetTop = element.offsetTop - 100; // Offset для хедера
                    window.scrollTo({ 
                      top: offsetTop, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
              >
                Ціни
              </a>
              <a 
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('faq');
                  if (element) {
                    const offsetTop = element.offsetTop - 100; // Offset для хедера
                    window.scrollTo({ 
                      top: offsetTop, 
                      behavior: 'smooth' 
                    });
                  }
                }}
                className="block text-background/80 hover:text-background transition-all duration-300 cursor-pointer hover:translate-x-1"
              >
                FAQ
              </a>
            </nav>
          </div>
          
          {/* Contact Info Section - Centered */}
          <div className="flex-1 max-w-sm lg:max-w-md">
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
        
        <Separator className="bg-background/20 mb-6" />
        
        {/* Bottom Section - Always centered */}
        <div className="text-center space-y-3">
          <div>
            © 2024 ModulSoft. Всі права захищені.
          </div>
          <button 
            onClick={onPrivacyClick}
            className="text-background/80 hover:text-background transition-all duration-300 text-sm cursor-pointer underline underline-offset-4 decoration-1 hover:decoration-2"
          >
            Політика приватності
          </button>
        </div>
      </div>
    </footer>
  )
}