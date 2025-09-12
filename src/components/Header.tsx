import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Menu, X } from "@phosphor-icons/react"
import { motion, AnimatePresence } from "framer-motion"
import { OwlMascot } from "@/components"

interface HeaderProps {
  onContactClick: (service: string) => void
}

export default function Header({ onContactClick }: HeaderProps) {
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
      color: "oklch(0.65 0.18 220)", // Use accent blue color directly
      transition: { duration: 0.2 }
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
    { href: "#faq", label: "FAQ" }
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
            <OwlMascot size="sm" animated={false} />
            <div className="text-xl font-bold text-primary">
              ModulSoft
            </div>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a 
                key={index}
                href={item.href} 
                className="text-foreground transition-colors cursor-pointer hover:text-accent"
                variants={menuItemVariants}
                whileHover="hover"
              >
                {item.label}
              </motion.a>
            ))}
            <div className="flex items-center space-x-4">
              <motion.a 
                href="tel:+48123456789" 
                className="text-muted-foreground transition-colors cursor-pointer hover:text-accent"
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                +48 123 456 789
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
            className="md:hidden p-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isMobileMenuOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
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
                  <motion.a 
                    key={index}
                    href={item.href} 
                    className="text-foreground transition-colors cursor-pointer hover:text-accent"
                    custom={index}
                    variants={mobileItemVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  custom={4}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Separator />
                </motion.div>
                <motion.a 
                  href="tel:+48123456789" 
                  className="text-muted-foreground cursor-pointer"
                  custom={5}
                  variants={mobileItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  +48 123 456 789
                </motion.a>
                <motion.div
                  custom={6}
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