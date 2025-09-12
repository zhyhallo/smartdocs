import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"

interface HeaderProps {
  onContactClick: (service: string) => void
  onContactsClick?: () => void
}

export default function Header({ onContactClick, onContactsClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
    { href: "#product", label: "Продукт" },
    { href: "#features", label: "Функції" },
    { href: "#pricing", label: "Ціна" },
    { href: "#faq", label: "FAQ" },
    { href: null, label: "Контакти", onClick: onContactsClick }
  ]

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
              <motion.a 
                href="tel:+380931776504" 
                className="text-muted-foreground cursor-pointer"
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
                  onClick={() => onContactClick("Замовити дзвінок")} 
                  variant="outline" 
                  size="sm"
                  className="cursor-pointer"
                >
                  Замовити дзвінок
                </Button>
              </motion.div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 cursor-pointer relative"
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
                      onClick={() => setIsMobileMenuOpen(false)}
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
                      onContactClick("Замовити дзвінок")
                      setIsMobileMenuOpen(false)
                    }} 
                    variant="outline" 
                    size="sm" 
                    className="w-fit cursor-pointer"
                  >
                    Замовити дзвінок
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