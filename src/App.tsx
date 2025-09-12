import { useState } from "react"
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
  ScrollToTop 
} from "@/components"
import { Toaster } from "sonner"
import { motion } from "framer-motion"
import { useSmoothScroll } from "@/hooks/useSmoothScroll"

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
    <motion.div 
      className="min-h-screen bg-background"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header onContactClick={openContactModal} />
      <Hero onContactClick={openContactModal} />
      <div id="product">
        <ProductDescription />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="pricing">
        <Pricing onContactClick={openContactModal} />
      </div>
      <SocialProof />
      <div id="faq">
        <FAQ />
      </div>
      <CTA onContactClick={openContactModal} />
      <Footer />
      
      <ContactModal 
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        defaultService={contactService}
      />
      
      <ScrollToTop />
      
      <Toaster richColors position="top-right" />
    </motion.div>
  )
}

export default App