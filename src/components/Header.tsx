import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { useTranslation } from "@/hooks/useTranslation"
import LanguageSwitcher from "./LanguageSwitcher"

interface HeaderProps {
  onContactClick: (service: string) => void
  onContactsClick?: () => void
}

export default function Header({ onContactClick, onContactsClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  const menuItemVariants = {
    hover: {
      scale: 1.05,
      color: "oklch(0.65 0.18 220)", // Using the accent color from our theme
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  }

  const menuItems = [
    { href: "#product", label: t('nav.product') },
    { href: "#features", label: t('nav.features') },
    { href: "#pricing", label: t('nav.pricing') },
    { href: "#faq", label: t('nav.faq') },
    { href: null, label: t('nav.contacts'), onClick: onContactsClick }
  ]

  // Функція для більш плавного скролу з оптимізованою анімацією
  const handleSmoothScroll = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const elementId = href.replace('#', '');
    const element = document.getElementById(elementId);
    if (element) {
      const rect = element.getBoundingClientRect();
      const elementPosition = window.pageYOffset + rect.top;
      const offsetPosition = elementPosition - 100; // Offset для фіксованого хедера
      
      // Використовуємо більш плавну анімацію
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000; // Збільшена тривалість для більш плавної анімації
      let startTime: number | null = null;

      // Покращена функція easing для природніших переходів
      const easeInOutCubic = (t: number): number => {
        return t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      };

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const run = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * run);
        
        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
  }

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            variants={logoVariants}
            whileHover="hover"
          >
            <div className="text-xl font-bold text-primary">
              ModulSoft
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              item.href ? (
                <motion.a 
                  key={index}
                  href={item.href} 
                  className="text-foreground font-medium cursor-pointer relative overflow-hidden menu-item-hover"
                  variants={menuItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={(e) => handleSmoothScroll(item.href, e)}
                  style={{
                    textDecoration: "none"
                  }}
                >
                  {item.label}
                </motion.a>
              ) : (
                <motion.button
                  key={index}
                  onClick={item.onClick}
                  className="text-foreground font-medium cursor-pointer relative overflow-hidden menu-item-hover bg-transparent border-none"
                  variants={menuItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {item.label}
                </motion.button>
              )
            ))}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <motion.a 
                href="tel:+380931776504" 
                className="text-muted-foreground cursor-pointer hidden lg:block"
                whileHover={{ 
                  scale: 1.05, 
                  color: "oklch(0.65 0.18 220)",
                  transition: { duration: 0.3 } 
                }}
              >
                +38 (093) 177-65-04
              </motion.a>
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button 
                  onClick={() => onContactClick(t('nav.call'))} 
                  variant="outline" 
                  size="sm"
                  className="cursor-pointer hidden sm:flex"
                >
                  {t('nav.call')}
                </Button>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 cursor-pointer relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.span
                className="h-0.5 bg-foreground origin-center"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 6 : 0,
                  width: isMobileMenuOpen ? "100%" : "100%",
                  backgroundColor: isMobileMenuOpen ? "oklch(0.65 0.18 220)" : undefined
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileHover={{ backgroundColor: "oklch(0.65 0.18 220)" }}
              />
              <motion.span
                className="h-0.5 bg-foreground"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scaleX: isMobileMenuOpen ? 0 : 1
                }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                whileHover={{ backgroundColor: "oklch(0.65 0.18 220)", scaleX: 1.1 }}
              />
              <motion.span
                className="h-0.5 bg-foreground origin-center"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -6 : 0,
                  width: isMobileMenuOpen ? "100%" : "100%",
                  backgroundColor: isMobileMenuOpen ? "oklch(0.65 0.18 220)" : undefined
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                whileHover={{ backgroundColor: "oklch(0.65 0.18 220)" }}
              />
            </div>
          </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav 
              className="md:hidden mt-4 pb-4 border-t border-border pt-4 overflow-hidden"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <div className="flex flex-col space-y-3">
                {menuItems.map((item, index) => (
                  item.href ? (
                    <motion.a 
                      key={index}
                      href={item.href} 
                      className="text-foreground font-medium cursor-pointer block py-2 menu-item-hover"
                      custom={index}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ 
                        color: "oklch(0.65 0.18 220)",
                        transition: { duration: 0.3, ease: "easeInOut" }
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 }
                      }}
                      onClick={(e) => {
                        handleSmoothScroll(item.href, e);
                        setIsMobileMenuOpen(false);
                      }}
                      style={{
                        textDecoration: "none"
                      }}
                    >
                      {item.label}
                    </motion.a>
                  ) : (
                    <motion.button
                      key={index}
                      onClick={() => {
                        item.onClick?.()
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-foreground font-medium cursor-pointer block py-2 menu-item-hover bg-transparent border-none text-left"
                      custom={index}
                      variants={mobileItemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ 
                        color: "oklch(0.65 0.18 220)",
                        transition: { duration: 0.3, ease: "easeInOut" }
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: { duration: 0.1 }
                      }}
                    >
                      {item.label}
                    </motion.button>
                  )
                ))}
                <motion.div
                  custom={5}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Separator />
                </motion.div>
                <motion.a 
                  href="tel:+380931776504" 
                  className="text-muted-foreground cursor-pointer"
                  custom={6}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  +38 (093) 177-65-04
                </motion.a>
                <motion.div
                  custom={7}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Button 
                    onClick={() => {
                      onContactClick(t('nav.call'))
                      setIsMobileMenuOpen(false)
                    }} 
                    variant="outline" 
                    size="sm" 
                    className="w-fit cursor-pointer"
                  >
                    {t('nav.call')}
                  </Button>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}