import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cookie, Shield, CheckCircle } from "@phosphor-icons/react"
import { useKV } from "@github/spark/hooks"

interface CookieConsentProps {
  onAccept?: () => void
  onDecline?: () => void
  onLearnMore?: () => void
}

export default function CookieConsent({ onAccept, onDecline, onLearnMore }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [cookieConsent, setCookieConsent, deleteCookieConsent] = useKV("cookie-consent", undefined as string | undefined)
  const [isAccepted, setIsAccepted] = useState(false)

  useEffect(() => {
    // Show banner only if consent hasn't been given yet
    if (cookieConsent === null) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000) // Show after 1 second
      
      return () => clearTimeout(timer)
    }
  }, [cookieConsent])

  const handleAccept = () => {
    setCookieConsent("accepted")
    setIsAccepted(true)
    onAccept?.()
    
    // Hide banner after brief success animation
    setTimeout(() => {
      setIsVisible(false)
    }, 1500)
  }

  const handleDecline = () => {
    setCookieConsent("declined")
    setIsVisible(false)
    onDecline?.()
  }

  const handleLearnMore = () => {
    onLearnMore?.()
  }

  const bannerVariants = {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      y: 100,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  }

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
        variants={bannerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Card className="max-w-4xl mx-auto border-border/80 bg-card/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-6">
            {isAccepted ? (
              <motion.div
                className="flex items-center justify-center space-x-3 py-4"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <p className="text-foreground font-medium">
                  Дякуємо за вашу згоду! Налаштування збережено.
                </p>
              </motion.div>
            ) : (
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Cookie size={24} className="text-accent" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield size={20} className="text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                      Повідомлення про файли cookie
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Цей сайт використовує файли cookie для забезпечення найкращої роботи 
                    та аналізу використання. Продовжуючи користування сайтом, ви погоджуєтесь 
                    з нашою <button 
                      onClick={handleLearnMore}
                      className="text-accent hover:underline cursor-pointer font-medium"
                    >
                      Політикою конфіденційності
                    </button>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                  <Button
                    onClick={handleAccept}
                    className="cursor-pointer whitespace-nowrap"
                  >
                    Погоджуюсь
                  </Button>
                  
                  <Button
                    onClick={handleLearnMore}
                    variant="outline"
                    className="cursor-pointer whitespace-nowrap"
                  >
                    Детальніше
                  </Button>
                  
                  <Button
                    onClick={handleDecline}
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer p-2 w-10 h-10 sm:w-auto sm:h-auto"
                  >
                    <X size={16} className="sm:mr-2" />
                    <span className="hidden sm:inline">Відхилити</span>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}