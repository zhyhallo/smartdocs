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
  InteractiveSection
} from "@/components"
import { Toaster } from "sonner"
import { motion } from "framer-motion"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"
import { InteractionProvider } from "@/hooks/useInteractionContext"

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactService, setContactService] = useState("Консультація")

  // Enable smooth scrolling for anchor links with offset for fixed header
  useSmoothScroll({ offset: 80, duration: 800 })

  const openContactModal = (service: string = "Консультація") => {
    setContactService(service)
    setIsContactModalOpen(true)
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

  return (
    <InteractionProvider>
      <motion.div 
        className="min-h-screen bg-background"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Header onContactClick={openContactModal} />
        
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
        
        <Footer />
        
        <ContactModal 
          open={isContactModalOpen}
          onOpenChange={setIsContactModalOpen}
          defaultService={contactService}
        />
        
        <ScrollToTop />
        
        <Toaster richColors position="top-right" />
      </motion.div>
    </InteractionProvider>
  )
}

export default App