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
    <footer className="py-8 sm:py-12 bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Mobile-First Layout - Everything centered and stacked */}
        <div className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-10 mb-8">
          
          {/* Company Info - Always centered on mobile */}
          <div className="w-full max-w-md text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight">ModulSoft</div>
            </div>
            <p className="text-background/80 mb-4 text-base sm:text-lg leading-relaxed">
              {t('hero.description')}
            </p>
            <p className="text-background/70 text-sm leading-relaxed">
              {t('hero.experience')}, {t('hero.projects')}.<br />
              {t('hero.specialists')}.
            </p>
          </div>

          {/* Desktop Layout - Side by side navigation and contacts */}
          <div className="w-full flex flex-col md:flex-row items-center justify-center 
                         md:justify-between md:items-start text-center md:text-left 
                         space-y-8 md:space-y-0 md:space-x-12 max-w-4xl">
          
            {/* Navigation Section */}
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-bold text-background mb-4">{t('footer.navigation')}</h3>
              <nav className="flex flex-col items-center md:items-start space-y-3">
                <button 
                  onClick={() => {
                    onHomeClick?.();
                    smoothScrollToTop(1200);
                  }}
                  className="block text-background/80 hover:text-accent transition-all duration-300 
                           hover:scale-105 w-full md:w-auto text-center md:text-left
                           py-2 px-4 rounded-md hover:bg-background/10"
                >
                  {t('nav.home')}
                </button>
                <button 
                  onClick={onContactsClick}
                  className="block text-background/80 hover:text-accent transition-all duration-300 
                           hover:scale-105 w-full md:w-auto text-center md:text-left
                           py-2 px-4 rounded-md hover:bg-background/10"
                >
                  {t('nav.contacts')}
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement('product', 100, 1200);
                  }}
                  className="block text-background/80 hover:text-accent transition-all duration-300 
                           hover:scale-105 w-full md:w-auto text-center md:text-left
                           py-2 px-4 rounded-md hover:bg-background/10"
                >
                  {t('nav.product')}
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement('features', 100, 1200);
                  }}
                  className="block text-background/80 hover:text-accent transition-all duration-300 
                           hover:scale-105 w-full md:w-auto text-center md:text-left
                           py-2 px-4 rounded-md hover:bg-background/10"
                >
                  {t('nav.features')}
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement('pricing', 100, 1200);
                  }}
                  className="block text-background/80 hover:text-accent transition-all duration-300 
                           hover:scale-105 w-full md:w-auto text-center md:text-left
                           py-2 px-4 rounded-md hover:bg-background/10"
                >
                  {t('nav.pricing')}
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement('faq', 100, 1200);
                  }}
                  className="block text-background/80 hover:text-accent transition-all duration-300 
                           hover:scale-105 w-full md:w-auto text-center md:text-left
                           py-2 px-4 rounded-md hover:bg-background/10"
                >
                  {t('nav.faq')}
                </button>
              </nav>
            </div>
            
            {/* Contact Info Section */}
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-bold text-background mb-4">{t('footer.contacts')}</h3>
              <div className="flex flex-col items-center md:items-start space-y-4 text-sm leading-relaxed">
                <div className="space-y-2 text-center md:text-left">
                  <a 
                    href="tel:+380931776504"
                    className="block text-background/80 hover:text-accent transition-all duration-300 
                             hover:scale-105 text-lg font-medium py-1 px-2 rounded-md hover:bg-background/10"
                  >
                    +38 (093) 177-65-04
                  </a>
                  <a 
                    href="mailto:info@modulsoft.eu"
                    className="block text-background/80 hover:text-accent transition-all duration-300 
                             hover:scale-105 py-1 px-2 rounded-md hover:bg-background/10"
                  >
                    info@modulsoft.eu
                  </a>
                </div>
                
                <div className="pt-2 text-center md:text-left">
                  <p className="text-background/70 mb-2 font-medium hover:text-background transition-colors duration-300">
                    {t('contacts.schedule.title')}:
                  </p>
                  <p className="text-background/70 hover:text-background/90 transition-colors duration-300">
                    {t('footer.schedule')}<br />
                    {t('footer.weekend')}
                  </p>
                </div>
                
                <div className="pt-2 text-center md:text-left">
                  <p className="text-background/70 mb-2 font-medium hover:text-background transition-colors duration-300">
                    {t('contacts.address.title')}:
                  </p>
                  <p className="text-background/70 hover:text-background/90 transition-colors duration-300">
                    43025, {t('footer.address')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="bg-background/20 mb-6" />
        
        {/* Bottom Section - Always centered and responsive */}
        <div className="text-center space-y-3">
          <div className="text-sm sm:text-base">
            {t('footer.rights')}
          </div>
          <button 
            onClick={onPrivacyClick}
            className="text-background/80 hover:text-accent transition-all duration-300 
                     text-sm underline underline-offset-4 decoration-1 
                     hover:decoration-2 hover:scale-105 py-2 px-4 rounded-md
                     hover:bg-background/10"
          >
            {t('footer.privacy')}
          </button>
        </div>
      </div>
    </footer>
  )
}