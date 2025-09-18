import { Separator } from "@/components/ui/separator"
import { smoothScrollToElement, smoothScrollToTop } from "@/lib/smoothScroll"
import { useTranslation } from "@/hooks/useTranslation"

interface FooterProps {
  onContactsClick?: () => void
  onPrivacyClick?: () => void
  onHomeClick?: () => void
}

export default function Footer({ onContactsClick, onPrivacyClick, onHomeClick }: FooterProps) {
  const { t } = useTranslation()
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
              {t('hero.description')}
            </p>
            <p className="text-background/70 text-sm leading-relaxed">
              {t('hero.experience')}, {t('hero.projects')}.<br />
              {t('hero.specialists')}.
            </p>
          </div>

          {/* Navigation Section - Centered */}
          <div className="flex-shrink-0">
            <h3 className="text-lg font-bold text-background mb-4">{t('footer.navigation')}</h3>
            <nav className="space-y-3">
              <button 
                onClick={() => {
                  onHomeClick?.();
                  smoothScrollToTop(1200);
                }}
                className="block text-background/80 hover:text-background hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 hover:scale-105 w-full text-left"
              >
                {t('nav.home')}
              </button>
              <button 
                onClick={onContactsClick}
                className="block text-background/80 hover:text-background hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 hover:scale-105 w-full text-left"
              >
                {t('nav.contacts')}
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('product', 100, 1200);
                }}
                className="block text-background/80 hover:text-background hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 hover:scale-105 w-full text-left"
              >
                {t('nav.product')}
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('features', 100, 1200);
                }}
                className="block text-background/80 hover:text-background hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 hover:scale-105 w-full text-left"
              >
                {t('nav.features')}
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('pricing', 100, 1200);
                }}
                className="block text-background/80 hover:text-background hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 hover:scale-105 w-full text-left"
              >
                {t('nav.pricing')}
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollToElement('faq', 100, 1200);
                }}
                className="block text-background/80 hover:text-background hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 hover:scale-105 w-full text-left"
              >
                {t('nav.faq')}
              </button>
            </nav>
          </div>
          
          {/* Contact Info Section - Centered */}
          <div className="flex-1 max-w-sm lg:max-w-md">
            <h3 className="text-lg font-bold text-background mb-4">{t('footer.contacts')}</h3>
            <div className="space-y-4 text-sm leading-relaxed">
              <div className="space-y-2">
                <a 
                  href="tel:+380931776504"
                  className="block text-background/80 hover:text-background hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 hover:scale-105 text-lg font-medium"
                >
                  +38 (093) 177-65-04
                </a>
                <a 
                  href="mailto:info@modulsoft.eu"
                  className="block text-background/80 hover:text-background hover:text-accent transition-all duration-300 cursor-pointer hover:translate-x-1 hover:scale-105"
                >
                  info@modulsoft.eu
                </a>
              </div>
              
              <div className="pt-2">
                <p className="text-background/70 mb-2 font-medium cursor-pointer hover:text-background transition-colors duration-300">{t('contacts.schedule.title')}:</p>
                <p className="text-background/70 cursor-pointer hover:text-background/90 transition-colors duration-300">
                  {t('footer.schedule')}<br />
                  {t('footer.weekend')}
                </p>
              </div>
              
              <div className="pt-2">
                <p className="text-background/70 mb-2 font-medium cursor-pointer hover:text-background transition-colors duration-300">{t('contacts.address.title')}:</p>
                <p className="text-background/70 cursor-pointer hover:text-background/90 transition-colors duration-300">
                  43025, {t('footer.address')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="bg-background/20 mb-6" />
        
        {/* Bottom Section - Always centered */}
        <div className="text-center space-y-3">
          <div>
            {t('footer.rights')}
          </div>
          <button 
            onClick={onPrivacyClick}
            className="text-background/80 hover:text-background hover:text-accent transition-all duration-300 text-sm cursor-pointer underline underline-offset-4 decoration-1 hover:decoration-2 hover:scale-105"
          >
            {t('footer.privacy')}
          </button>
        </div>
      </div>
    </footer>
  )
}