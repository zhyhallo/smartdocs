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
        <DialogContent className="sm:max-w-md">
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <DialogTitle className="text-xl font-bold text-green-700 mb-2">
              {t('contact.success.title')}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {t('contact.success.description')}
            </DialogDescription>
          </motion.div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground flex items-center">
            <OwlMascot variant="loader" size="sm" className="mr-3" />
            {defaultService || t('contact.title')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t('contact.description')}
          </DialogDescription>
        </DialogHeader>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center cursor-pointer">
                    <Phone size={16} className="mr-2 text-primary icon-hover cursor-pointer" />
                    {t('contact.phone')} *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+380 XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`border-border/50 focus:border-primary cursor-pointer hover:border-primary/70 transition-colors duration-300 ${
                      errors.phone ? 'border-destructive focus:border-destructive' : ''
                    }`}
                    required
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center cursor-pointer">
                    <Envelope size={16} className="mr-2 text-primary icon-hover cursor-pointer" />
                    {t('contact.email')} *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`border-border/50 focus:border-primary cursor-pointer hover:border-primary/70 transition-colors duration-300 ${
                      errors.email ? 'border-destructive focus:border-destructive' : ''
                    }`}
                    required
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium flex items-center cursor-pointer">
                  <User size={16} className="mr-2 text-primary icon-hover cursor-pointer" />
                  {t('contact.name')}
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder={t('contact.name')}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="border-border/50 focus:border-primary cursor-pointer hover:border-primary/70 transition-colors duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium flex items-center cursor-pointer">
                  <Building size={16} className="mr-2 text-primary icon-hover cursor-pointer" />
                  {t('contact.company')}
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder={t('contact.company')}
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="border-border/50 focus:border-primary cursor-pointer hover:border-primary/70 transition-colors duration-300"
                />
              </div>

              <div className="flex items-start space-x-3 pt-4">
                <Checkbox 
                  id="privacy-agreement"
                  checked={agreedToPrivacy}
                  onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                  className="mt-1 cursor-pointer hover:border-primary transition-colors duration-300"
                />
                <div className="text-sm leading-relaxed">
                  <Label htmlFor="privacy-agreement" className="cursor-pointer hover-lift flex items-start transition-all duration-300">
                    <Shield size={16} className="mr-2 text-primary flex-shrink-0 mt-0.5 icon-hover cursor-pointer" />
                    <span className="cursor-pointer hover:text-primary transition-colors duration-300">
                      {t('contact.privacy.text')}{" "}
                      <button
                        type="button"
                        onClick={onPrivacyClick}
                        className="text-primary hover:text-accent underline font-medium transition-all duration-300 cursor-pointer hover:scale-105 inline-block"
                      >
                        {t('contact.privacy.link')}
                      </button>
                    </span>
                  </Label>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="flex-1 font-medium tracking-wide cursor-pointer button-hover hover:shadow-lg transition-all duration-300"
                  disabled={isSubmitting || !agreedToPrivacy}
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <OwlMascot variant="loader" size="sm" className="mr-2" />
                      {t('contact.submitting')}
                    </motion.div>
                  ) : (
                    t('contact.submit')
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 font-medium cursor-pointer hover:border-primary hover:text-primary transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {t('contact.cancel')}
                </Button>
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground text-center">
                * - {t('contact.required')}
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}