import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Envelope, Building, User, CheckCircle, Shield } from "@phosphor-icons/react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { OwlMascot } from "@/components"
import { useTranslation } from "@/hooks/useTranslation"

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
}

export default function ContactModal({ open, onOpenChange, defaultService = "", onPrivacyClick }: ContactModalProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    email: "",
    company: "",
    fullName: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('contact.error.phone')
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.error.email.required')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.error.email.invalid')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error(t('contact.error.validation'))
      return
    }

    if (!agreedToPrivacy) {
      toast.error(t('contact.error.privacy'))
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would normally send the data to your API endpoint
      console.log("Submitting form data:", { ...formData, service: defaultService })
      
      setIsSubmitted(true)
      toast.success(t('contact.success.toast'))
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ phone: "", email: "", company: "", fullName: "" })
        setAgreedToPrivacy(false)
        setIsSubmitted(false)
        onOpenChange(false)
      }, 2000)
      
    } catch (error) {
      toast.error(t('contact.error.submit'))
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setFormData({ phone: "", email: "", company: "", fullName: "" })
      setAgreedToPrivacy(false)
      setErrors({})
      setIsSubmitted(false)
    }
  }, [open])

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-[90vw] max-w-sm mx-auto p-4 sm:p-6 
                                 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                                 max-h-[80vh] overflow-hidden border-0 shadow-2xl">
          <motion.div 
            className="text-center py-6 sm:py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full 
                           flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="sm:size-32 text-green-600" />
            </div>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-green-700 mb-2 text-center">
              {t('contact.success.title')}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-muted-foreground text-center">
              {t('contact.success.description')}
            </DialogDescription>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-lg mx-auto p-0 
                               fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                               max-h-[90vh] overflow-hidden border-0 shadow-2xl
                               flex flex-col">
        
        {/* Fixed Header */}
        <DialogHeader className="flex-shrink-0 p-4 sm:p-6 pb-0">
          <DialogTitle className="text-lg sm:text-xl font-bold text-foreground 
                                 flex items-center justify-center text-center">
            <OwlMascot variant="loader" size="sm" className="mr-3 flex-shrink-0" />
            <span className="truncate">{defaultService || t('contact.title')}</span>
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            {t('contact.description')}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scroll-smooth p-4 sm:p-6 pt-2">
          <Card className="border-border/50">
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Phone and Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium flex items-center justify-center sm:justify-start">
                      <Phone size={16} className="mr-2 text-primary flex-shrink-0" />
                      <span>{t('contact.phone')} *</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+380 XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className={`border-border/50 focus:border-primary 
                               hover:border-primary/70 transition-colors duration-300 
                               text-center sm:text-left ${
                                 errors.phone ? 'border-destructive focus:border-destructive' : ''
                               }`}
                      required
                    />
                    {errors.phone && (
                      <p className="text-xs text-destructive text-center sm:text-left">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium flex items-center justify-center sm:justify-start">
                      <Envelope size={16} className="mr-2 text-primary flex-shrink-0" />
                      <span>{t('contact.email')} *</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@company.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={`border-border/50 focus:border-primary 
                               hover:border-primary/70 transition-colors duration-300 
                               text-center sm:text-left ${
                                 errors.email ? 'border-destructive focus:border-destructive' : ''
                               }`}
                      required
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive text-center sm:text-left">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium flex items-center justify-center sm:justify-start">
                    <User size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span>{t('contact.name')}</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={t('contact.name')}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className="border-border/50 focus:border-primary 
                             hover:border-primary/70 transition-colors duration-300 
                             text-center sm:text-left"
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium flex items-center justify-center sm:justify-start">
                    <Building size={16} className="mr-2 text-primary flex-shrink-0" />
                    <span>{t('contact.company')}</span>
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder={t('contact.company')}
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    className="border-border/50 focus:border-primary 
                             hover:border-primary/70 transition-colors duration-300 
                             text-center sm:text-left"
                  />
                </div>

                {/* Privacy Agreement */}
                <div className="flex items-start space-x-3 pt-4">
                  <Checkbox 
                    id="privacy-agreement"
                    checked={agreedToPrivacy}
                    onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                    className="mt-1 flex-shrink-0 hover:border-primary transition-colors duration-300"
                  />
                  <div className="text-xs sm:text-sm leading-relaxed">
                    <Label htmlFor="privacy-agreement" className="flex items-start transition-all duration-300">
                      <Shield size={14} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                      <span className="hover:text-primary transition-colors duration-300">
                        {t('contact.privacy.text')}{" "}
                        <button
                          type="button"
                          onClick={onPrivacyClick}
                          className="text-primary hover:text-accent underline font-medium 
                                   transition-all duration-300 hover:scale-105 inline-block"
                        >
                          {t('contact.privacy.link')}
                        </button>
                      </span>
                    </Label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full font-medium tracking-wide 
                             hover:shadow-lg transition-all duration-300 
                             text-base py-3"
                    disabled={isSubmitting || !agreedToPrivacy}
                  >
                    {isSubmitting ? (
                      <motion.div 
                        className="flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <OwlMascot variant="loader" size="sm" className="mr-2" />
                        <span>{t('contact.submitting')}</span>
                      </motion.div>
                    ) : (
                      <span>{t('contact.submit')}</span>
                    )}
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="w-full font-medium 
                             hover:border-primary hover:text-primary 
                             transition-all duration-300 text-base py-3"
                    disabled={isSubmitting}
                  >
                    {t('contact.cancel')}
                  </Button>
                </div>
              </form>

              {/* Footer Note */}
              <div className="mt-4 pt-4 border-t border-border/30">
                <p className="text-xs text-muted-foreground text-center">
                  * - {t('contact.required')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}