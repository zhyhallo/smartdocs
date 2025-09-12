import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Envelope, Building, User, CheckCircle, Shield } from "@phosphor-icons/react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { OwlLoader, InteractiveButton, InteractiveInput } from "@/components"

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultService?: string
  onPrivacyClick?: () => void
}

interface FormData {
  phone: string
  email: string
  company: string
  fullName: string
  privacyAccepted: boolean
}

export default function ContactModal({ open, onOpenChange, defaultService = "Консультація", onPrivacyClick }: ContactModalProps) {
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    email: "",
    company: "",
    fullName: "",
    privacyAccepted: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.phone || !formData.email) {
      toast.error("Будь ласка, заповніть обов'язкові поля (телефон та email)")
      return
    }

    if (!formData.privacyAccepted) {
      toast.error("Необхідно підтвердити згоду на обробку персональних даних")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would normally send the data to your API endpoint
      console.log("Submitting form data:", { ...formData, service: defaultService })
      
      setIsSubmitted(true)
      toast.success("Заявку успішно відправлено! Ми зв'яжемося з вами найближчим часом.")
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ phone: "", email: "", company: "", fullName: "", privacyAccepted: false })
        setIsSubmitted(false)
        onOpenChange(false)
      }, 2000)
      
    } catch (error) {
      toast.error("Помилка відправки заявки. Спробуйте ще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "backOut"
      }
    }
  }

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  }

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <motion.div 
            className="text-center py-8"
            variants={successVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
            >
              <CheckCircle size={32} className="text-green-600" />
            </motion.div>
            <DialogTitle className="text-xl font-bold text-green-700 mb-2">
              Заявку отримано!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Ми зв'яжемося з вами протягом години для обговорення деталей.
            </DialogDescription>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {defaultService}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Заповніть форму, і ми зв'яжемося з вами для обговорення ваших потреб
          </DialogDescription>
        </DialogHeader>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4"
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div className="space-y-2" variants={fieldVariants}>
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                    <Phone size={16} className="mr-2 text-primary" />
                    Телефон *
                  </Label>
                  <InteractiveInput
                    id="phone"
                    type="tel"
                    placeholder="+380 XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="border-border/50 focus:border-primary transition-colors duration-300"
                    sectionContext="contact-form"
                    interactionData={{ field: "phone" }}
                    required
                  />
                </motion.div>

                <motion.div className="space-y-2" variants={fieldVariants}>
                  <Label htmlFor="email" className="text-sm font-medium flex items-center">
                    <Envelope size={16} className="mr-2 text-primary" />
                    Email *
                  </Label>
                  <InteractiveInput
                    id="email"
                    type="email"
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="border-border/50 focus:border-primary transition-colors duration-300"
                    sectionContext="contact-form"
                    interactionData={{ field: "email" }}
                    required
                  />
                </motion.div>
              </div>

              <motion.div className="space-y-2" variants={fieldVariants}>
                <Label htmlFor="fullName" className="text-sm font-medium flex items-center">
                  <User size={16} className="mr-2 text-primary" />
                  ПІБ
                </Label>
                <InteractiveInput
                  id="fullName"
                  type="text"
                  placeholder="Ваше повне ім'я"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="border-border/50 focus:border-primary transition-colors duration-300"
                  sectionContext="contact-form"
                  interactionData={{ field: "fullName" }}
                />
              </motion.div>

              <motion.div className="space-y-2" variants={fieldVariants}>
                <Label htmlFor="company" className="text-sm font-medium flex items-center">
                  <Building size={16} className="mr-2 text-primary" />
                  Назва компанії
                </Label>
                <InteractiveInput
                  id="company"
                  type="text"
                  placeholder="ТОВ 'Ваша компанія'"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="border-border/50 focus:border-primary transition-colors duration-300"
                  sectionContext="contact-form"
                  interactionData={{ field: "company" }}
                />
              </motion.div>

              {/* Privacy Policy Checkbox */}
              <motion.div className="space-y-3" variants={fieldVariants}>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy-consent"
                    checked={formData.privacyAccepted}
                    onCheckedChange={(checked) => handleInputChange("privacyAccepted", checked as boolean)}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor="privacy-consent" 
                      className="text-sm text-foreground leading-relaxed cursor-pointer flex items-start"
                    >
                      <Shield size={16} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Я погоджуюсь на обробку персональних даних згідно з{" "}
                        <button
                          type="button"
                          onClick={onPrivacyClick}
                          className="text-accent hover:underline cursor-pointer font-medium"
                        >
                          Політикою конфіденційності
                        </button>
                        {" "}*
                      </span>
                    </Label>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="pt-4 flex flex-col sm:flex-row gap-3"
                variants={fieldVariants}
              >
                <motion.div
                  className="flex-1"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <InteractiveButton
                    type="submit"
                    className="w-full font-medium tracking-wide cursor-pointer"
                    disabled={isSubmitting}
                    sectionContext="contact-form"
                    interactionData={{ action: "submit", service: defaultService }}
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitting ? (
                        <motion.div
                          key="submitting"
                          className="flex items-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <OwlLoader size="sm" />
                          <span>Відправляємо...</span>
                        </motion.div>
                      ) : (
                        <motion.span
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          Відправити заявку
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </InteractiveButton>
                </motion.div>
                <motion.div
                  className="flex-1"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <InteractiveButton
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="w-full font-medium cursor-pointer"
                    disabled={isSubmitting}
                    sectionContext="contact-form"
                    interactionData={{ action: "cancel" }}
                  >
                    Скасувати
                  </InteractiveButton>
                </motion.div>
              </motion.div>
            </motion.form>

            <motion.div 
              className="mt-4 pt-4 border-t border-border/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.3 } }}
            >
              <p className="text-xs text-muted-foreground text-center">
                * - обов'язкові поля для заповнення
              </p>
              <p className="text-xs text-muted-foreground text-center mt-1">
                Ваші персональні дані захищені відповідно до GDPR та законодавства України
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}