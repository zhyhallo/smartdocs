import { useState } from "react"
import { 
  Header, 
  Hero, 
  ProductDescription, 
  Features, 
  InteractiveSystemOverview,
  Pricing, 
  SocialProof, 
  FAQ, 
  CTA, 
  Footer, 
  ContactModal,
  ScrollToTop,
  InteractiveSection,
  ContactPage,
  PrivacyPolicy,
  CookieConsent
} from "@/components"
import { Toaster } from "sonner"
import { motion } from "framer-motion"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { InteractionProvider } from "@/hooks/useInteractionContext"

type CurrentView = "home" | "contacts" | "privacy"

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactService, setContactService] = useState("Консультація")
  const [currentView, setCurrentView] = useState<CurrentView>("home")

  // Enable smooth scrolling for anchor links with offset for fixed header
  useSmoothScroll({ offset: 80, duration: 800 })

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
          <ContactPage 
            onBackClick={handleHomeClick}
            onContactClick={openContactModal}
          />
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
        
        <InteractiveSection sectionId="system-overview" triggerOnView>
          <InteractiveSystemOverview />
        </InteractiveSection>
        
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
        
        <ScrollToTop />
        
        <CookieConsent 
          onLearnMore={handlePrivacyClick}
        />
        
        <Toaster richColors position="top-right" />
      </motion.div>
    </InteractionProvider>
  )
}

export default App