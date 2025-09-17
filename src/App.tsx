import { useState, lazy, Suspense } from "react"
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
  ZadarmaWidget
} from "@/components"
import { Toaster } from "sonner"
import { motion } from "framer-motion"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { InteractionProvider } from "@/hooks/useInteractionContext"

// Lazy load non-critical components
const ScrollToTop = lazy(() => import("@/components/ScrollToTop"))
const ContactPage = lazy(() => import("@/components/ContactPage"))
const PrivacyPolicy = lazy(() => import("@/components/PrivacyPolicy"))
const CookieConsent = lazy(() => import("@/components/CookieConsent"))


type CurrentView = "home" | "contacts" | "privacy"

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactService, setContactService] = useState("Консультація")
  const [currentView, setCurrentView] = useState<CurrentView>("home")

  // Enable smooth scrolling for anchor links with offset for fixed header
  useSmoothScroll({ offset: 80, duration: 1500 })

  const openContactModal = (service: string = "Консультація") => {
    setContactService(service)
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

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3,
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
          <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>}>
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
          <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>}>
            <PrivacyPolicy onBackClick={handleHomeClick} />
          </Suspense>
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
        
        <Suspense fallback={<div className="fixed inset-0 bg-background/80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>}>
          <ScrollToTop />
        </Suspense>
        
        <Suspense fallback={null}>
          <CookieConsent 
            onLearnMore={handlePrivacyClick}
          />
        </Suspense>
        
        <ZadarmaWidget />
        
        <Toaster richColors position="top-right" />
      </motion.div>
    </InteractionProvider>
  )
}

export default App