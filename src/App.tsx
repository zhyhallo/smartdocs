import { useState, lazy, Suspense, useEffect, memo } from "react"
import { 
  Header, 
  Hero, 
  ProductDescription, 
  Features, 
  Pricing, 
  SocialProof, 
  FAQ, 
  CTA, 
  Footer, 
  ContactModal,
  InteractiveSection,
  SEOManager,
  SEOSchemas,
  PrivacyPolicy
} from "@/components"
import { Toaster } from "sonner"
import { motion } from "framer-motion"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { InteractionProvider } from "@/hooks/useInteractionContext"
import { TranslationProvider, useTranslation } from "@/hooks/useTranslation"
import { 
  measureWebVitals, 
  preloadCriticalResources, 
  optimizeImages
} from "@/utils/optimization"

// Optimized lazy loading with better splitting
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"))

const ContactPage = lazy(() => import("@/components/ContactPage"))

const CookieConsent = lazy(() => import("@/components/CookieConsent"))

type CurrentView = "home" | "contacts" | "privacy"



function AppContent() {
  const { t } = useTranslation()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactService, setContactService] = useState("")
  const [currentView, setCurrentView] = useState<CurrentView>("home")

  // Optimized initialization with better error handling
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Preload critical resources
        preloadCriticalResources()
        
        // Setup performance monitoring
        measureWebVitals()
        
        // Optimize images with lazy loading (deferred for better performance)
        setTimeout(() => {
          optimizeImages()
        }, 2000)
        
        // Apply device-specific optimizations
        const applyOptimizations = () => {
          document.documentElement.classList.add('app-initialized')
          
          // Mobile-specific optimizations
          if (window.innerWidth <= 768) {
            document.documentElement.classList.add('reduce-motion')
          }
          
          // High-performance device optimizations
          if (window.devicePixelRatio > 2) {
            document.documentElement.classList.add('high-dpi')
          }
        }
        
        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(applyOptimizations, { timeout: 1000 })
        } else {
          setTimeout(applyOptimizations, 100)
        }
        
      } catch (error) {
        console.warn('App initialization failed:', error)
      }
    }
    
    initializeApp()
    
    // Cleanup function
    return () => {
      // Clean up any performance observers
      if (typeof PerformanceObserver !== 'undefined') {
        const observers = (window as any)._performanceObservers || []
        observers.forEach((observer: PerformanceObserver) => {
          observer.disconnect()
        })
      }
    }
  }, [])

  // Optimized smooth scrolling with consistent duration for better UX
  useSmoothScroll({ offset: 80 })

  const openContactModal = (service: string = "") => {
    setContactService(service || t('contact.title'))
    setIsContactModalOpen(true)
  }

  const handleContactsClick = () => {
    setCurrentView("contacts")
  }

  const handlePrivacyClick = () => {
    setCurrentView("privacy")
  }

  const handleHomeClick = () => {
    setCurrentView("home")
  }

  // Optimized page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }

  if (currentView === "contacts") {
    return (
      <InteractionProvider>
        <motion.div 
          className="min-h-screen bg-background"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
            <ContactPage 
              onBackClick={handleHomeClick}
              onContactClick={openContactModal}
            />
          </Suspense>
          <ContactModal 
            open={isContactModalOpen}
            onOpenChange={setIsContactModalOpen}
            defaultService={contactService}
            onPrivacyClick={handlePrivacyClick}
          />
          <Toaster richColors position="top-right" />
        </motion.div>
      </InteractionProvider>
    )
  }

  if (currentView === "privacy") {
    return (
      <InteractionProvider>
        <motion.div 
          className="min-h-screen bg-background"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <PrivacyPolicy onBackClick={handleHomeClick} />
          <Toaster richColors position="top-right" />
        </motion.div>
      </InteractionProvider>
    )
  }

  return (
    <InteractionProvider>
      <motion.div 
        className="min-h-screen bg-background"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Header 
          onContactClick={openContactModal}
          onContactsClick={handleContactsClick}
        />
        
        <main className="w-full">
          <InteractiveSection sectionId="hero" triggerOnView triggerOnHover>
            <Hero onContactClick={openContactModal} />
          </InteractiveSection>
          
          <div id="product">
            <InteractiveSection sectionId="product" triggerOnView>
              <ProductDescription />
            </InteractiveSection>
          </div>
          
          <div id="features">
            <InteractiveSection sectionId="features" triggerOnView>
              <Features />
            </InteractiveSection>
          </div>
          
          <div id="pricing">
            <InteractiveSection sectionId="pricing" triggerOnView>
              <Pricing onContactClick={openContactModal} />
            </InteractiveSection>
          </div>
          
          <InteractiveSection sectionId="social-proof" triggerOnView>
            <SocialProof />
          </InteractiveSection>
          
          <div id="faq">
            <InteractiveSection sectionId="faq" triggerOnView>
              <FAQ />
            </InteractiveSection>
          </div>
          
          <InteractiveSection sectionId="cta" triggerOnView>
            <CTA onContactClick={openContactModal} />
          </InteractiveSection>
        </main>
        
        <Footer 
          onContactsClick={handleContactsClick}
          onPrivacyClick={handlePrivacyClick}
          onHomeClick={handleHomeClick}
        />
        
        <ContactModal 
          open={isContactModalOpen}
          onOpenChange={setIsContactModalOpen}
          defaultService={contactService}
          onPrivacyClick={handlePrivacyClick}
        />
        
        <Suspense fallback={<div className="fixed bottom-4 right-4 w-12 h-12 bg-primary/10 rounded-full animate-pulse" />}>
          <ScrollToTop />
        </Suspense>
        
        <Suspense fallback={
          <div className="fixed bottom-4 left-4 right-4 z-50 opacity-20">
            <div className="max-w-4xl mx-auto bg-card/50 rounded-lg p-4 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-primary/20 rounded w-3/4"></div>
                  <div className="h-3 bg-primary/20 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        }>
          <CookieConsent 
            onLearnMore={handlePrivacyClick}
          />
        </Suspense>
        
        <Toaster richColors position="top-right" />
      </motion.div>
    </InteractionProvider>
  )
}

function App() {
  return (
    <TranslationProvider>
      <SEOManager />
      <SEOSchemas />
      <AppContent />
    </TranslationProvider>
  )
}

export default App