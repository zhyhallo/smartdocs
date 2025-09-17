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
import { OwlLoader } from "@/components"

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

export default function ContactModal({ open, onOpenChange, defaultService = "Консультація", onPrivacyClick }: ContactModalProps) {
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
      newErrors.phone = "Телефон обов'язковий"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email обов'язковий"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Некоректний email"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error("Будь ласка, виправте помилки у формі")
      return
    }

    if (!agreedToPrivacy) {
      toast.error("Необхідно погодитися з політикою конфіденційності")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would normally send the data to your API endpoint
      console.log("Submitting form data:", { ...formData, service: posnet })
      
      setIsSubmitted(true)
      toast.success("Заявку успішно відправлено! Ми зв'яжемося з вами найближчим часом.")
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({ phone: "", email: "", company: "", fullName: "" })
        setAgreedToPrivacy(false)
        setIsSubmitted(false)
        onOpenChange(false)
      }, 2000)
      
    } catch (error) {
      toast.error("Помилка відправки заявки. Спробуйте ще раз.")
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
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground flex items-center">
            <OwlLoader size="sm" className="mr-3" />
            {defaultService}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Заповніть форму, і ми зв'яжемося з вами для обговорення ваших потреб
          </DialogDescription>
        </DialogHeader>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                    <Phone size={16} className="mr-2 text-primary" />
                    Телефон *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+380 XX XXX XX XX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`border-border/50 focus:border-primary ${
                      errors.phone ? 'border-destructive focus:border-destructive' : ''
                    }`}
                    required
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center">
                    <Envelope size={16} className="mr-2 text-primary" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`border-border/50 focus:border-primary ${
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
                <Label htmlFor="fullName" className="text-sm font-medium flex items-center">
                  <User size={16} className="mr-2 text-primary" />
                  ПІБ
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ваше повне ім'я"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium flex items-center">
                  <Building size={16} className="mr-2 text-primary" />
                  Назва компанії
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="ТОВ 'Ваша компанія'"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="border-border/50 focus:border-primary"
                />
              </div>

              <div className="flex items-start space-x-3 pt-4">
                <Checkbox 
                  id="privacy-agreement"
                  checked={agreedToPrivacy}
                  onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
                  className="mt-1"
                />
                <div className="text-sm leading-relaxed">
                  <Label htmlFor="privacy-agreement" className="cursor-pointer flex items-start">
                    <Shield size={16} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      Я погоджуюсь на обробку персональних даних згідно з{" "}
                      <button
                        type="button"
                        onClick={onPrivacyClick}
                        className="text-primary hover:text-accent underline font-medium transition-colors"
                      >
                        Політикою конфіденційності
                      </button>
                    </span>
                  </Label>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="flex-1 font-medium tracking-wide"
                  disabled={isSubmitting || !agreedToPrivacy}
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="flex items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <OwlLoader size="sm" className="mr-2" />
                      Відправляємо...
                    </motion.div>
                  ) : (
                    "Відправити заявку"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 font-medium"
                  disabled={isSubmitting}
                >
                  Скасувати
                </Button>
              </div>
            </form>

            <div className="mt-4 pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground text-center">
                * - обов'язкові поля для заповнення
              </p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}