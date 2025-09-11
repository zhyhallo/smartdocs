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

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [contactService, setContactService] = useState("Консультація")

  const openContactModal = (service: string = "Консультація") => {
    setContactService(service)
    setIsContactModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
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
    </div>
  )
}

export default App