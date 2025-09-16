import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Envelope, Building, User, CheckCircle, Shield } from "@phosphor-icons/react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { OwlLoader, InteractiveButton } from "@/components"
import AnimatedFormField from "@/components/AnimatedFormField"
import { ValidationSummary, useFormValidation } from "@/components/FormValidationComponents"

interface ContactModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultService?: string
  onPrivacyClick?: () => void
}

export default function ContactModal({ open, onOpenChange, defaultService = "Консультація", onPrivacyClick }: ContactModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)

  // Form validation configuration
  const validationConfig = {
    phone: {
      required: true,
      phone: true,
      minLength: 10
    },
    email: {
      required: true,
      email: true
    },
    fullName: {
      minLength: 2,
      maxLength: 50
    },
    company: {
      maxLength: 100
    }
  }

  const { 
    validationState, 
    updateField, 
    isFormValid,
    resetForm 
  } = useFormValidation(['phone', 'email', 'fullName', 'company'], validationConfig)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check if required fields are valid
    if (!validationState.phone.isValid || !validationState.email.isValid) {
      toast.error("Будь ласка, заповніть обов'язкові поля правильно")
      return
    }

    if (!privacyAccepted) {
      toast.error("Необхідно підтвердити згоду на обробку персональних даних")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Collect form data
      const formData = {
        phone: validationState.phone.value,
        email: validationState.email.value,
        fullName: validationState.fullName.value,
        company: validationState.company.value,
        service: defaultService,
        privacyAccepted
      }
      
      console.log("Submitting form data:", formData)
      
      setIsSubmitted(true)
      toast.success("Заявку успішно відправлено! Ми зв'яжемося з вами найближчим часом.")
      
      // Reset form after successful submission
      setTimeout(() => {
        resetForm()
        setPrivacyAccepted(false)
        setIsSubmitted(false)
        onOpenChange(false)
      }, 2500)
      
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
              className="space-y-6"
              variants={formVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Validation Summary */}
              <ValidationSummary 
                validationState={validationState}
                className="mb-4"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fieldVariants}>
                  <AnimatedFormField
                    id="phone"
                    type="tel"
                    label="Телефон"
                    icon={<Phone size={16} />}
                    placeholder="+380 XX XXX XX XX"
                    value={validationState.phone.value}
                    validation={validationConfig.phone}
                    onChange={(value, isValid, error) => updateField('phone', value, isValid, error)}
                  />
                </motion.div>

                <motion.div variants={fieldVariants}>
                  <AnimatedFormField
                    id="email"
                    type="email"
                    label="Email"
                    icon={<Envelope size={16} />}
                    placeholder="email@company.com"
                    value={validationState.email.value}
                    validation={validationConfig.email}
                    onChange={(value, isValid, error) => updateField('email', value, isValid, error)}
                  />
                </motion.div>
              </div>

              <motion.div variants={fieldVariants}>
                <AnimatedFormField
                  id="fullName"
                  type="text"
                  label="ПІБ"
                  icon={<User size={16} />}
                  placeholder="Ваше повне ім'я"
                  value={validationState.fullName.value}
                  validation={validationConfig.fullName}
                  onChange={(value, isValid, error) => updateField('fullName', value, isValid, error)}
                />
              </motion.div>

              <motion.div variants={fieldVariants}>
                <AnimatedFormField
                  id="company"
                  type="text"
                  label="Назва компанії"
                  icon={<Building size={16} />}
                  placeholder="ТОВ 'Ваша компанія'"
                  value={validationState.company.value}
                  validation={validationConfig.company}
                  onChange={(value, isValid, error) => updateField('company', value, isValid, error)}
                />
              </motion.div>

              {/* Privacy Policy Checkbox */}
              <motion.div className="space-y-3" variants={fieldVariants}>
                <motion.div 
                  className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-300 ${
                    privacyAccepted 
                      ? 'border-accent/50 bg-accent/5' 
                      : 'border-border/50 hover:border-border'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <motion.div
                    className="mt-0.5"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Checkbox
                      id="privacy-consent"
                      checked={privacyAccepted}
                      onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <Label 
                      htmlFor="privacy-consent" 
                      className="text-sm text-foreground leading-relaxed cursor-pointer flex items-start"
                    >
                      <Shield size={16} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span>
                        Я погоджуюсь на обробку персональних даних згідно з{" "}
                        <motion.button
                          type="button"
                          onClick={onPrivacyClick}
                          className="text-accent hover:underline cursor-pointer font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Політикою конфіденційності
                        </motion.button>
                        {" "}*
                      </span>
                    </Label>
                  </div>
                </motion.div>
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
                    className={`w-full font-medium tracking-wide cursor-pointer transition-all duration-300 ${
                      isFormValid && privacyAccepted
                        ? 'bg-primary hover:bg-accent'
                        : 'opacity-60'
                    }`}
                    disabled={isSubmitting || !isFormValid || !privacyAccepted}
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