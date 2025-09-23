import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { X, Cookie, Shield, CheckCircle } from "@phosphor-icons/react"
import { useKV } from "@github/spark/hooks"
import { useTranslation } from "@/hooks/useTranslation"

interface CookieConsentProps {
  onAccept?: () => void
  onDecline?: () => void
  onLearnMore?: () => void
}

export default function CookieConsent({ onAccept, onDecline, onLearnMore }: CookieConsentProps) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const [cookieConsent, setCookieConsent, deleteCookieConsent] = useKV("cookie-consent", undefined as string | undefined)
  const [isAccepted, setIsAccepted] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Wait for useKV to initialize
  useEffect(() => {
    if (!isInitialized) {
      console.log('Initializing cookie consent, current value:', cookieConsent)
      setIsInitialized(true)
    }
  }, [cookieConsent, isInitialized])

  useEffect(() => {
    // Force show banner on first load if no consent stored (simpler approach)
    const stored = localStorage.getItem('cookie-consent')
    console.log('Stored cookie consent:', stored)
    
    if (!stored) {
      console.log('No cookie consent found, showing banner...')
      const timer = setTimeout(() => {
        setIsVisible(true)
        console.log('Cookie banner is now visible')
      }, 1500) // Show after 1.5 seconds
      
      return () => clearTimeout(timer)
    } else {
      console.log('Cookie consent already exists:', stored)
    }
  }, []) // Run only once on mount

  // For testing purposes - reset cookie consent on double click of title (development only)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Press Ctrl+Shift+C to reset cookie consent for testing
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        deleteCookieConsent()
        setIsVisible(true)
        setIsAccepted(false)
        console.log('Cookie consent reset for testing')
      }
    }
    
    if (process.env.NODE_ENV === 'development') {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [deleteCookieConsent])

  const handleAccept = () => {
    console.log('Cookie consent accepted')
    localStorage.setItem('cookie-consent', 'accepted')
    setCookieConsent("accepted")
    setIsAccepted(true)
    onAccept?.()
    
    // Hide banner after brief success animation
    setTimeout(() => {
      setIsVisible(false)
      console.log('Cookie banner hidden after acceptance')
    }, 1500)
  }

  const handleDecline = () => {
    console.log('Cookie consent declined')
    localStorage.setItem('cookie-consent', 'declined')
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

  console.log('%c🍪 Cookie Consent Component Loaded', 'color: #2563eb; font-size: 14px; font-weight: bold;')
  
  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[60] p-4"
        style={{ zIndex: 60 }} // Ensure it's above Zadarma widget
        variants={bannerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        data-cookie-consent="true"
      >
        <Card className="max-w-4xl mx-auto border-border/80 bg-card/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-4 md:p-6">
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
                  {t('cookies.success')}
                </p>
              </motion.div>
            ) : (
              <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Cookie size={20} className="text-accent md:w-6 md:h-6" />
                  </div>
                </div>
                
                <div className="flex-1 space-y-2 md:space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield size={18} className="text-primary md:w-5 md:h-5" />
                    <h3 className="text-base md:text-lg font-bold text-foreground">
                      {t('cookies.title')}
                    </h3>
                  </div>
                  
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {t('cookies.message')}{' '}
                    <button 
                      onClick={handleLearnMore}
                      className="text-accent hover:underline cursor-pointer font-medium"
                    >
                      {t('contact.privacy.link')}
                    </button>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                  <Button
                    onClick={handleAccept}
                    className="cursor-pointer whitespace-nowrap text-sm"
                    size="sm"
                  >
                    {t('cookies.accept')}
                  </Button>
                  
                  <Button
                    onClick={handleLearnMore}
                    variant="outline"
                    className="cursor-pointer whitespace-nowrap text-sm"
                    size="sm"
                  >
                    {t('cookies.learn')}
                  </Button>
                  
                  <Button
                    onClick={handleDecline}
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer p-2 w-8 h-8 sm:w-auto sm:h-auto"
                  >
                    <X size={14} className="sm:mr-2" />
                    <span className="hidden sm:inline text-sm">{t('cookies.decline')}</span>
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