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
  ContactModal 
} from "@/components"
import { Toaster } from "sonner"
import { motion } from "framer-motion"

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactService, setContactService] = useState("Консультація")

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
      <ProductDescription />
      <Features />
      <Pricing onContactClick={openContactModal} />
      <SocialProof />
      <FAQ />
      <CTA onContactClick={openContactModal} />
      <Footer />
      
      <ContactModal 
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
        defaultService={contactService}
      />
      
      <Toaster richColors position="top-right" />
    </motion.div>
  )
}

export default App