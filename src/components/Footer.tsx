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
    <footer className="py-4 sm:py-5 bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Compact Layout - Company info at top, then navigation/contacts inline */}
        <div className="flex flex-col space-y-4 mb-4">
          
          {/* Company Info - More compact */}
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold tracking-tight mb-2">ModulSoft</div>
            <p className="text-background/70 text-sm">
              {t('hero.experience')}, {t('hero.projects')}. {t('hero.specialists')}.
            </p>
          </div>

          {/* Navigation and Contact Info - Side by side on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-center md:text-left">
          
            {/* Navigation Section - Horizontal on mobile */}
            <div className="md:col-span-1">
              <h3 className="text-base font-semibold text-background mb-2">{t('footer.navigation')}</h3>
              <nav className="flex flex-wrap justify-center md:justify-start md:flex-col gap-1">
                <button 
                  onClick={() => {
                    onHomeClick?.();
                    smoothScrollToTop(1200);
                  }}
                  className="text-background/80 hover:text-accent transition-colors duration-200 text-sm px-2 py-1"
                >
                  {t('nav.home')}
                </button>
                <span className="text-background/40 md:hidden">•</span>
                <button 
                  onClick={onContactsClick}
                  className="text-background/80 hover:text-accent transition-colors duration-200 text-sm px-2 py-1"
                >
                  {t('nav.contacts')}
                </button>
                <span className="text-background/40 md:hidden">•</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement('product', 100, 1200);
                  }}
                  className="text-background/80 hover:text-accent transition-colors duration-200 text-sm px-2 py-1"
                >
                  {t('nav.product')}
                </button>
                <span className="text-background/40 md:hidden">•</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement('pricing', 100, 1200);
                  }}
                  className="text-background/80 hover:text-accent transition-colors duration-200 text-sm px-2 py-1"
                >
                  {t('nav.pricing')}
                </button>
                <span className="text-background/40 md:hidden">•</span>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement('faq', 100, 1200);
                  }}
                  className="text-background/80 hover:text-accent transition-colors duration-200 text-sm px-2 py-1"
                >
                  FAQ
                </button>
              </nav>
            </div>
            
            {/* Contact Info Section - More compact */}
            <div className="md:col-span-2">
              <h3 className="text-base font-semibold text-background mb-2">{t('footer.contacts')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                
                {/* Phone and Email */}
                <div className="space-y-1">
                  <a 
                    href="tel:+380931776504"
                    className="block text-background/80 hover:text-accent transition-colors duration-200 font-medium"
                  >
                    +38 (093) 177-65-04
                  </a>
                  <a 
                    href="mailto:info@modulsoft.eu"
                    className="block text-background/80 hover:text-accent transition-colors duration-200"
                  >
                    info@modulsoft.eu
                  </a>
                </div>
                
                {/* Schedule */}
                <div className="space-y-1">
                  <p className="text-background/70 text-xs font-medium">
                    {t('contacts.schedule.title')}:
                  </p>
                  <p className="text-background/70 text-xs">
                    {t('footer.schedule')}<br />
                    {t('footer.weekend')}
                  </p>
                </div>
                
                {/* Address */}
                <div className="space-y-1">
                  <p className="text-background/70 text-xs font-medium">
                    {t('contacts.address.title')}:
                  </p>
                  <p className="text-background/70 text-xs">
                    43025, {t('footer.address')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="bg-background/20 mb-3" />
        
        {/* Bottom Section - Compact copyright and privacy */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left space-y-2 sm:space-y-0">
          <div className="text-xs sm:text-sm text-background/80">
            {t('footer.rights')}
          </div>
          <button 
            onClick={onPrivacyClick}
            className="text-background/70 hover:text-accent transition-colors duration-200 
                     text-xs underline underline-offset-2"
          >
            {t('footer.privacy')}
          </button>
        </div>
      </div>
    </footer>
  )
}